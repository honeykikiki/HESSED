import React from 'react';
import Link from 'next/link';

const MainLayout = ({ children }) => {
  return (
    <>
      <div>
        <header>
          <h1>HESSED</h1>
        </header>

        <div>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
