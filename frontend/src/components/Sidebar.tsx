import { useState, useRef } from "react";

export default function Sidebar({ size, setSidebarSize }) {
  const sidebarRef = useRef(null);
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

  const resizeSidebar = (event) => {
    if (!isResizing) return;
    const deltaX = event.clientX - initialPosition.x;
    const deltaY = event.clientY - initialPosition.y;

    setSidebarSize((prevState) => ({
      width: prevState.width + deltaX,
      height: prevState.height + deltaY,
    }));

    setInitialPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      className="flex flex-col justify-center border-2 border-dashed cursor-pointer"
      style={{ width: size.width, height: size.height }}
      ref={sidebarRef}
      onMouseDown={startResize}
      onMouseUp={stopResize}
      onMouseMove={resizeSidebar}
    >
      <div>Sidebar</div>
    </div>
  );
}
