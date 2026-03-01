import { cancelButton } from "@/styles/classNames";

interface MergeCalendarDialogProps {
  sourceName: string;
  targetName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const MergeCalendarDialog = ({
  sourceName,
  targetName,
  onConfirm,
  onCancel,
}: MergeCalendarDialogProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {`Merge "${sourceName}" with "${targetName}"?`}
        </h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {`Are you sure you want to merge "${sourceName}" with "${targetName}"? Doing so will move all the events from "${sourceName}" to "${targetName}" and "${sourceName}" will be deleted. This cannot be undone.`}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className={cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-destructive px-3 py-2 text-xs font-medium text-destructive-foreground hover:bg-destructive/90"
          >
            Merge
          </button>
        </div>
      </div>
    </div>
  );
};
