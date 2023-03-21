import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private snackBar: MatSnackBar,
              private storage: LocalStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildAdminLoginForm();
  }

  buildAdminLoginForm() {
    this.adminLoginForm = this.fb.group({
      userNameInput: new FormControl(null, Validators.required),
      passwordInput: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    });
  }

  public onFormSubmit(data: any) {
    if(this.adminLoginForm.valid) {
      const request = {
        email: this.adminLoginForm.value.userNameInput,
        password: this.adminLoginForm.value.passwordInput
      };
      this.authService.loginAdminUser(request).subscribe((result: any) => {
        this.storage.setItem("user", result.data.user);
        this.storage.setItem("token", result.data.token);
        this.snackBar.open(result.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--success']
        });
        this.router.navigate(['admin']);
      }, (error) => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--error']
        });
      })
    }
  }

}
