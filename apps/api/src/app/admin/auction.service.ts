import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
        await newModel.save()
        throw new HttpException('Item has been created successfully',HttpStatus.CREATED)
        
      } catch (error) {
        if(error.name === 'ValidationError') throw new HttpException('Form validation failed',HttpStatus.BAD_REQUEST)
        else throw new Error('Error has occurred during creating')
    }
  }
  async edit(auction: any) {
    try {
      await this.auctionModel.findByIdAndUpdate(
        { _id: auction._id },
        auction
      );
      throw new HttpException('Item has been updated successfully',HttpStatus.CREATED)
    } catch (error) {
      if(error.name === 'ValidationError') throw new HttpException('Form validation failed',HttpStatus.BAD_REQUEST)
        else throw new Error('Error has occurred during Editing')
    }
    
  }
  async delete(slug: string){
    try {
      await this.auctionModel.findOneAndDelete({slug: slug})
    } catch (error) {
      if(error.error.statusCode === 404) throw new HttpException('Item not found',HttpStatus.NOT_FOUND)
      else throw new Error('Something went wrong')
    }
  }
}
