import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-product-types',
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss']
})
export class ProductTypesComponent implements OnInit {

  displayedColumns: string[] = ['product_type', 'description', 'status', 'action'];
  dataSource: any[] = [];
  isEmpty = false;

  constructor(public productTypeService: ProductsService, 
              public cdr: ChangeDetectorRef, 
              private router: Router, 
              private snackBar: MatSnackBar,
              private matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response: any) => {
      console.log(response);
      this.dataSource = response.data;
      if (response.data.length == 0) {
        this.isEmpty = true;
      }
      this.cdr.detectChanges();
    });
  }

  onCreateClick() {
    const dialogRef = this.matDialog.open(CreateComponent, {
      width: '45%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProductTypes();
    });
  }

  onEditClick(id: any) {
    const dialogRef = this.matDialog.open(EditComponent, {
      width: '45%',
      data: {type_id: id}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProductTypes();
    });
  }

  onDeleteClick(id: any) {
    this.productTypeService.deleteProductType(id).subscribe((result: any) => {
      this.snackBar.open(result.message, "close");
      this.getProductTypes();
    }, error=> {
      this.snackBar.open(error.error.message, "close");
    })
  }

}
