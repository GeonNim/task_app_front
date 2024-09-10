import React from 'react';
import ItemPanel from '../ItemPanel';
import Navbar from '../Navbar';

const index = () => {
  return (
    <div>
      <div className="pageSection">
        <Navbar menuIdx={3} />
        <ItemPanel pageTitle="Completed" filterCompleted={true} />
      </div>
    </div>
  );
};

export default index;
