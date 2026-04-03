import { useState, useEffect, useRef, useCallback } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

interface DecryptedTextProps {
  text: string;
  className?: string;
  externalTrigger?: boolean;
  speed?: number;
  hoverText?: string;
  revertDelay?: number;
}

export default function DecryptedText({ 
  text, 
  className = "", 
  externalTrigger,
  speed = 1,
  hoverText,
  revertDelay = 3000
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const iterationRef = useRef(0);
  const revertTimeoutRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const hasRevealedHoverRef = useRef(false);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  const startAnimation = useCallback((newTarget: string, onComplete?: () => void) => {
    stopAnimation();
    isAnimatingRef.current = true;
    iterationRef.current = -3; 

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => 
        newTarget.split("")
          .map((char, index) => {
            if (index < iterationRef.current) {
              return newTarget[index] || "";
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterationRef.current >= newTarget.length) {
        stopAnimation();
        if (onComplete) onComplete();
      }

      iterationRef.current += 0.6 * speed;
    }, 20);
  }, [speed, stopAnimation]);

  const active = externalTrigger !== undefined ? externalTrigger : isHovering;

  useEffect(() => {
    if (active) {
      if (hoverText && !hasRevealedHoverRef.current && !isAnimatingRef.current) {
        hasRevealedHoverRef.current = true;
        startAnimation(hoverText);
      } else if (!hoverText) {
        startAnimation(text);
      }
    } else {
      if (revertTimeoutRef.current) window.clearTimeout(revertTimeoutRef.current);
      stopAnimation();
      hasRevealedHoverRef.current = false;
      setDisplayText(text);
    }
  }, [active, text, hoverText, startAnimation, stopAnimation]);

  useEffect(() => {
    return () => {
      stopAnimation();
      if (revertTimeoutRef.current) window.clearTimeout(revertTimeoutRef.current);
    };
  }, [stopAnimation]);

  const maxLength = Math.max(text.length, hoverText?.length || 0);

  return (
    <span 
      className={`inline-block cursor-default break-words font-mono ${className}`}
      style={{ minWidth: hoverText ? `${maxLength}ch` : undefined }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
}
