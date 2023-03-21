import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    HostBinding
  } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CustomIconsService } from 'src/app/core/services/custom-icons.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { Router } from '@angular/router';
  
@Component({
selector: 'app-toolbar',
templateUrl: './toolbar.component.html',
styleUrls: ['./toolbar.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {

  currentUser: any;

  constructor(private customIconsService: CustomIconsService,
              private storage: LocalStorageService,
              private router: Router) {
    
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.storage.getItem("user");
  }

  onUserLogout() {
    this.storage.removeItem("user");
    this.storage.removeItem("token");
    this.router.navigate(['admin/login']);
  }


}
