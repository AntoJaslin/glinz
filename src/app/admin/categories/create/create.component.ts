import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createCategoryForm!: FormGroup;
  categoryImage = null;
  items = ['Javascript', 'Typescript'];
  tags:any = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildCreateCategoryForm();
  }

  buildCreateCategoryForm() {
    this.createCategoryForm = this.fb.group({
      categoryNameInput: new FormControl(null, Validators.required),
      descriptionInput: new FormControl(null, Validators.required),
      subCategoriesInput: new FormControl(null, Validators.required),
      imageInput: new FormControl(null, Validators.required),
      statusInput: new FormControl('active', Validators.required),
    });
  }

  onFormSubmit(data: any) {
    if(this.createCategoryForm.valid) {
      console.log(this.createCategoryForm.value);
      if(this.categoryImage != null) {
        const formData = new FormData();
        formData.append('categoryImage', this.categoryImage);
        this.categoriesService.uploadCategoryImage(formData).subscribe((result: any) => {
          const request = {
            category: this.createCategoryForm.value.categoryNameInput,
            products: 0,
            description: this.createCategoryForm.value.descriptionInput,
            subCategories: this.createCategoryForm.value.subCategoriesInput,
            image: result.file.filename,
            status: this.createCategoryForm.value.statusInput,
          };
          this.categoriesService.createCategory(request).subscribe((result: any) => {
              this.createCategoryForm.reset();
              this.tags = [];
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

  public onSelect(item: any) {
    console.log('tag selected: value is ' + item);
  }

  addChip(event: any): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
      this.createCategoryForm.patchValue({ subCategoriesInput: this.tags });
    }

    event.chipInput!.clear();
  }

  removeChip(tag: any): void {
    const index = this.tags.indexOf(tag);
    
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.createCategoryForm.patchValue({ subCategoriesInput: this.tags });
    }
  }

}
