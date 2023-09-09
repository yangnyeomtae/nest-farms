import { IsNotEmpty } from "class-validator";

export class CreateFarmDto {
    @IsNotEmpty()
    name: string;
}