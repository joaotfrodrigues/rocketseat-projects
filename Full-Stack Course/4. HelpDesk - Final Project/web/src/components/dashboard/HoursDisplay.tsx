import { useState, useRef, useEffect, useCallback } from "react";
import { Hour } from "./Hour";

type HoursDisplayProps = {
  hours: string[];
};

export function HoursDisplay({ hours }: HoursDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(hours.length);

  const calculateVisible = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    const firstRowTop = children[0].offsetTop;
    let fitCount = 0;

    // Calculate how many items fit including the +N badge
    for (let i = 0; i < children.length; i++) {
      if (children[i].offsetTop > firstRowTop) break;
      fitCount++;
    }

    // If we can't fit all, reserve one slot for the +N badge
    if (fitCount < hours.length) {
      fitCount = Math.max(fitCount - 1, 0);
    }

    setVisibleCount(fitCount);
  }, [hours]);

  useEffect(() => {
    calculateVisible();
    window.addEventListener("resize", calculateVisible);
    return () => window.removeEventListener("resize", calculateVisible);
  }, [calculateVisible]);

  return (
    <div className="flex gap-1 flex-wrap overflow-hidden" ref={containerRef}>
      {hours.slice(0, visibleCount).map((hour, index) => (
        <Hour hour={hour} disabled={true} key={index} />
      ))}
      {visibleCount < hours.length && (
        <Hour hour={`+${hours.length - visibleCount}`} disabled={true} />
      )}
    </div>
  );
}

