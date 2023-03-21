import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editUserForm!: FormGroup;
  editUserId!: String;

  constructor(private activeRoute:ActivatedRoute, private fb: FormBuilder, private usersService: UsersService, private snackBar: MatSnackBar) { 
    console.log(activeRoute.snapshot.params['id']);
    this.editUserId = activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.buildEditUserForm();
    if(this.editUserId != '' || this.editUserId != undefined) {
      this.getSingleUser(this.editUserId);
    }
  }

  buildEditUserForm() {
    this.editUserForm = this.fb.group({
      userNameInput: new FormControl(null, Validators.required),
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      //passwordInput: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      phoneInput: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      //statusInput: new FormControl(null, Validators.required),
    });
  }

  getSingleUser(id: any) {
    this.usersService.getUser(id).subscribe((result: any) => {
      this.editUserForm.patchValue({
        userNameInput: result.data.name,
        emailInput: result.data.email,
        //passwordInput: result.data.password,
        phoneInput: result.data.phone
      })
    }, error => {
      this.snackBar.open(error.error.message, "close");
    })
  }

  onFormSubmit(data: any) {
    console.log(this.editUserForm.valid);
    if(this.editUserForm.valid) {
      const request = {
        name: this.editUserForm.value.userNameInput,
        role_id: '63c6917642c4fd106d7599b5',
        email: this.editUserForm.value.emailInput,
        //password: this.editUserForm.value.passwordInput,
        phone: this.editUserForm.value.phoneInput,
        status: 'active'
      };
      this.usersService.editUser(this.editUserId, request).subscribe((result: any) => {
          // this.editUserForm.reset();
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

}
