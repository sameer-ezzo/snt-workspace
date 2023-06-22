import { Directive, ElementRef, Input } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, pairwise, share, Subject, takeUntil, throttleTime } from 'rxjs';



enum ScrollDirection {
    Up = 'Up',
    Down = 'Down'
}
enum VisibilityState {
    Visible = 'visible',
    Hidden = 'hidden'
}


@Directive({
    selector: '[reactiveToolbar]',
})
export class ReactiveToolbarDirective {
    private toolBar: HTMLElement | undefined
    @Input() rootSelector: string | undefined

    destroy = new Subject<number>()

    scroll$ = fromEvent(window, 'scroll').pipe(
        throttleTime(150),
        map(() => window.pageYOffset),
        pairwise(),
        map(([y1, y2]): ScrollDirection => (y2 < y1 ? ScrollDirection.Up : ScrollDirection.Down)),
        distinctUntilChanged(),
        share()
    )

    constructor(private el: ElementRef) { }

    ngAfterViewInit(): void {
        this.toolBar = this.el.nativeElement
        this._initStyles()
        this.scroll$.pipe(takeUntil(this.destroy)).subscribe(d => {
            this.show = d == ScrollDirection.Up
        })
    }

    ngOnDestroy(): void {
        this.destroy.next(0)
        this.destroy.complete()
    }


    private set show(show: boolean) {
        if (!this.toolBar) return
        this.toolBar.style.top = !show ? '-100px' : '0'
    }



    private _initStyles() {
        if(!this.toolBar) return
        this.toolBar.style.transition = 'top 0.3s ease-in-out'
        this.toolBar.style.position = 'fixed'
        this.toolBar.style.top = '0'
        this.toolBar.style.width = '100%'
        this.toolBar.style.zIndex = '100'
    }
}
