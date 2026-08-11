import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [AuthModule, TasksModule, ThemesModule],
})
export class AppModule {}
