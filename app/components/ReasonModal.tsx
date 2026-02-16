const reasons = ["Structure", "ID Terms", "Punctuation"];

interface ReasonModalProps {
  onSelect: (reason: string) => void;
  onCancel: () => void;
}

export default function ReasonModal({ onSelect, onCancel }: ReasonModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-theme-panel border border-theme-border rounded-lg p-6 w-80">
        <h2 className="text-lg font-semibold text-theme-text mb-4">
          Select Reason
        </h2>
        <div className="flex flex-col gap-2 mb-4">
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => onSelect(reason)}
              className="w-full px-4 py-2.5 bg-theme-control hover:bg-theme-surface border border-theme-border text-theme-text rounded font-medium cursor-pointer transition-colors text-left"
            >
              {reason}
            </button>
          ))}
        </div>
        <button
          onClick={onCancel}
          className="w-full px-4 py-2 text-theme-text-secondary hover:text-theme-text cursor-pointer transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
