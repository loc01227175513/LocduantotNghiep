"use client";
import { useToggle } from './ClientWrapper';

export default function ExampleComponent() {
  const { toggle, setToggle } = useToggle();

  return (
    <button onClick={() => setToggle(!toggle)}>
      Toggle is {toggle ? 'ON' : 'OFF'}
    </button>
  );
} 