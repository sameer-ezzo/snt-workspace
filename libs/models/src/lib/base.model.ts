import { AntiqueModel } from "./antique.model";

export class BaseModel {
  _id = '';
  name = '';
  slug = '';
  shortDescription = '';
  description = '';
  category = 'Antiques';
  tags: string[] = ['Century'];
  date: Date = new Date();
  image = [];
  
}

