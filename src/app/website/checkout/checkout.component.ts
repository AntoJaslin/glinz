import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { WebsiteService } from 'src/app/core/services/website.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  personalInfo: any;
  addressForm!: FormGroup;
  myCart: any;
  myCartTotal: any = 0;

  constructor(private localStorageService: LocalStorageService, 
              private fb: FormBuilder,
              private websiteService: WebsiteService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildAddressForm();
    this.getUserDetails();
    this.getCartItems();
  }

  getUserDetails() {
    this.personalInfo = this.localStorageService.getItem("customer-user")
  }

  getCartItems() {
    this.myCart = this.localStorageService.getCart();
    this.myCart.forEach((cartItem: any) => {
      this.myCartTotal = this.myCartTotal + cartItem.total;
    });
  }

  buildAddressForm() {
    this.addressForm = this.fb.group({
      address1Input: new FormControl(null, Validators.required),
      address2Input: new FormControl(null, [Validators.required]),
      stateInput: new FormControl(null, [Validators.required]),
      pincodeInput: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    });
  }

  onFormSubmit(data: any) {
    if(this.addressForm.valid) {
      let products = this.myCart;
      let customer = this.localStorageService.getItem("customer-user");
      console.log("Products: ", this.myCart);
      const request = {
        products: this.myCart,
        orderTotal: this.myCartTotal,
        customerInfo: customer,
        address1: this.addressForm.value.address1Input,
        address2: this.addressForm.value.address2Input,
        state: this.addressForm.value.stateInput,
        pincode: this.addressForm.value.pincodeInput,
      };

      this.websiteService.createOrder(request).subscribe((result: any) => {
          this.addressForm.reset();
          this.addressForm.markAsPristine();
          this.addressForm.markAsUntouched();
          this.localStorageService.removeItem("uset-cart");
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
    this.addressForm.reset();
  }

}
