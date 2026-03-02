/**
 * Logger utility for AngularCalendar
 * Only logs in development mode
 */

type LogLevel = "log" | "warn" | "error" | "debug"

class Logger {
  private isDevelopment: boolean

  public constructor () {
    this.isDevelopment =
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ( globalThis as unknown as { process?: { env?: { NODE_ENV?: string } } } )
        .process?.env?.NODE_ENV !== "production"
  }

  public log ( message: string, ...args: unknown[] ): void {
    this.formatMessage ( "log", message, ...args )
  }

  public warn ( message: string, ...args: unknown[] ): void {
    this.formatMessage ( "warn", message, ...args )
  }

  public error ( message: string, ...args: unknown[] ): void {
    this.formatMessage ( "error", message, ...args )
  }

  public debug ( message: string, ...args: unknown[] ): void {
    this.formatMessage ( "debug", message, ...args )
  }

  private formatMessage (
    level: LogLevel,
    message: string,
    ...args: unknown[]
  ): void {
    if ( !this.isDevelopment ) return

    const timestamp = new Date ().toISOString ()
    const prefix = `[AngularCalendar ${level.toUpperCase ()}] ${timestamp}:`

    switch ( level ) {
      case "log":
        console.log ( prefix, message, ...args )
        break
      case "warn":
        console.warn ( prefix, message, ...args )
        break
      case "error":
        console.error ( prefix, message, ...args )
        break
      case "debug":
        console.debug ( prefix, message, ...args )
        break
      default:
        break
    }
  }
}

export const logger = new Logger ()
