import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../Features/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginFaild: boolean = false;
  isLogged = localStorage.getItem('adminData');
  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    if (this.isLogged) {
      this.router.navigate(['/en', 'dashboard']);
    }
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/en', 'dashboard']);
      },
      error: () => {
        this.loginFaild = true;
      },
    });
  }
}
