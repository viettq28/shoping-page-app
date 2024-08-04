import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component scroll to top mỗi khi root page đổi path
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const body = document.querySelector('#root');
    body.scrollIntoView(
      {
        behavior: 'smooth',
      },
      300
    );
  }, [pathname]);

  return null;
}
