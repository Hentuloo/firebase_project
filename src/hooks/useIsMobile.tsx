import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

export default function useIsMobile() {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= theme.mediaQuery.isMobil,
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= theme.mediaQuery.isMobil) {
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
