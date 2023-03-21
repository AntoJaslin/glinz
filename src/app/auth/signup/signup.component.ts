import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private snackBar: MatSnackBar,) { 

    }

  ngOnInit(): void {
    this.buildSignupForm();
  }

  buildSignupForm() {
    this.signupForm = this.fb.group({
      userNameInput: new FormControl(null, Validators.required),
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      phoneInput: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      passwordInput: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    });
  }

  onFormSubmit($data: any) {
    if(this.signupForm.valid) {
      const request = {
        name: this.signupForm.value.userNameInput,
        role_id: '63c6917642c4fd106d7599b5',
        email: this.signupForm.value.emailInput,
        password: this.signupForm.value.passwordInput,
        phone: this.signupForm.value.phoneInput,
        status: 'active'
      };
      this.authService.signupUser(request).subscribe((result: any) => {
        this.snackBar.open(result.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--success']
        });
        //this.router.navigate(['']);
      }, (error) => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
          panelClass: ['glinz-snackbar--error']
        });
      })
    }
  }

}
