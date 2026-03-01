import {
  DragIndicatorProps,
  DragIndicatorRenderer
} from "@dayflow/core";

import { DefaultDragIndicatorRenderer } from "./DefaultDragIndicator";

interface DragIndicatorComponentProps extends DragIndicatorProps {
  renderer?: DragIndicatorRenderer;
}

const DragIndicatorComponent = ({
  drag,
  color,
  title,
  layout,
  allDay,
  formatTime,
  getLineColor,
  getDynamicPadding,
  renderer = DefaultDragIndicatorRenderer,
  isMobile,
}: DragIndicatorComponentProps) => {
  const eventTitle = title || (allDay ? "New All-day Event" : "New Event");

  const renderContent = () => {
    if (color) {
      if (allDay) {
        return renderer.renderAllDayContent({
          drag,
          color,
          title: eventTitle,
          layout,
          allDay,
          formatTime,
          getLineColor,
          getDynamicPadding,
          isMobile,
        });
      }
      return renderer.renderRegularContent({
        drag,
        color,
        title: eventTitle,
        layout,
        allDay,
        formatTime,
        getLineColor,
        getDynamicPadding,
        isMobile,
      });
    }

    return renderer.renderDefaultContent({
      drag,
      color,
      title: eventTitle,
      layout,
      allDay,
      formatTime,
      getLineColor,
      getDynamicPadding,
      isMobile,
    });
  };

  return <div className="drag-indicator-content">{renderContent()}</div>;
};

export default DragIndicatorComponent;
