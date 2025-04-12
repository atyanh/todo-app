import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Logger } from '../logger';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const created = new this.todoModel(createTodoDto);
    if (created) Logger.log('Created', 'Todo', created._id);
    return created.save();
  }

  findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      Logger.log('NotFound', 'Todo', id);
      throw new NotFoundException('Todo not found');
    }
    Logger.log('Retrieved', 'Todo', id);
    return todo;
  }

  async update(id: string, updateDto: Partial<Todo>) {
    const result = await this.todoModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (result) Logger.log('Updated', 'Todo', id);
    return result;
    
  }
  
  async remove(id: string): Promise<void> {
    const result = await this.todoModel.findByIdAndDelete(id).exec();
    if (result) Logger.log('Deleted', 'Todo', id);
    if (!result) {
      Logger.log('NotFound', 'Todo', id);
      throw new NotFoundException('Todo not found')
    };
  }
}
