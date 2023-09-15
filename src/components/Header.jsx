import React from 'react';

const Header = ({title}) => {
  return (
    <div className="header">
        <h2>{title}</h2>
    </div>
  )
}

Header.defaultProps = {
    title: "Default App"
}

export default Header;