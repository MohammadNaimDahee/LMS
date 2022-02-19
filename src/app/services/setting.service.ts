import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Setting } from '../models/Setting';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  setting: Setting = {
    isLoggedIn: false,
  };

  constructor() {
    if (this.setting !== null) {
      this.setting = JSON.parse(localStorage.getItem(environment.setting)!);
    }
  }

  getSetting = (): Setting => {
    return JSON.parse(localStorage.getItem(environment.setting)!);
  };

  changeSetting = (setting: Setting) => {
    localStorage.setItem(environment.setting, JSON.stringify(setting));
  };
}
