import { Directive, Output, EventEmitter, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';

export type ScrollEvent = { top: number, height: number }
@Directive({
  selector: '[scroll]'
})
export class ScrollListenerDirective implements AfterViewInit, OnDestroy {
  private readonly destroyed$ = new Subject<void>()
  private _root!: HTMLElement;

  @Output() up = new EventEmitter<ScrollEvent>();
  @Output() down = new EventEmitter<ScrollEvent>();


  private __debounceTime = 500;
  @Input('debounceTime')
  public get _debounceTime() { return this.__debounceTime; }
  public set _debounceTime(value) { this.__debounceTime = Math.max(0, value) }

  private _threshold = 350;
  @Input()
  public get threshold() { return this._threshold; }
  public set threshold(value) { this._threshold = Math.max(0, value) }

  private _lastPosition = 0
  @Input()
  public set root(value: string | HTMLElement | null) {
    const self = this.hostRef?.nativeElement ?? document.body
    if (!value) value = self
    this._root = typeof value === 'string' ? document.querySelector(value) ?? self : value

    this._lastPosition = this._root.scrollTop
  }
  constructor(private readonly hostRef: ElementRef) { }
  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  ngAfterViewInit(): void {
    if (!this._root) this.root = null
    fromEvent(this._root!, 'scroll').pipe(
      takeUntil(this.destroyed$),
      debounceTime(this._debounceTime),
    ).subscribe(e => this.onScroll(e))

  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const diff = element.scrollTop - this._lastPosition
    const dist = Math.abs(diff)
    console.log(`Last Position = ${this._lastPosition}, scrollTop = ${element.scrollTop} Diff = ${diff}, Dist =  ${dist}`);
    if (dist <= this.threshold) return
    
    const e = { top: element.scrollTop, height: element.scrollHeight } as ScrollEvent

    if (diff > 0) this.down.emit(e)
    else this.up.emit(e)

    this._lastPosition = element.scrollTop
  }
}