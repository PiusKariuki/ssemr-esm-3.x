import React from 'react';

export const  NavLink = () => {
  return (
    <a href={`http://${window.location.hostname}:8088`} target="_blank" rel="noopener noreferrer">Reports</a>
  );
}

