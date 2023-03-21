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
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';
import { CategoriesService } from 'src/app/core/services/categories.service';
  
@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    
  allCategories: any = [];
  imgUrl = "http://localhost:3000/images/categories/"
  slides = [
      {'image': 'https://www.tanishq.co.in/wps/wcm/connect/tanishqrt/f8e3115a-2064-4096-9ae1-a4247f658722/desktop/carnivaldesktop.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80O0T6206GQH590V3000-f8e3115a-2064-4096-9ae1-a4247f658722-desktop-ojM-n0X&amp;impolicy=pqmed'}, 
      {'image': 'https://www.tanishq.co.in/wps/wcm/connect/tanishqrt/01161cc7-0a93-421e-96cb-23290ea61c23/desktop/crescendodesktopbanner.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80O0T6206GQH590V3000-01161cc7-0a93-421e-96cb-23290ea61c23-desktop-oiFjnYb&amp;impolicy=pqmed'},
      {'image': 'https://www.tanishq.co.in/wps/wcm/connect/tanishqrt/4f42436c-8b38-4f66-891b-d87aa373a730/desktop/exchangeherobannerdesktop.jpg?MOD=AJPERES&amp;CACHEID=ROOTWORKSPACE.Z18_90IA1H80O0T6206GQH590V3000-4f42436c-8b38-4f66-891b-d87aa373a730-desktop-oi5yGh1&amp;impolicy=pqmed'}, 
      {'image': 'https://d1v9pyzt136u2g.cloudfront.net/blog/wp-content/uploads/2021/07/06032400/Hindu_Wedding.jpg'}, 
      {'image': 'https://goldjewellerybuyerin.files.wordpress.com/2020/02/gold-jewellery.jpg'}
    ];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.allCategories = response.data;
    });
  }

}
