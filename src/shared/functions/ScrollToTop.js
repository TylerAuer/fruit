import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This is straight from the react-router docs

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
