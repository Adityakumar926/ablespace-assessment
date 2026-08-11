import { Injectable } from '@nestjs/common';
import { DataStore, ThemePreference } from '../database/data.store';

@Injectable()
export class ThemesService {
  getTheme(): ThemePreference {
    return DataStore.getTheme();
  }

  setTheme(theme: string): ThemePreference {
    return DataStore.setTheme(theme);
  }
}
