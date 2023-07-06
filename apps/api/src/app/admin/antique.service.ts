import { HttpStatus, Injectable } from "@nestjs/common";
import { Antique, AntiqueSchema } from "../data/schemas/antique.schema";
import { DataService } from "../data/data.service";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Auction } from "../data";
import { AntiqueModel, AuctionModel } from "@snt-workspace/models";
import assert = require("assert");

@Injectable()
export class AntiqueService {
  constructor(
    @InjectModel("Antique", "SNT_DB") private antiqueModel: Model<Antique>,
  ) {}

  async create(antique: any){
      const newModel = new this.antiqueModel(antique);
      newModel._id = new mongoose.Types.ObjectId().toHexString();
      return await newModel.save()
    }
  async edit(antique: any) {
    await this.antiqueModel.findByIdAndUpdate(
        { _id: antique._id },
        antique
      );
   
  }
  async delete(slug: string){
    return await this.antiqueModel.findOneAndDelete({slug: slug})
  }
}
