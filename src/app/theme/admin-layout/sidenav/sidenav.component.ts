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
  
@Component({
selector: 'app-sidenav',
templateUrl: './sidenav.component.html',
styleUrls: ['./sidenav.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  
  showFiller = false;

  constructor() {
    
  }

  ngOnInit(): void {
      
  }


}
