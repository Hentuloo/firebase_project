import { useEffect, useState } from 'react';
import mainTheme from 'themes/mainTheme';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mainTheme.mediaQuery.isMobil,
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= mainTheme.mediaQuery.isMobil) {
        if (!isMobile) {
          setIsMobile(true);
        }
      } else if (isMobile) {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return isMobile;
}
