import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
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
      
      try {
        const newModel = new this.antiqueModel(antique);
        newModel._id = new mongoose.Types.ObjectId().toHexString();
        await newModel.save()
      } catch (error) {
        if(error.name === 'ValidationError') throw new HttpException('Form validation failed',HttpStatus.BAD_REQUEST)
        else throw new Error('Error has occurred during creating')
      }
    }
  async edit(antique: any) {
    try {
        await this.antiqueModel.findByIdAndUpdate(
            { _id: antique._id },
            antique
          );
      } catch (error) {
        if(error.name === 'ValidationError') throw new HttpException('Form validation failed',HttpStatus.BAD_REQUEST)
        else throw new Error('Error has occurred during Editing')
      }
    
   
  }
  async delete(slug: string){
    try {
        await this.antiqueModel.findOneAndDelete({slug: slug})
      } catch (error) {
        if(error.error.statusCode === 404) throw new HttpException('Item not found',HttpStatus.NOT_FOUND)
        else throw new Error('Something went wrong')
      }
  }
}
