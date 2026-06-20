import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export const Counter = ({ end, suffix = '', duration = 2, decimals }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-detect decimals if not explicitly provided
  const resolvedDecimals = decimals !== undefined 
    ? decimals 
    : (end % 1 !== 0 ? Math.min(end.toString().split('.')[1]?.length || 2, 2) : 0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      if (progress < 1) {
        setCount(end * progress);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  // Format with commas and correct decimal places
  const formattedCount = count.toLocaleString('en-US', {
    minimumFractionDigits: resolvedDecimals,
    maximumFractionDigits: resolvedDecimals,
  });

  return <span ref={ref}>{formattedCount}{suffix}</span>;
};
