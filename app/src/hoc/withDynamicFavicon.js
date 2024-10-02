'use client'
import React, { useEffect } from 'react';
import { useTheme } from '../layout/provider';

const withDynamicFavicon = (WrappedComponent) => {
  return function FaviconHandler(props) {
    const theme = useTheme();

    useEffect(() => {
      const faviconLink = document.querySelector("link[rel*='icon']");

      if (faviconLink) {
        faviconLink.href = theme.mode === 'dark' ? '/images/defaulticon-dark.png' : '/images/defaulticon-light.png';
      }
    }, [theme.mode]);

    return <WrappedComponent {...props} />;
  };
}

export default withDynamicFavicon;