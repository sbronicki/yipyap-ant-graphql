import React, { createContext, useEffect, useState } from "react";

export const MobileContext = createContext(null);

export const MobileProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(windowWidth < 768);

  const onResize = ({ target }) => {
    setWindowWidth(target.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const _isMobile = windowWidth < 768;
    if ((_isMobile && !isMobile) || (!_isMobile && isMobile)) {
      setIsMobile(_isMobile);
    }
  }, [windowWidth]);

  window.gl_isMobile = isMobile;
  window.gl_innerWidth = windowWidth;

  return (
    <MobileContext.Provider value={{ isMobile: isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};
