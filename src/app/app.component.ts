import { Component, signal, ChangeDetectionStrategy, OnDestroy, OnInit, viewChild } from "@angular/core"
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component"
import {
  Event,
  createYearView,
  createMonthView,
  createWeekView,
  createDayView,
  createDragPlugin,
  createSidebarPlugin,
  ViewType,
  CalendarType,
  EventChange,
  CalendarApp
} from "react-core"
import { createKeyboardShortcutsPlugin } from "./lib/plugins/keyboard-shortcuts"
import { CalendarComponent } from "./public-api"
import { getWebsiteCalendars } from "./utils/palette"
import { generateSampleEvents } from "./utils/sampleData"

@Component ( {
  selector: "app-root",
  imports: [
    ThemeToggleComponent,
    CalendarComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
} ) export class AppComponent implements OnInit, OnDestroy {
  public events = signal<Event[]> ( generateSampleEvents ( ) )
  public isMobile = signal ( true )

  public calendar = signal<CalendarApp | null> ( null )
  public calendaref = viewChild<CalendarComponent> ( "calendarComponent" )

  public ngOnInit ( ) {
    this.resizeHandler ( )
    window.addEventListener ( "resize", this.resizeHandler )

    this.initializeCalendar ( )
  }

  public ngOnDestroy ( ) {
    window.removeEventListener ( "resize", this.resizeHandler )
  }

  private resizeHandler = ( ) => {
    this.isMobile.set ( window.innerWidth < 768 )
  }

  private initializeCalendar ( ) {
    this.calendar.set ( new CalendarApp ( {
      views: this.isMobile ( ) ? [
        createDayView ( ),
        createWeekView ( ),
        createYearView ( { mode: "year-canvas" } )
      ] : [
        createDayView ( ),
        createWeekView ( ),
        createMonthView ( ),
        createYearView ( { mode: "year-canvas" } )
      ],
      events: this.events ( ),
      calendars: getWebsiteCalendars ( ),
      defaultCalendar: "work",
      plugins: this.isMobile ( ) ? [ ] : [
        createDragPlugin ( ),
        createKeyboardShortcutsPlugin ( ),
        createSidebarPlugin ( {
          createCalendarMode: "modal",
          colorPickerMode: "default"
        } )
      ],
      defaultView: this.isMobile ( ) ? ViewType.WEEK : ViewType.MONTH,
      theme: { mode: "auto" },
      callbacks: {
        onEventCreate: async ( event: Event ) => {
          await new Promise ( resolve => setTimeout ( resolve, 500 ) )
          console.log ( "create event:", event )
        },
        onEventClick: ( event: Event ) => {
          console.log ( "click event:", event )
        },
        onEventUpdate: ( event: Event ) => {
          console.log ( "update event:", event )
        },
        onEventDelete: ( eventId: string ) => {
          console.log ( "delete event:", eventId )
        },
        onMoreEventsClick: ( date: Date ) => {
          console.log ( "more events click date:", date )
          // if select date exists, select date and change to day view
          if ( this.calendaref ( )?.calendar ( ) ) {
            const calendar: any = this.calendaref ( )?.calendar ( )
            if ( calendar?. [ "selectDate" ] ) {
              calendar.selectDate ( date )
              calendar.changeView ( ViewType.DAY )
            }
          }
        },
        onCalendarUpdate: ( cal: CalendarType ) => {
          console.log ( "update calendar:", cal )
        },
        onCalendarDelete: ( calendarId: string ) => {
          console.log ( "delete calendar:", calendarId )
        },
        onCalendarCreate: ( cal: CalendarType ) => {
          console.log ( "create calendar:", cal )
        },
        onCalendarMerge: ( sourceId: string, targetId: string ) => {
          console.log ( "merge calendar:", sourceId, targetId )
        },
        onEventBatchChange: ( event: EventChange [ ] ) => {
          console.log ( "batch change events:", event )
        }
      }
    } ) )
  }
}