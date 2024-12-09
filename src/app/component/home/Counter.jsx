'use client';
import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  const startCounting = React.useCallback(() => {
    let start = 0;
    const duration = 500;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          startCounting();
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, startCounting]);

  return (
    <span ref={counterRef} className="counter">
      {count.toLocaleString()}
    </span>
  );
};

export default Counter;