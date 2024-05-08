import { useState, useRef } from "react";

export default function Footer({ size, onResize }) {
  const footerRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const startResize = (event) => {
    setIsResizing(true);
    setInitialPosition({
      x: event.clientY,
      y: event.clientX,
    });
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  const resizeFooter = (event) => {
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
      ref={footerRef}
      onMouseDown={startResize}
      onMouseUp={stopResize}
      onMouseMove={resizeFooter}
    >
      <div>Footer</div>
    </div>
  );
}
