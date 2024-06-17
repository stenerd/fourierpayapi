import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({timestamps:true})
export class BaseMetaData extends Document{
    _id?: any;

    @Prop({type:String, required:true})
    name:string

    @Prop({type:String, required:true})
    slug:string

}