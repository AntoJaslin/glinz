import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { customIcon } from '../enum/custom-icons.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomIconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  public registerIcons(): void {
    Object.keys(customIcon).forEach((iconKey: string) => {
      const iconName = (customIcon as any)[iconKey];
      this.matIconRegistry.addSvgIcon(
        iconKey,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `../assets/icons/${iconName}.svg`
        )
      );
    });
  }
}
