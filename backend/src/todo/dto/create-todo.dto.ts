import { IsNumberString } from 'class-validator';

export class CreateTodoDto {
  name!: string;
  description?: string;
}
