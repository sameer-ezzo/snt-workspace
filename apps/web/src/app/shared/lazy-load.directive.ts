import { Input, SimpleChanges, ElementRef } from '@angular/core';
import { Directive } from '@angular/core';


@Directive({
    selector: '[lazyload]',
})
export class LazyLoadDirective {
    @Input() errorPlaceholder: string | undefined;
    @Input() src: string | undefined;
    constructor(private el: ElementRef) {
    }

    ngOnInit(): void { this.observe([this.el.nativeElement]); }

    private _assignAttributes(element: HTMLElement) {
        this.src = this.src ?? this.el.nativeElement.dataset['src'];


        this.el.nativeElement.src = '';

        const srcset = element.dataset['srcset'];
        const sizes = element.dataset['sizes'];

        if (this.src) {
            element.dataset['src'] = this.src;
            if (!element.classList.contains('lazyload'))
                element.classList.add('lazyload');
        }
        if (srcset)
            element.dataset['srcset'] = srcset;
        if (sizes)
            element.dataset['sizes'] = sizes;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['errorPlaceholder'])
            this.el.nativeElement.onerror = () => {
                this.el.nativeElement.onerror = null;
                this.el.nativeElement.src = this.errorPlaceholder;
            };
    }

    observe(lazyImages: any[]) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    this._assignAttributes(entry.target as HTMLElement);
                }
                else {
                    this.el.nativeElement.src = this.src ?? this.el.nativeElement.dataset['src'];
                    lazyImageObserver.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(lazyImage => lazyImageObserver.observe(lazyImage));
    }
}
