import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll position ke atas setiap kali route berubah
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
