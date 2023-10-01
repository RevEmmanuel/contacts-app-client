import React, {ButtonHTMLAttributes} from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

function Button({className, ...props}: IProps) {
  return (
    <button
      className={`bg-blue-700 hover:bg-blue-900 text-white h-14 text-lg px-4 rounded-lg apply-transition ${className}`}
      {...props}
    />
  );
}

export default Button;
