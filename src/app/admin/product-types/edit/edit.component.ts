import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editProductTypeForm!: FormGroup;
  editProductTypeId!: String;
  productTypeImage = null;
  existingImage = null;
  imgUrl = '';

  constructor(private activeRoute: ActivatedRoute, 
              private fb: FormBuilder, 
              private productTypeService: ProductsService, 
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<EditComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
    //this.editProductTypeId = activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.editProductTypeId = this.data.type_id;
    this.buildEditProductTypeForm();
    if(this.editProductTypeId != '' || this.editProductTypeId != undefined) {
      this.getSingleProductType(this.editProductTypeId);
    }
  }

  buildEditProductTypeForm() {
    this.editProductTypeForm = this.fb.group({
      typeNameInput: new FormControl(null, Validators.required),
      descriptionInput: new FormControl(null, Validators.required),
      imageInput: new FormControl(null),
      statusInput: new FormControl(null, Validators.required),
    });
  }

  getSingleProductType(id: any) {
    this.productTypeService.getProductType(id).subscribe((result: any) => {
      this.imgUrl = "http://localhost:3000/images/product_types/" + result.data.image;
      this.existingImage = result.data.image;
      this.editProductTypeForm.patchValue({
        typeNameInput: result.data.type,
        descriptionInput: result.data.description,
        statusInput: result.data.status,
      })
    }, error => {
      this.snackBar.open(error.error.message, "close");
    })
  }

  onFormSubmit(data: any) {
    if(this.editProductTypeForm.valid) {
      const request: any = {
        type: this.editProductTypeForm.value.typeNameInput,
        description: this.editProductTypeForm.value.descriptionInput,
        status: 'active'
      };
      if(this.productTypeImage != null) {
        const formData = new FormData();
        formData.append('productTypeImage', this.productTypeImage);
        this.productTypeService.uploadProductTypeImage(formData).subscribe((result: any) => {
          request.image = result.file.filename;
          this.imgUrl = "http://localhost:3000/images/product_types/" + result.file.filename;
          this.productTypeService.editProductType(this.editProductTypeId ,request).subscribe((result: any) => {
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
        }, (error) => {
          this.snackBar.open(error.error.message, "", {
            duration: 2000,
            panelClass: ['glinz-snackbar--error']
          });
        });
        
      } else {
        request.image = this.existingImage;
        this.productTypeService.editProductType(this.editProductTypeId ,request).subscribe((result: any) => {
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
