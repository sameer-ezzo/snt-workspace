import { Injectable } from "@nestjs/common";

import { InjectConnection } from '@nestjs/mongoose';
import { ListResult } from "libs/models/src";
import { Connection, Collection } from 'mongoose';

@Injectable()
export class ApiService {


    constructor(@InjectConnection('SNT_DB') private connection: Connection) { }

    async find<T>(collectionName: string, filter: Record<string, any>, select?: string): Promise<ListResult<T>> {

        const collections = await this.connection.db.collections()
        const collection = collections.find(c => c.collectionName === collectionName) as Collection

        if (!collection) throw new Error('Collection not found')

        select ??= 'ALL'
        const projection = select === 'ALL' ? {} : select.split(',').map(x => x.trim()).filter(x => x.length).map(s => ({ [s]: 1 })).reduce((a, b) => ({ ...a, ...b }), {})
        if (select !== 'ALL' && select.indexOf('_id') === -1) projection['_id'] = 0

        const limit = filter['per_page'] || 100
        const page = filter['page'] || 1
        const skip = (page - 1) * limit

        delete filter['per_page']
        delete filter['page']

        const res = await collection.find(filter, { limit, skip, projection }).toArray()
        const total = await collection.count(filter)

        return { total, data: res as any as T[] }
    }
}


