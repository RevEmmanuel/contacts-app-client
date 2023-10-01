import React, {HTMLAttributes} from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
}

function Container({className, ...props}: IProps) {
  return (
    <div className={`w-full max-w-[1240px] mx-auto ${className}`} {...props} />
  );
}

export default Container;
