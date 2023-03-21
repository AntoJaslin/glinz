import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['product', 'description', 'category' ,'status', 'action'];
  dataSource: any[] = [];
  productCategories: any;

  constructor(private categoryService: CategoriesService,public productService: ProductsService, public cdr: ChangeDetectorRef, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductCategories();
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((response: any) => {
      console.log("users", response)
      this.dataSource = response.data;
      this.cdr.detectChanges();
    });
  }

  getProductCategories() {
    this.categoryService.getAllCategories()
    .subscribe((response: any) => {
      console.log("categories", response.data);
      this.productCategories = response.data;
    });
  }

  onCreateClick() {
    this.router.navigate(['admin/products/create'])
  }

  onEditClick(id: any) {
    this.router.navigate(['admin/products/edit/', id]);
  }

  onDeleteClick(id: any) {
    this.productService.deleteProduct(id).subscribe((result: any) => {
      this.snackBar.open(result.message, "close");
      this.getProducts();
    }, error=> {
      this.snackBar.open(error.error.message, "close");
    })
  }

}
