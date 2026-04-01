import React from 'react';

const Header = ({ title = 'Cryptography Simulator', subtitle, children }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-text">
          <h1>{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
        {children && <div className="header-actions">{children}</div>}
      </div>
    </header>
  );
};

export default Header;
