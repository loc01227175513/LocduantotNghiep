import React, { useState, useEffect } from 'react';

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 500; // Thời gian đạt giá trị (ms)
    const stepTime = Math.abs(Math.floor(duration / target)); // Thời gian cho mỗi bước
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer); // Dọn dẹp interval khi component unmount
  }, [target]);

  return <span className="counter">{count.toLocaleString()}</span>;
};

export default Counter;