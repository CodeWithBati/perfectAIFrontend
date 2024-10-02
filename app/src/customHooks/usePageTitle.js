'use client';
import { useEffect, useState } from 'react';

const usePageTitle = () => {
  const [pageTitle, setPageTitle] = useState('');
  // const {user} = useSelector((state) => state.auth.user)

  useEffect(() => {
    const pathname = window.location.pathname;
    console.log(pathname)
    switch (pathname) {
      case '/dashboard':
        setPageTitle('Dashboard');
        break;
      case '/dashboard/directories':
        setPageTitle('Directories');
        break;
      case '/directory/create':
        setPageTitle('Create Directory');
        break;
      case '/':
        setPageTitle('Home Page');
        break;
      case '/chat':
        setPageTitle('ChatBot');
        break;
      default:
        setPageTitle('Next.js App');
        break;
    }
  }, []);

  return pageTitle;
};

export default usePageTitle;