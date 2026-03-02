import { handlePasteEvent } from "@/components/contextMenu/utils";
import { ICalendarApp, ViewType } from "@/types";
import { clipboardStore } from "@/utils/clipboardStore";

import { ContextMenu, ContextMenuItem } from "./Primitives";

interface GridContextMenuProps {
  x: number;
  y: number;
  date: Date;
  onClose: () => void;
  app: ICalendarApp;
  onCreateEvent: () => void;
  viewType?: ViewType;
}

const GridContextMenu = ({
  x,
  y,
  date,
  onClose,
  app,
  onCreateEvent,
  viewType,
}: GridContextMenuProps) => {
  const hasCopiedEvent = clipboardStore.hasEvent();

  const handlePaste = async () => {
    await handlePasteEvent(app, date, viewType);
    onClose();
  };

  return (
    <ContextMenu x={x} y={y} onClose={onClose} className="df-context-menu">
      <ContextMenuItem
        onClick={() => {
          onCreateEvent();
          onClose();
        }}
      >
        {"New Event"}
      </ContextMenuItem>
      <ContextMenuItem onClick={handlePaste} disabled={!hasCopiedEvent}>
        {"Paste Here"}
      </ContextMenuItem>
    </ContextMenu>
  );
};

export default GridContextMenu;
