import { Input, SimpleChanges, ElementRef } from '@angular/core';
import { Directive } from '@angular/core';


@Directive({
    selector: '[lazyImg]',
})
export class LazyLoadImageDirective {
    @Input() errorPlaceholder: string | undefined;
    @Input() srcSet: string | undefined
    @Input() root: string | null = null
    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        const element = this.el.nativeElement
        const srcset = element.dataset['srcset'];
        const sizes = element.dataset['sizes'];
        this.srcSet = this.srcSet ?? element.dataset['src'];
        element.src = '';

        this.observe(element);
    }



    ngOnChanges(changes: SimpleChanges): void {
        if (changes['errorPlaceholder'])
            this.el.nativeElement.onerror = () => {
                this.el.nativeElement.onerror = null;
                this.el.nativeElement.src = this.errorPlaceholder;
            };
    }

    observe(element: HTMLImageElement) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.el.nativeElement.src = this.srcSet
                    lazyImageObserver.unobserve(entry.target);
                }
            });
        }, { root: (this.root?.trim() ? document.querySelector(this.root) : document.body) });

        lazyImageObserver.observe(element)
    }
}