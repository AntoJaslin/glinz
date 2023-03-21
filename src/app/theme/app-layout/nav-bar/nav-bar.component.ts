import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    HostBinding,
    ViewChild,
    ElementRef,
    ChangeDetectorRef
  } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ModulesList } from './menu';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
  
@Component({
selector: 'app-nav-bar',
templateUrl: './nav-bar.component.html',
styleUrls: ['./nav-bar.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  modulesList: Array<any>;
  @ViewChild("accountBox") accountBox!: ElementRef;
  menuList: Array<any> = [];
  isLogged: any = false;

  constructor(public dialog: MatDialog, 
              private categoryService: CategoriesService, 
              private cdr: ChangeDetectorRef,
              private storage: LocalStorageService,) {
    this.modulesList = ModulesList;
  }

  ngOnInit(): void {
    this.getCategories();
    if(localStorage.getItem('customer-user')) {
      this.isLogged = true;
    }
  }

  openAccountBox() {
    if(localStorage.getItem('customer-user')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.accountBox.nativeElement.classList.toggle('d-none');
  }

  onLoginClick() {
    this.accountBox.nativeElement.classList.toggle('d-none');
    this.dialog.open(LoginComponent, {
      panelClass: 'glinz-dialog',
      width: '45%',
    });
  }

  onSignupClick() {
    this.accountBox.nativeElement.classList.toggle('d-none');
    this.dialog.open(SignupComponent, {
      panelClass: 'glinz-dialog',
      width: '45%',
    });
  }

  onLgoutClick() {
    this.storage.removeItem('token');
    this.storage.removeItem('customer-user');
    this.accountBox.nativeElement.classList.toggle('d-none');
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      let moreChildren: any = [];
      response.data.forEach((category: any, index: any) => {
        if(index <= 4) {
          this.menuList.push({
            label: category.category,
            children: category.subCategories,
            id: category._id
          });
        } else {
          moreChildren.push(category.category);
        }
        
      });
      this.menuList.push({
        label: "More",
        children: moreChildren
      });
      this.cdr.detectChanges();
      console.log("Menu List", this.menuList);
    });
  }

}

export interface parentMenuItem {
  label: String,
  children: Array<FirstChildMenuItem>
}

export interface FirstChildMenuItem {
  label: String
}