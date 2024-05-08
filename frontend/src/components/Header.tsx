import { useState, useRef } from "react";

export default function Header({ size, onResize }) {
  const headerRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const startResize = (event) => {
    setIsResizing(true);
    setInitialPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  const resizeHeader = (event) => {
    if (!isResizing) return;
    const deltaX = event.clientX - initialPosition.x;
    const deltaY = event.clientY - initialPosition.y;

    const newWidth = size.width + deltaX;
    const newHeight = size.height + deltaY;

    onResize({ width: newWidth, height: newHeight });

    setInitialPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      className="flex justify-center border-2 border-dashed cursor-pointer"
      style={{ width: size.width, height: size.height }}
      ref={headerRef}
      onMouseDown={startResize}
      onMouseUp={stopResize}
      onMouseMove={resizeHeader}
    >
      <div>Header</div>
    </div>
  );
}
