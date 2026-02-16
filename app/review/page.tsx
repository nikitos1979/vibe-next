"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavSidebar from "../components/NavSidebar";
import ImagePanel from "../components/ImagePanel";
import ExactConfirmModal from "../components/ExactConfirmModal";
import ReasonModal from "../components/ReasonModal";
import JobCompleteModal from "../components/JobCompleteModal";

type Status = "unreviewed" | "exact" | "not-exact";

const TOTAL_PAIRS = 3;

function getImagePath(prefix: string, index: number): string {
  if (prefix === "cdxConfirm" || prefix === "Diff")
    return `/images/${prefix}${index + 1}.png`;
  const suffix = index === 0 ? "" : (index + 1).toString();
  return `/images/${prefix}${suffix}.png`;
}

export default function ReviewPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<Status[]>(
    Array(TOTAL_PAIRS).fill("unreviewed")
  );
  const [reasons, setReasons] = useState<string[]>(
    Array(TOTAL_PAIRS).fill("")
  );
  const [showExactConfirm, setShowExactConfirm] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showJobComplete, setShowJobComplete] = useState(false);

  const allReviewed = statuses.every((s) => s !== "unreviewed");

  const updateStatus = (index: number, status: Status, reason?: string) => {
    setStatuses((prev) => {
      const next = [...prev];
      next[index] = status;
      return next;
    });
    if (reason) {
      setReasons((prev) => {
        const next = [...prev];
        next[index] = reason;
        return next;
      });
    }
    // Auto-advance to next unreviewed pair
    if (index < TOTAL_PAIRS - 1) {
      setCurrentIndex(index + 1);
    }
  };

  const handleExactMatch = () => {
    setShowExactConfirm(true);
  };

  const handleExactAccept = () => {
    setShowExactConfirm(false);
    updateStatus(currentIndex, "exact");
  };

  const handleExactInvalid = () => {
    setShowExactConfirm(false);
    updateStatus(currentIndex, "not-exact", "Invalid CDX");
  };

  const handleNotExact = () => {
    setShowReasonModal(true);
  };

  const handleReasonSelect = (reason: string) => {
    setShowReasonModal(false);
    updateStatus(currentIndex, "not-exact", reason);
  };

  const handleReleaseJob = () => {
    setShowJobComplete(true);
  };

  const handleJobConfirm = () => {
    setShowJobComplete(false);
    router.push("/loading-job?release=true");
  };

  return (
    <div className="h-screen flex bg-theme-bg">
      <NavSidebar
        totalPairs={TOTAL_PAIRS}
        currentIndex={currentIndex}
        statuses={statuses}
        onSelect={setCurrentIndex}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden">
          {/* Top: Source + CDX side by side (65%) */}
          <div className="flex gap-3" style={{ flex: "65 0 0" }}>
            <div className="flex-1">
              <ImagePanel
                title="Source"
                src={getImagePath("source", currentIndex)}
                alt={`Source ${currentIndex + 1}`}
              />
            </div>
            <div className="flex-1">
              <ImagePanel
                title="Similar Match"
                src={getImagePath("cdx", currentIndex)}
                alt={`CDX ${currentIndex + 1}`}
              />
            </div>
          </div>

          {/* Bottom: Diff panel (35%) */}
          <div style={{ flex: "35 0 0" }}>
            <ImagePanel
              title="Difference Highlighting"
              src={getImagePath("Diff", currentIndex)}
              alt={`Diff ${currentIndex + 1}`}
            />
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-theme-panel border-t border-theme-border">
          <button
            onClick={handleExactMatch}
            className="px-6 py-2 bg-accent-green hover:bg-accent-green/80 text-white rounded font-medium cursor-pointer transition-colors"
          >
            Exact Match
          </button>
          <button
            onClick={handleNotExact}
            className="px-6 py-2 bg-accent-red hover:bg-accent-red/80 text-white rounded font-medium cursor-pointer transition-colors"
          >
            Not Exact
          </button>

          <div className="flex-1" />

          <span className="text-theme-text-secondary text-sm mr-2">
            {statuses.filter((s) => s !== "unreviewed").length} / {TOTAL_PAIRS} reviewed
          </span>

          <button
            onClick={handleReleaseJob}
            disabled={!allReviewed}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              allReviewed
                ? "bg-accent-blue hover:bg-accent-blue/80 text-white cursor-pointer"
                : "bg-theme-control text-theme-text-secondary cursor-not-allowed"
            }`}
          >
            Release Job
          </button>
        </div>
      </div>

      {/* Modals */}
      {showExactConfirm && (
        <ExactConfirmModal
          imageSrc={getImagePath("cdxConfirm", currentIndex)}
          onAccept={handleExactAccept}
          onInvalid={handleExactInvalid}
        />
      )}

      {showReasonModal && (
        <ReasonModal
          onSelect={handleReasonSelect}
          onCancel={() => setShowReasonModal(false)}
        />
      )}

      {showJobComplete && (
        <JobCompleteModal
          completedCount={statuses.filter((s) => s !== "unreviewed").length}
          onConfirm={handleJobConfirm}
          onCancel={() => setShowJobComplete(false)}
        />
      )}
    </div>
  );
}
