
export class BaseModel {
  _id = '';
  name = '';
  slug = '';
  shortDescription = '';
  description = '';
  price = 0;
  image = '';
  category = '';
  tags: string[] = [];
  date: Date = new Date();
}

