import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  eager?: boolean;
}

const OptimizedImage = ({ src, alt, className, eager = false, ...props }: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div ref={ref} className="relative">
      {!loaded && (
        <div className={cn("animate-pulse bg-muted rounded-xl", className)} {...props} />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          className={cn(className, loaded ? "opacity-100" : "opacity-0", "transition-opacity duration-300")}
          onLoad={() => setLoaded(true)}
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
