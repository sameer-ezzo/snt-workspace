import { AntiqueModel } from "./antique.model";

export class BaseModel {
  _id = '';
  name = '';
  slug = '';
  shortDescription = '';
  description = '';
  category = '';
  tags: string[] = [];
  date: Date = new Date();
  image = '';
  
}

