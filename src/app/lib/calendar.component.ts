import {
  Component,
  ElementRef,
  TemplateRef,
  viewChild,
  input,
  signal,
  effect,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { PortalDirective } from "./portal.directive" // adjust path
import { UseCalendarAppReturn, ICalendarApp, CalendarAppConfig, CustomRendering, CalendarApp, CalendarRenderer } from "react-core"

@Component ( {
  selector: "app-calendar",
  imports: [
    CommonModule,
    PortalDirective
  ],
  templateUrl: "./calendar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None
} )
export class CalendarComponent {
  // --- Signal Inputs ---
  public calendar = input.required<ICalendarApp | UseCalendarAppReturn | CalendarAppConfig> ( )
  public collapsedSafeAreaLeft = input<number | null> ( null )

  // Templates as Signal Inputs
  public eventContent = input<TemplateRef<unknown>> ( )
  public eventDetailContent = input<TemplateRef<unknown>> ( )
  public eventDetailDialog = input<TemplateRef<unknown>> ( )
  public headerContent = input<TemplateRef<unknown>> ( )
  public createCalendarDialog = input<TemplateRef<unknown>> ( )
  public titleBarSlot = input<TemplateRef<unknown>> ( )
  public colorPicker = input<TemplateRef<unknown>> ( )
  public colorPickerWrapper = input<TemplateRef<unknown>> ( )

  // --- View Queries ---
  public container = viewChild<ElementRef<HTMLElement>> ( "container" )

  // --- State ---
  public customRenderings = signal<CustomRendering[]> ( [ ] )
  private renderer?: CalendarRenderer

  public constructor ( ) {
    /**
     * Reactively handle Calendar Lifecycle
     */
    effect ( onCleanup => {
      const hostElement = this.container ( )?.nativeElement
      const calendarData = this.calendar ( )
      const safeArea = this.collapsedSafeAreaLeft ( )

      if ( !hostElement || !calendarData ) return

      // Determine internal app instance
      const app = this.resolveApp ( calendarData )

      this.renderer = new CalendarRenderer ( app )
      this.renderer.setProps ( { collapsedSafeAreaLeft: safeArea } )
      this.renderer.mount ( hostElement )

      const unsubscribe = this.renderer.getCustomRenderingStore ( ).subscribe ( renderings => {
        // Update signal - triggers UI update in Zoneless
        this.customRenderings.set ( [ ...renderings.values ( ) ] )
      } )

      // Cleanup logic (Replaces ngOnDestroy and part of ngOnChanges)
      onCleanup ( ( ) => {
        unsubscribe ( )
        this.renderer?.unmount ( )
        this.renderer = undefined
      } )
    } )
  }

  public getTemplate ( name: string ): TemplateRef<unknown> | null {
    const templates: Record<string, TemplateRef<unknown> | undefined> = {
      eventContent: this.eventContent ( ),
      eventDetailContent: this.eventDetailContent ( ),
      eventDetailDialog: this.eventDetailDialog ( ),
      headerContent: this.headerContent ( ),
      createCalendarDialog: this.createCalendarDialog ( ),
      titleBarSlot: this.titleBarSlot ( ),
      colorPicker: this.colorPicker ( ),
      colorPickerWrapper: this.colorPickerWrapper ( ),
    }
    return templates [ name ] ?? null
  }

  private resolveApp ( data: any ): ICalendarApp {
    if ( data instanceof CalendarApp ) return data
    if ( data.app ) return data.app
    if ( data.views ) return new CalendarApp ( data as CalendarAppConfig )
    return data as ICalendarApp
  }
}