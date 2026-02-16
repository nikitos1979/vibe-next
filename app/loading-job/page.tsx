"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoadingJobContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRelease = searchParams.get("release") === "true";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRelease) {
        alert("No Job Available");
        router.push("/");
      } else {
        router.push("/review");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [router, isRelease]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-theme-bg">
      <h1 className="text-2xl font-semibold text-theme-text mb-8">
        Loading Job...
      </h1>
      <div className="w-80 h-2 bg-theme-control rounded-full overflow-hidden">
        <div className="h-full bg-accent-blue rounded-full animate-loading-bar" />
      </div>
      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 3s linear forwards;
        }
      `}</style>
    </div>
  );
}

export default function LoadingJobPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-theme-bg">
          <h1 className="text-2xl font-semibold text-theme-text">Loading...</h1>
        </div>
      }
    >
      <LoadingJobContent />
    </Suspense>
  );
}
