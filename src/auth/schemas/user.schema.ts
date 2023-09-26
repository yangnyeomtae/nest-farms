import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaOptions } from "mongoose";
import * as mongoose from 'mongoose';
import { Farm } from "src/farms/Schemas/farm.schema";

export type UserDocument = HydratedDocument<User>;

const options: SchemaOptions = {
    versionKey: false
}

@Schema(options)
export class User {
    @Prop({
        required: true,
        type: String,
        index: true,
        unique: true
    })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farm'
        }]
    })
    farms: Farm[];
}

export const UserSchema = SchemaFactory.createForClass(User);