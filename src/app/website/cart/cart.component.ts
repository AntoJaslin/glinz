import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  myCart: any;
  imgUrl = "http://localhost:3000/images/products/";
  myCartTotal: any = 0;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.myCart = this.localStorageService.getCart();
    this.myCart.forEach((cartItem: any) => {
      this.myCartTotal = this.myCartTotal + cartItem.total;
    });
  }

  removeCartItem(index: any) {
    this.myCart = this.localStorageService.removeCartItem(index);
  }

}
