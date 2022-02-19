import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  page: string;
  constructor(
    private authService: AuthService,
    private settingService: SettingService,
    private router: Router
  ) {
    this.setting = this.settingService.getSetting();
    this.page = window.location.pathname;
  }

  ngOnInit(): void {}

  logout = () => {
    this.authService.logout();
    this.settingService.changeSetting({ isLoggedIn: false });
    window.location.reload();
  };

  navigate = (page: string) => {
    this.page = page;
    this.router.navigate([page]);
  };
}
