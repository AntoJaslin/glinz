import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomIconsService } from 'src/app/core/services/custom-icons.service';
import { UsersService } from 'src/app/core/services/users.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface User {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone', 'status', 'action'];
  dataSource: any[] = [];

  constructor(public usersService: UsersService, public cdr: ChangeDetectorRef, private router: Router, private snackBar: MatSnackBar, private customIconsService: CustomIconsService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe((response: any) => {
      console.log("users", response)
      this.dataSource = response.data;
      this.cdr.detectChanges();
    });
  }

  onCreateClick() {
    this.router.navigate(['admin/users/create'])
  }

  onEditClick(id: any) {
    this.router.navigate(['admin/users/edit/', id]);
  }

  onDeleteClick(id: any) {
    this.usersService.deleteUser(id).subscribe((result: any) => {
      this.snackBar.open(result.message, "", {
        duration: 2000,
        panelClass: ['glinz-snackbar--success']
      });
      this.getUsers();
    }, error=> {
      this.snackBar.open(error.error.message, "", {
        duration: 2000,
        panelClass: ['glinz-snackbar--error']
      });
    })
  }

}
