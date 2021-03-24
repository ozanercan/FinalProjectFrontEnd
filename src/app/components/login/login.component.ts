import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  loginForm!: FormGroup;
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: LoginModel = this.loginForm.value;

      this.authService.login(loginModel).subscribe(
        (response) => {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.data.token);
          this.toastrService.info(response.message);
        },
        (error) => {
          this.toastrService.warning(error.error.message);
        }
      );
    } else {
      this.toastrService.warning('Lütfen tüm alanları doldurun.');
    }
  }
}
