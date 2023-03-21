import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['category', 'description', 'status', 'action'];
  dataSource: any[] = [];

  constructor(public categoryService: CategoriesService, public cdr: ChangeDetectorRef, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      console.log("users", response)
      this.dataSource = response.data;
      this.cdr.detectChanges();
    });
  }

  onCreateClick() {
    this.router.navigate(['admin/categories/create'])
  }

  onEditClick(id: any) {
    this.router.navigate(['admin/categories/edit/', id]);
  }

  onDeleteClick(id: any) {
    this.categoryService.deleteCategory(id).subscribe((result: any) => {
      this.snackBar.open(result.message, "close");
      this.getCategories();
    }, error=> {
      this.snackBar.open(error.error.message, "close");
    })
  }

}
