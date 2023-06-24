import { Injectable } from "@nestjs/common";

import { InjectConnection } from '@nestjs/mongoose';
import { ListResult } from "libs/models/src";
import { Connection, Collection } from 'mongoose';

@Injectable()
export class ApiService {


    constructor(@InjectConnection('SNT_DB') private connection: Connection) { }

    async find<T>(collectionName: string, q: Record<string, any>, select?: string): Promise<ListResult<T>> {

        const collections = await this.connection.db.collections()
        const collection = collections.find(c => c.collectionName === collectionName) as Collection
        if (!collection) throw new Error('Collection not found')

        const { filter, pipline } = this._getAggregations({ ...q, select })

        const res = await collection.aggregate(pipline).toArray()
        const total = await collection.count(filter)

        return { total, data: res as any as T[] }
    }
    private _getAggregations(q: Record<string, any>) {

        const getAndDel = (prop: string) => {
            const v = q[prop]
            delete q[prop]
            return v
        }
        const limit = getAndDel('per_page') || 100
        const page = getAndDel('page') || 1
        const sort_by = getAndDel('sort_by') ?? '_id'
        const order = getAndDel('order') ?? 'asc'
        const skip = (page - 1) * limit

        const select = (getAndDel('select') ?? '').trim()
        let projection = null
        if (select.length) {

            const p = select.split(',')
                .map(x => x.trim()).filter(x => x.length).map(s => {
                    if (s.indexOf('.') === -1)
                        return { [s]: 1 }
                    return convertStringToNestedJson(s)
                })
                .reduce((a, b) => ({ ...a, ...b }), {})

            projection = { ...{ _id: 0 }, ...p }
        }

        const _lookup = getAndDel('lookup')
        let lookup = null
        if (_lookup) {
            if (projection) {
                projection[_lookup.lf] = 1
                projection[_lookup.as] = 1
            }
            lookup = {
                from: _lookup.from,
                localField: _lookup.lf,
                foreignField: _lookup.ff,
                as: _lookup.as,
                onlyFirst: _lookup.first === true
            }
        }
        const pipline = createAggregationPipeline(q, projection, limit, sort_by, order, skip, lookup)

        return {
            filter: q,
            pipline
        }
    }
}


function createAggregationPipeline(matchQuery, projectionFields, limitValue, sortField, sortOrder, skipValue,
    lookup: {
        from: string, // <collection to join>,
        localField: string, // <field from the input documents>,
        foreignField: string, // <field from the documents of the "from" collection>,
        as: string // <output array field>    
        onlyFirst?: boolean //to replace lookup result only with first match
    }
) {
    const pipeline = [];

    if (lookup) {
        const onlyFirst = lookup.onlyFirst === true
        delete lookup.onlyFirst

        pipeline.push({ $lookup: lookup });
        if (onlyFirst)
            pipeline.push(...[
                {
                    "$set": {
                        [lookup.as]: { "$first": `$${lookup.as}` },
                    }
                }
                // {
                //     "$unset": ["forms"]
                // }
            ])
    }

    if (matchQuery) {
        pipeline.push({ $match: matchQuery });
    }

    if (sortField) {
        const sortStage = {};
        sortStage[sortField] = sortOrder === 'desc' ? -1 : 1;
        pipeline.push({ $sort: sortStage });
    }
    if (skipValue) {
        pipeline.push({ $skip: skipValue });
    }
    if (limitValue) {
        pipeline.push({ $limit: limitValue });
    }

    if (projectionFields) {
        pipeline.push({ $project: projectionFields });
    }

    return pipeline;
}


function convertStringToNestedJson(input: string): object {
    const keys = input.split('.').map((key) => key.trim());
    const result = {};

    let currentObj = result;
    for (const key of keys) {
        const nestedObj = {};
        currentObj[key] = nestedObj;
        currentObj = nestedObj;
    }

    return result;
}