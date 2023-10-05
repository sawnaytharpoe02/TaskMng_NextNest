import {
  Controller,
  Get,
  Response,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { GetAllTaskResponseDto } from './getAll.response.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.req.dto';

@Controller('tasks')
@ApiTags('Task')
export class GetAllController {
  constructor(private taskService: TaskService) {}

  @Get('list')
  async getAllTask(
    @Response() res,
    @Query() query: PaginationRequestDto,
  ): Promise<GetAllTaskResponseDto> {
    try {
      const { data, totalTasks } = await this.taskService.getAllTaskList(query);
      return res
        .status(200)
        .json({ message: 'Get All Task Lists', data, totalTasks });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
