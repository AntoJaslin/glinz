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
  
@Component({
selector: 'app-admin-layout',
templateUrl: './admin-layout.component.html',
styleUrls: ['./admin-layout.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  
  showFiller = false;
  constructor(private customIconsService: CustomIconsService,) {
    
  }

  ngOnInit(): void {
      
  }


}
