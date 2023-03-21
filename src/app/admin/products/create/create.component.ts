import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {

  createProductForm!: FormGroup;
  productCategories: any;
  subCategories: any;
  productTypes: any;
  selectedFile!: File;
  productImage = null;
  @ViewChild('fileInput') fileInput: any; 
  url: any;
	msg = "";
  
  genders: any = [{
    key: "men",
    value: "Men"
  },{
    key: "women",
    value: "Women"
  },{
    key: "kids",
    value: "Kids"
  }]

  constructor(private fb: FormBuilder, 
              private productService: ProductsService,
              private categoryService: CategoriesService, 
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildCreateProductForm();
    this.getProductCategories();
    this.getProductTypes();
  }

  buildCreateProductForm() {
    this.createProductForm = this.fb.group({
      productNameInput: new FormControl(null, Validators.required),
      descriptionInput: new FormControl(null, [Validators.required]),
      priceInput: new FormControl(null, Validators.required),
      categoryInput: new FormControl(null, [Validators.required]),
      subCategoryInput: new FormControl(null, [Validators.required]),
      quantityInput: new FormControl(null, [Validators.required]),
      purityInput: new FormControl(null, Validators.required),
      productTypeInput: new FormControl(null, Validators.required),
      offerTypeInput: new FormControl(null),
      offerNameInput: new FormControl(null),
      offerInput: new FormControl(null),
      genderInput: new FormControl(null, Validators.required),
      imageInput: new FormControl(null, Validators.required),
      statusInput: new FormControl('active', Validators.required)
      //statusInput: new FormControl(null, Validators.required),
    });
  }

  getProductCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.productCategories = response.data;
    });
  }

  getProductTypes() {
    this.productService.getAllProductTypes().subscribe((response: any) => {
      this.productTypes = response.data;
    });
  }

  onFormSubmit(data: any) {
    if(this.createProductForm.valid) {
      if(this.productImage != null) {
        const formData = new FormData();
        formData.append('productImage', this.productImage);
        this.productService.uploadProductImage(formData).subscribe((result: any) => {
          const request = {
          product: this.createProductForm.value.productNameInput,
          description: this.createProductForm.value.descriptionInput,
          price: this.createProductForm.value.priceInput,
          category: this.createProductForm.value.categoryInput,
          subCategory: this.createProductForm.value.subCategoryInput,
          quantity: this.createProductForm.value.quantityInput,
          purity: this.createProductForm.value.purityInput,
          productType: this.createProductForm.value.productTypeInput,
          offerType: this.createProductForm.value.offerTypeInput,
          offerName: this.createProductForm.value.offerNameInput,
          offer: this.createProductForm.value.offerInput,
          gender: this.createProductForm.value.genderInput,
          image: result.file.filename,
          status: this.createProductForm.value.statusInput,
        };
        this.productService.createProduct(request).subscribe((result: any) => {
            this.createProductForm.reset();
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
        }, (error: any) => {
          this.snackBar.open(error.error.message, "", {
            duration: 2000,
            panelClass: ['glinz-snackbar--error']
          });
        });
      }
      
    }
  }

  onFormReset($event:any) {
    $event.preventDefault();
    this.createProductForm.reset();
  }
  
  selectImage(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productImage = file;
    }
  }

  onCategorySelect($e: any) {
    this.categoryService.getCategory($e.value).subscribe((response: any) => {
      this.subCategories = response.data.subCategories;
    })
  }

}
