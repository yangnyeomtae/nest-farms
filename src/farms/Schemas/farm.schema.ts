import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaOptions } from "mongoose";

export type FarmDocument = HydratedDocument<Farm>;

const options: SchemaOptions = {
    versionKey: false
}

@Schema(options)
export class Farm {
    @Prop()
    name: string;

}

export const FarmSchema = SchemaFactory.createForClass(Farm);
