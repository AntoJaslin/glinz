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
selector: 'app-website',
templateUrl: './website.component.html',
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsiteComponent implements OnInit {
    ngOnInit(): void {
       
    }
}
