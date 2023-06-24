import { BaseModel } from "./base.model";
export class AntiqueModel extends BaseModel {
  currency: string = 'USD';
  price = 0;
  status!: string
  dateOfManufacture!: Date | string
  images: string[] = []
}