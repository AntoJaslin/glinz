import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createProductTypeForm!: FormGroup;
  productTypeImage = null;

  constructor(private fb: FormBuilder, 
              private productTypeService: ProductsService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<CreateComponent>,) { }

  ngOnInit(): void {
    this.buildCreateProductTypeForm();
  }

  buildCreateProductTypeForm() {
    this.createProductTypeForm = this.fb.group({
      typeNameInput: new FormControl(null, Validators.required),
      descriptionInput: new FormControl(null, Validators.required),
      imageInput: new FormControl(null, Validators.required),
      statusInput: new FormControl('active', Validators.required),
    });
  }

  onFormSubmit(data: any) {
    if(this.createProductTypeForm.valid) {
      if(this.productTypeImage != null) {
        const formData = new FormData();
        formData.append('productTypeImage', this.productTypeImage);
        this.productTypeService.uploadProductTypeImage(formData).subscribe((result: any) => {
          const request = {
            type: this.createProductTypeForm.value.typeNameInput,
            products: 0,
            description: this.createProductTypeForm.value.descriptionInput,
            image: result.file.filename,
            status: this.createProductTypeForm.value.statusInput,
          };
          this.productTypeService.createProductType(request).subscribe((result: any) => {
              this.createProductTypeForm.reset();
              this.snackBar.open(result.message, "", {
                duration: 2000,
                panelClass: ['glinz-snackbar--success']
              });
              this.dialogRef.close();
            },
            error => {
              this.snackBar.open(error.error.message, "", {
                duration: 2000,
                panelClass: ['glinz-snackbar--error']
              });
            })
        });
      }
    }
  }

  selectImage(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productTypeImage = file;
    }
  }

  dialogClose($event: any) {
    $event.preventDefault();
    this.dialogRef.close();
  }

}
