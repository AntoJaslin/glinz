import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editProductForm!: FormGroup;
  productCategories: any;
  subCategories: any;
  productTypes: any;
  editProductId: any;
  imgUrl = "";
  productImage = null;
  existingImage = null;
  
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
              private activeRoute: ActivatedRoute,
              private productService: ProductsService,
              private categoryService: CategoriesService, 
              private snackBar: MatSnackBar) { 
                this.editProductId = activeRoute.snapshot.params['id'];
              }

  ngOnInit(): void {
    this.buildCreateProductForm();
    this.getProductCategories();
    this.getProductTypes();
    if(this.editProductId != '' || this.editProductId != undefined) {
      this.getProduct(this.editProductId);
    }
  }

  buildCreateProductForm() {
    this.editProductForm = this.fb.group({
      productNameInput: new FormControl(null, Validators.required),
      descriptionInput: new FormControl(null, [Validators.required]),
      priceInput: new FormControl(null, Validators.required),
      categoryInput: new FormControl(null, [Validators.required]),
      subCategoryInput: new FormControl(null, [Validators.required]),
      quantityInput: new FormControl(null, [Validators.required]),
      purityInput: new FormControl(null, Validators.required),
      productTypeInput: new FormControl(null, [Validators.required]),
      offerTypeInput: new FormControl(null),
      offerNameInput: new FormControl(null),
      offerInput: new FormControl(null),
      genderInput: new FormControl(null, Validators.required),
      imageInput: new FormControl(null),
      statusInput: new FormControl('active', Validators.required)
    });
  }

  getProduct(id: any) {
    
    this.productService.getProduct(id).subscribe((response: any) => {
      this.imgUrl = "http://localhost:3000/images/products/" + response.data.image;
      this.existingImage = response.data.image;
      this.categoryService.getCategory(response.data.category._id).subscribe((CategoryResponse: any) => {
        this.subCategories = CategoryResponse.data.subCategories;
        this.editProductForm.patchValue({
          productNameInput: response.data.product,
          descriptionInput: response.data.description,
          priceInput: response.data.price,
          categoryInput: response.data.category._id,
          subCategoryInput: response.data.subCategory,
          quantityInput: response.data.quantity,
          purityInput: response.data.purity,
          productTypeInput: response.data.productType,
          offerTypeInput: response.data.offerType,
          offerNameInput: response.data.offerName,
          offerInput: response.data.offer,
          genderInput: response.data.gender,
          statusInput: response.data.status
        })
      })
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
    if(this.editProductForm.valid) {
      const request: any = {
        product: this.editProductForm.value.productNameInput,
        description: this.editProductForm.value.descriptionInput,
        price: this.editProductForm.value.priceInput,
        category: this.editProductForm.value.categoryInput,
        subCategory: this.editProductForm.value.subCategoryInput,
        quantity: this.editProductForm.value.quantityInput,
        purity: this.editProductForm.value.purityInput,
        productType: this.editProductForm.value.productTypeInput,
        offerType: this.editProductForm.value.offerTypeInput,
        offerName: this.editProductForm.value.offerNameInput,
        offer: this.editProductForm.value.offerInput,
        gender: this.editProductForm.value.genderInput,
        status: this.editProductForm.value.statusInput,
      };
      
      if(this.productImage != null) {
        const formData = new FormData();
        formData.append('productImage', this.productImage);
        this.productService.uploadProductImage(formData).subscribe((result: any) => {
          request.image = result.file.filename;
          this.imgUrl = "http://localhost:3000/images/products/" + result.file.filename;
          this.productService.editProduct(this.editProductId, request).subscribe((result: any) => {
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
        })
      } else {
        request.image = this.existingImage;
        this.productService.editProduct(this.editProductId, request).subscribe((result: any) => {
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

  onFormReset($event:any) {
    $event.preventDefault();
    this.editProductForm.reset();
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
