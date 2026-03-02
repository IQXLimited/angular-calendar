import { Event } from "@/types"

class ClipboardStore {
  private lastCopiedEvent: Event | null = null

  public setEvent ( event: Event ) {
    this.lastCopiedEvent = event
  }

  public getEvent (): Event | null {
    return this.lastCopiedEvent
  }

  public hasEvent (): boolean {
    return this.lastCopiedEvent !== null
  }

  public clear () {
    this.lastCopiedEvent = null
  }
}

export const clipboardStore = new ClipboardStore ()
