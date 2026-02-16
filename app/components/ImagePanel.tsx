interface ImagePanelProps {
  title: string;
  src: string;
  alt: string;
}

export default function ImagePanel({ title, src, alt }: ImagePanelProps) {
  return (
    <div className="flex flex-col bg-theme-panel border border-theme-border rounded overflow-hidden h-full">
      <div className="bg-theme-surface px-3 py-1.5 text-xs font-medium text-theme-text-secondary border-b border-theme-border">
        {title}
      </div>
      <div className="flex-1 flex items-center justify-center p-2 overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
