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
selector: 'app-footer',
templateUrl: './footer.component.html',
styleUrls: ['./footer.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    ngOnInit(): void {
       
    }

}
