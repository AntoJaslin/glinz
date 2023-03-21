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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsiteService } from 'src/app/core/services/website.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {

    categoryId: any;
    list : any[];
    productsList: any = [];
    imgUrl = "http://localhost:3000/images/products/";
    paramsSub!: Subscription;

    ngOnInit(): void {
        //console.log("calls to get products");
       this.getProducts();
    }

    constructor(private webService: WebsiteService, 
                private activeRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef) {
        this.list = 
        [
            {name :'India',checked : false},
            {name :'US',checked : false},
            {name :'China',checked : false},
            {name :'France',checked : false}
        ]
       //console.log("calls to get products");
        this.paramsSub = activeRoute.params.subscribe(param =>  {
            console.log(activeRoute); 
            this.categoryId = param['category_id'];
            if(this.categoryId != undefined) {
                const requestObject = "";
                this.webService.getProducts(this.categoryId, requestObject).subscribe((response: any) => {
                    this.productsList = response.data;
                    this.cdr.detectChanges();
                });
            } 
        });
       
        // this.categoryId = activeRoute.snapshot.params['category_id'];
    }

    ngOnChanges() {
        this.getProducts();
    }

    shareCheckedList(item: any){
        console.log(item);
    }
    shareIndividualCheckedList(item: any){
        console.log(item);
    }

    getProducts() {
        // const requestObject = "?sort=" + 10;
        const requestObject = "";
        if(this.categoryId != undefined) {
            this.webService.getProducts(this.categoryId, requestObject).subscribe((response: any) => {
                this.productsList = response.data;
                this.cdr.detectChanges();
            });
        }
    }

    public ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
    }

}
