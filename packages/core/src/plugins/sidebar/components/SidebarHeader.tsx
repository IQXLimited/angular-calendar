import {
  sidebarHeader,
  sidebarHeaderToggle,
  sidebarHeaderTitle
} from "@/styles/classNames"
import {
  PanelRightClose,
  PanelRightOpen,
} from "@/components/common/Icons"

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

export const SidebarHeader = ({
  isCollapsed,
  onCollapseToggle,
}: SidebarHeaderProps) => {
  return (
    <div className={sidebarHeader}>
      <button
        type="button"
        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        className={sidebarHeaderToggle}
        onClick={onCollapseToggle}
      >
        {isCollapsed ? (
          <PanelRightClose className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <PanelRightOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      {!isCollapsed && (
        <div className="ml-3 flex flex-1 items-center justify-between">
          <span className={sidebarHeaderTitle}>Calendars</span>
        </div>
      )}
    </div>
  );
};
