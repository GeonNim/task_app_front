import React from 'react';
import ItemPanel from '../ItemPanel';
import Navbar from '../Navbar';

const index = () => {
  return (
    <div className="pageSection">
      <Navbar menuIdx={2} />
      <ItemPanel
        pageTitle="Important"
        filterCompleted="all"
        filterImportant={true}
      />
    </div>
  );
};
export default index;
