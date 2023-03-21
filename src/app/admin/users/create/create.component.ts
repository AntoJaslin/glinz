import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildCreateUserForm();
  }

  buildCreateUserForm() {
    this.createUserForm = this.fb.group({
      userNameInput: new FormControl(null, Validators.required),
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      passwordInput: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      phoneInput: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      //statusInput: new FormControl(null, Validators.required),
    });
  }

  onFormSubmit(data: any) {
    if(this.createUserForm.valid) {
      const request = {
        name: this.createUserForm.value.userNameInput,
        role_id: '63c6917642c4fd106d7599b5',
        email: this.createUserForm.value.emailInput,
        password: this.createUserForm.value.passwordInput,
        phone: this.createUserForm.value.phoneInput,
        status: 'active'
      };
      this.usersService.createUser(request).subscribe((result: any) => {
          this.createUserForm.reset();
          this.snackBar.open(result.message, "", {
            duration: 2000,
            panelClass: ['glinz-snackbar--success']
          });
        },
        error => {
          this.snackBar.open(error.error.message, "", {
            duration: 2000,
            panelClass: ['glinz-snackbar--error']
          });
        })
    }
  }

  onFormReset($event:any) {
    $event.preventDefault();
    this.createUserForm.reset();
  }

}
