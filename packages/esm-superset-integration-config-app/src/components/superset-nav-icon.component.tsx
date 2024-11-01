import React from 'react';

export const NavLink = () => {
  return (
    <a href={`http://${window.location.hostname}:8088`} target="_blank" rel="noopener noreferrer">Reporting & Analytics
      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
           width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"
           className="-esm-primary-navigation__app-menu-panel__launchIcon___wn5Qn">
        <path d="M13,14H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h5v1H3v10h10V8h1v5C14,13.6,13.6,14,13,14z"></path>
        <path d="M10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z"></path>
      </svg>
    </a>
  );
}

