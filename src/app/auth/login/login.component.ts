import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { MustMatch } from 'src/app/shared/validators/passwordValidations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  changePasswordForm!: FormGroup;
  isLogin: any = true;
  isForgot: any = false;
  isChange: any = false;
  resetPasswordUser = '';

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private snackBar: MatSnackBar,
    private storage: LocalStorageService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router) { }

  ngOnInit(): void {
    this.buildLoginForm();
    this.buildForgotPasswordForm();
    this.buildChangePasswordForm();
    if(localStorage.getItem('customer-user')) {
      this.resetPasswordUser = localStorage.getItem('customer-user')!;
    }
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      userNameInput: new FormControl(null, Validators.required),
      passwordInput: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    });
  }

  buildForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      userNameInput: new FormControl(null, Validators.required),
    });
  }

  buildChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      passwordInput: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      confirmPasswordInput: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    }, {
      validator: MustMatch('passwordInput', 'confirmPasswordInput')
    });
  }

  onFormSubmit($data: any) {
    if(this.loginForm.valid) {
      const request = {
        email: this.loginForm.value.userNameInput,
        password: this.loginForm.value.passwordInput
      };
      this.authService.loginUser(request).subscribe((result: any) => {
        this.storage.setItem("customer-user", result.data.user);
        this.storage.setItem("token", result.data.token);
        this.snackBar.open(result.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--success']
        });
        this.dialogClose();
        //this.router.navigate(['']);
      }, (error) => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--error']
        });
      })
    }
  }

  onForgotPasswordFormSubmit($data: any) {
    if(this.forgotPasswordForm.valid) {
      this.resetPasswordUser = this.forgotPasswordForm.value.userNameInput;
      const request = {
        email: this.forgotPasswordForm.value.userNameInput,
      };
      this.authService.isUserExist(request).subscribe((result: any) => {
        if(result.code == 200) {
          this.isLogin = false;
          this.isForgot = false;
          this.isChange = true;
          this.storage.setItem("forgot-password-user", this.resetPasswordUser);
        }
      }, (error) => {
        this.resetPasswordUser = '';
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--error']
        });
      })
    }
  }

  onChangePasswordFormSubmit($data: any) {
    if(this.changePasswordForm.valid) {
      const request = {
        email: this.resetPasswordUser,
        password: this.changePasswordForm.value.passwordInput
      };
      this.authService.resetPassword(request).subscribe((result: any) => {
        //if(result.code == 200) {
          this.onBack();
          this.snackBar.open(result.message, "", {
            duration: 2000,
            panelClass: ['glinz-snackbar--success']
          });
        //}
      }, (error) => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--error']
        });
      })
    }
  }

  forgotPassword() {
    this.isLogin = false;
    this.isForgot = true;
  }

  onBack() {
    this.isLogin = true;
    this.isForgot = false;
    this.isChange = false;
    this.resetPasswordUser = '';
    this.storage.removeItem("forgot-password-user");
  }

  // passwordMatch(formGroup: FormGroup) {
  //   const { value: passwordInput } = formGroup.get('passwordInput');
  //   const { value: confirmPasswordInput } = formGroup.get('confirmPasswordInput');
  //   return passwordInput === confirmPasswordInput ? null : { passwordNotMatch: true };
  // }

  public hasErrorPassword = (controlName: string, errorName: string) => {
    return this.changePasswordForm.controls[controlName].hasError(errorName);
  }

  dialogClose() {
    this.dialogRef.close();
  }

}

