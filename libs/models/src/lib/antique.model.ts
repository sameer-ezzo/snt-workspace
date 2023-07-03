import { BaseModel } from "./base.model";
export class AntiqueModel extends BaseModel {
  currency: string = '';
  price: number = 0;
  status: 'available' | 'sold' = 'available'; 
  dateOfManufacture: Date | string = new Date()
  images: string[] = []
}