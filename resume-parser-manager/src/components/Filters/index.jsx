import React from 'react';
import './index.css';

const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by skill or name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default Filters;
