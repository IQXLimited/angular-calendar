import {
  ElementRef,
  OnDestroy,
  Directive,
  inject,
  input,
  effect,
} from "@angular/core"

@Directive ( {
  selector: "[appPortal]"
} )
export class PortalDirective implements OnDestroy {
  public appPortal = input<HTMLElement> ( )

  private el: ElementRef = inject ( ElementRef )

  public constructor ( ) {
    effect ( ( ) => {
      const target = this.appPortal ( )

      // If a target is provided, append the element to it
      if ( target ) {
        target.append ( this.el.nativeElement )
      }
    } )
  }

  public ngOnDestroy ( ) {
    if ( this.el.nativeElement.parentNode === this.appPortal ( ) ) {
      this.el.nativeElement.remove ( )
    }
  }
}