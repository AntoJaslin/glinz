import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editCategoryForm!: FormGroup;
  editCategoryId!: String;
  categoryImage = null;
  existingImage = null;
  imgUrl = '';
  tags: any = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private categoriesService: CategoriesService, private snackBar: MatSnackBar) { 
    this.editCategoryId = activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.buildEditCategoryForm();
    if(this.editCategoryId != '' || this.editCategoryId != undefined) {
      this.getSingleCategory(this.editCategoryId);
    }
  }

  buildEditCategoryForm() {
    this.editCategoryForm = this.fb.group({
      categoryNameInput: new FormControl(null, Validators.required),
      descriptionInput: new FormControl(null, Validators.required),
      subCategoriesInput: new FormControl(null, Validators.required),
      imageInput: new FormControl(null),
      statusInput: new FormControl(null, Validators.required),
    });
  }

  getSingleCategory(id: any) {
    this.categoriesService.getCategory(id).subscribe((result: any) => {
      this.imgUrl = "http://localhost:3000/images/categories/" + result.data.image;
      this.existingImage = result.data.image;
      this.tags = result.data.subCategories;
      this.editCategoryForm.patchValue({
        categoryNameInput: result.data.category,
        descriptionInput: result.data.description,
        subCategoriesInput: result.data.subCategories,
        statusInput: result.data.status,
      })
    }, error => {
      this.snackBar.open(error.error.message, "close");
    })
  }

  onFormSubmit(data: any) {
    if(this.editCategoryForm.valid) {
      const request: any = {
        category: this.editCategoryForm.value.categoryNameInput,
        products: 0,
        description: this.editCategoryForm.value.descriptionInput,
        subCategories: this.editCategoryForm.value.subCategoriesInput,
        status: 'active'
      };
      if(this.categoryImage != null) {
        const formData = new FormData();
        formData.append('categoryImage', this.categoryImage);
        this.categoriesService.uploadCategoryImage(formData).subscribe((result: any) => {
          request.image = result.file.filename;
          this.imgUrl = "http://localhost:3000/images/products/" + result.file.filename;
          this.categoriesService.editCategory(this.editCategoryId ,request).subscribe((result: any) => {
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
        }, (error) => {
          this.snackBar.open(error.error.message, "", {
            duration: 2000,
            panelClass: ['glinz-snackbar--error']
          });
        });
        
      } else {
        request.image = this.existingImage;
        this.categoriesService.editCategory(this.editCategoryId ,request).subscribe((result: any) => {
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
        });
      }
      
    }
  }

  selectImage(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryImage = file;
    }
  }

  addChip(event: any): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
      this.editCategoryForm.patchValue({ subCategoriesInput: this.tags });
    }

    event.chipInput!.clear();
  }

  removeChip(tag: any): void {
    const index = this.tags.indexOf(tag);
    
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.editCategoryForm.patchValue({ subCategoriesInput: this.tags });
    }
  }

}
