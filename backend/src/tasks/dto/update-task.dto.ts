import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../database/data.store';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['TODO', 'IN_PROGRESS', 'UNDER_REVIEW', 'COMPLETED'])
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  @IsOptional()
  priority?: TaskPriority;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  assignee?: string;
}
