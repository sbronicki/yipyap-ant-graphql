import React, { createContext, useEffect, useState } from "react";

export const MobileContext = createContext(null);

export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState();
  window.gl_isMobile = isMobile;

  const onResize = () => {
    const _isMobile = window.innerWidth < 768;
    if ((_isMobile && !isMobile) || (!_isMobile && isMobile)) {
      setIsMobile(_isMobile);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile: isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};
