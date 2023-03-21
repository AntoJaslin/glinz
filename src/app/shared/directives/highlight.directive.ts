import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[highlight]'
})
export class HighlightDirective {

    @Input() 
    highlight = '';
    
    constructor(private eleRef: ElementRef) {}

    ngOnInit(): void {
        if(this.highlight == 'blue') {
            console.log("Please highlight in blue color");
        }
    }

    @HostListener('mouseover') onMouseOver() {
        this.eleRef.nativeElement.style.color = this.highlight;
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.eleRef.nativeElement.style.color = 'black';
    }
}