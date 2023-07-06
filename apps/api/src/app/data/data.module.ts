import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DataService } from "./data.service";
import { ApiController } from "./api.controller";
import { AntiqueSchema } from "./schemas/antique.schema";
import { AuctionSchema } from "./schemas/auction.schema";

@Module({
  controllers: [ApiController],
  imports: [
   
    MongooseModule.forFeature(
      [
        { name: "Antique", collection: "antiques", schema: AntiqueSchema },
        { name: "Auction", collection: "auctions", schema: AuctionSchema },
      ],
      "SNT_DB"
    ),
    MongooseModule.forFeature([], "SNT_DB"),
  ],
  providers: [DataService],
  exports: [DataService, MongooseModule],
})
export class DataModule {}
