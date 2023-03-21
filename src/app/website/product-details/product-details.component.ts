import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    HostBinding,
    ViewChild,
    ChangeDetectorRef
} from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { WebsiteService } from 'src/app/core/services/website.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {

    productId: any;
    productDetails: any;
    imgUrl = "http://localhost:3000/images/products/"
    productQty: any = 1;
    
    ngOnInit(): void {
       this.getProduct();
    }

    constructor(private webService: WebsiteService, 
                private activeRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef,
                private snackBar: MatSnackBar,
                private localStorageService: LocalStorageService) {
        this.productId = activeRoute.snapshot.params['product_id'];
    }

    getProduct() {
        this.webService.getProductDetails(this.productId).subscribe((response: any) => {
            this.productDetails = response.data;
            console.log("PRoducts DTO", this.productDetails);
            this.cdr.detectChanges();
        });
    }

    addToCart(cartItem: any) {
        let isLogged = localStorage.getItem("customer-user");
        if(isLogged) {
            let productPrice = cartItem.price.replaceAll(',', '');
            cartItem.orderQuantity = this.productQty;
            cartItem.total = this.productQty * parseInt(productPrice);
            this.localStorageService.addCart(cartItem);
        } else {
            this.snackBar.open("Please login to continue!", "", {
                duration: 2000,
                panelClass: ['glinz-snackbar--info']
            });
        }
    }

    increaseQty() {
        this.productQty = this.productQty + 1;
    }

    decreaseQty() {
        if(this.productQty > 1) {
            this.productQty = this.productQty - 1;
        }
    }

}
