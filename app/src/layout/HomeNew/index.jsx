'use client';
import withDynamicFavicon from '../../hoc/withDynamicFavicon';
import MainSection from './MainSection';

const HomePage = () => {
  return (
    <>
      <MainSection />
    </>
  );
};

export default withDynamicFavicon(HomePage);
