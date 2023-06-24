import { BaseDataService } from "./services/base-data.service";


export async function getAA(ds: BaseDataService, collection: 'antiques' | 'auctions',
  page: number = 1, per_page: number = 12): Promise<{ total: number, result: any[] }> {
  const res = await ds.get<any>(collection,
    {
      page,
      per_page,
      select: "_id,name,slug,price,image,shortDescription,category,item",
      lookup: collection === 'auctions' ? {
        from: 'antiques',
        lf: 'antique.aid', ff: '_id', as: 'item', first: true
      } : null
    }
  )

  return { total: res.total, result: res.data.map(item => mapAAItem(item)) }
}

export function mapAAItem(item: any) {
  return {
    ...item,
    url: `/client/${item.antique ? 'auction' : 'antique'}/${item.slug}`,
    images: item.antique ? item.item.images : item.images,
    image: item.antique ? item.item.image : item.image
  };
}
