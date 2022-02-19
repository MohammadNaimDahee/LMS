import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { SettingService } from 'src/app/services/setting.service';
import { Setting } from 'src/app/models/Setting';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showDropDownMenu: boolean = false;
  showMenuDev: boolean = true;
  setting: Setting;
  title = 'Learning Management System';
  constructor(
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.setting = this.settingService.getSetting();
  }

  ngOnInit(): void {}

  logout = () => {
    this.authService.logout();
    this.settingService.changeSetting({ isLoggedIn: false });
    window.location.reload();
  };
}
