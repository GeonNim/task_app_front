import React from 'react';
import ItemPanel from '../ItemPanel';
import Navbar from '../Navbar';

const index = () => {
  return (
    <div className="pageSection">
      <Navbar menuIdx={1} />
      <ItemPanel pageTitle="Incompleted Items" filterCompleted={false} />
    </div>
  );
};

export default index;
