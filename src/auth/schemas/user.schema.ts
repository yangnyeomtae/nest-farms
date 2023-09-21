import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaOptions } from "mongoose";

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
}

export const UserSchema = SchemaFactory.createForClass(User);