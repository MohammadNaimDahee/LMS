import { Component } from '@angular/core';
import { Setting } from './models/Setting';
import { SettingService } from './services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  setting!: Setting;

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.setting = this.settingService.getSetting();
    if (this.setting === null) {
      this.settingService.changeSetting({ isLoggedIn: false });
      this.setting = { isLoggedIn: false };
    }
  }
}
