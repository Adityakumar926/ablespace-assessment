import { Controller, Get, Post, Body } from '@nestjs/common';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  getTheme() {
    return { success: true, data: this.themesService.getTheme() };
  }

  @Post()
  setTheme(@Body('theme') theme: string) {
    const updated = this.themesService.setTheme(theme || 'light');
    return { success: true, data: updated };
  }
}
