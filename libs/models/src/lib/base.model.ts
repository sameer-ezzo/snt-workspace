
export class BaseModel {
  id = 0;
  name = '';
  slug = '';
  shortDesc = '';
  description = '';
  price = 0;
  image = '';
  category = '';
  tags: string[] = [];
  date: Date = new Date();
}

