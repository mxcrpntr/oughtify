import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const home = document.querySelector("div.home");
  useEffect(() => {
    home.scrollTo(0, 0);
  }, [pathname]);
}

export default ScrollToTop;