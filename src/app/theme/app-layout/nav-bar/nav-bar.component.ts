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
selector: 'app-nav-bar',
templateUrl: './nav-bar.component.html',
styleUrls: ['./nav-bar.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
    ngOnInit(): void {
       
    }

}
