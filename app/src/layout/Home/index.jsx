'use client';
import withDynamicFavicon from '../../hoc/withDynamicFavicon';
import TypeWriterSection from './TypewriterSection';

const HomePage = () => {
  return (
    <>
      <TypeWriterSection />
    </>
  );
};

export default withDynamicFavicon(HomePage);
