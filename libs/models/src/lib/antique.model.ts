import { BaseModel } from "./base.model";
export class AntiqueModel extends BaseModel {
  currency!: string;
  price!: number;
  status!: string
  dateOfManufacture!: Date | string
  images: string[] = []
}