import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SettingService } from 'src/app/services/setting.service';
import { User } from '../../models/User';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private setting: SettingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit = (userForm: NgForm) => {
    if (!userForm.valid) {
      alert('Please fill the form properly');
      return;
    }
    this.authService
      .login(this.email, this.password)
      .then((res) => {
        this.authService.getAuth().subscribe((auth) => {
          if (auth) {
            const user: User = {
              displayName: auth.displayName || '',
              email: auth.email!,
              uid: auth.uid,
              emailVerified: auth.emailVerified,
              refreshToken: auth.refreshToken,
            };
            this.setting.changeSetting({ isLoggedIn: true, user });
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}
