import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [headerSize, setHeaderSize] = useState({
    width: window.innerWidth,
    height: 100,
  });
  const [sidebarSize, setSidebarSize] = useState({ width: 200, height: 300 });
  const [footerSize, setFooterSize] = useState({
    width: window.innerWidth,
    height: 100,
  });

  useEffect(() => {
    const handleResize = () => {
      const totalWidth =
        headerSize.width + sidebarSize.width + footerSize.width;
      const screenWidth = window.innerWidth;

      // Adjust sizes if total width exceeds screen width
      if (totalWidth > screenWidth) {
        const ratio = screenWidth / totalWidth;
        setHeaderSize((prevState) => ({
          width: prevState.width * ratio,
          height: prevState.height,
        }));
        setFooterSize((prevState) => ({
          width: prevState.width * ratio,
          height: prevState.height,
        }));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [headerSize, sidebarSize, footerSize]);

  const handleHeaderResize = (newSize) => {
    setHeaderSize(newSize);
    // Adjust Sidebar size proportionally
    const sidebarWidth = sidebarSize.width + newSize.width - headerSize.width;
    setSidebarSize({ width: sidebarWidth, height: sidebarSize.height });
  };

  const handleFooterResize = (newSize) => {
    setFooterSize(newSize);
    // Adjust Sidebar size proportionally
    const sidebarWidth = sidebarSize.width + newSize.width - footerSize.width;
    setSidebarSize({ width: sidebarWidth, height: sidebarSize.height });
  };

  return (
    <div className="flex bg-black text-white flex-1 flex-col h-screen">
      <Header size={headerSize} onResize={handleHeaderResize} />
      <div className="flex flex-1">
        <Sidebar size={sidebarSize} setSidebarSize={setSidebarSize} />
      </div>
      <Footer size={footerSize} onResize={handleFooterResize} />
    </div>
  );
}
