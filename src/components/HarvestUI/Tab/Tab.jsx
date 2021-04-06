import React from 'react';

const HarvestTab = ({ selected, active, children, onClick, className, noHover, ...otherProps }) => {
  let newClassName = 'harvest-tab';

  if (className) newClassName += ` ${className}`;

  if (active) {
    newClassName += ' harvest-tab-active';
  } else {
    newClassName += ' harvest-tab-passive';
  }

  if (selected) {
    newClassName += ' harvest-tab-selected';
  }

  if (noHover) {
    newClassName += ' harvest-tab-no-hover';
  }

  return (
    <span
      className={newClassName}
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={0}
      {...otherProps}
    >
      {children}
    </span>
  );
};

export default HarvestTab;
