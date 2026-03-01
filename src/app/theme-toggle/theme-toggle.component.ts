import { Component, signal, ChangeDetectionStrategy, OnInit, WritableSignal } from "@angular/core"
import { Sun, Moon, LucideAngularModule } from "lucide-angular"

@Component ( {
  selector: "app-theme-toggle",
  imports: [
    LucideAngularModule
  ],
  templateUrl: "./theme-toggle.component.html",
  styleUrl: "./theme-toggle.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ThemeToggleComponent implements OnInit {
  public isDark: WritableSignal<boolean> = signal ( false )
  public readonly Sun = Sun
  public readonly Moon = Moon

  public ngOnInit ( ): void {
    if ( document.documentElement.classList.contains ( "dark" ) || (
      !( "theme" in localStorage ) && window.matchMedia ( "(prefers-color-scheme: dark)" ).matches )
    ) {
      this.isDark.set ( true )
      document.documentElement.classList.add ( "dark" )
    } else {
      this.isDark.set ( false )
      document.documentElement.classList.remove ( "dark" )
    }
  }

  public toggleTheme ( ): void {
    this.isDark.set ( !this.isDark ( ) )
    if ( this.isDark ( ) ) {
      document.documentElement.classList.add ( "dark" )
      localStorage.setItem ( "theme", "dark" )
    } else {
      document.documentElement.classList.remove ( "dark" )
      localStorage.setItem ( "theme", "light" )
    }
  }
}
