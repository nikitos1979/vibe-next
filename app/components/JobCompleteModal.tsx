interface JobCompleteModalProps {
  completedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function JobCompleteModal({
  completedCount,
  onConfirm,
  onCancel,
}: JobCompleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-theme-panel border border-theme-border rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-theme-text mb-4">
          Release Job
        </h2>
        <p className="text-theme-text-secondary mb-6">
          {completedCount} items completed, release job?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-theme-control hover:bg-theme-surface border border-theme-border text-theme-text rounded font-medium cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-accent-blue hover:bg-accent-blue/80 text-white rounded font-medium cursor-pointer transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
