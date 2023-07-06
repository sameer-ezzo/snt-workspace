import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Auction } from "../data";
import { throwError } from "rxjs";

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel("Auction", "SNT_DB") private auctionModel: Model<Auction>
  ) {}

  async create(auction: any){
      const newModel = new this.auctionModel(auction);
      newModel._id = new mongoose.Types.ObjectId().toHexString();
      try {
        return await newModel.save()
        
      } catch (error) {
        console.log(error.message);
        
      }
    }
  async edit(auction: any) {
    await this.auctionModel.findByIdAndUpdate(
        { _id: auction._id },
        auction
      );
  }
  async delete(slug: string){
    return await this.auctionModel.findOneAndDelete({slug: slug})
  }
}
