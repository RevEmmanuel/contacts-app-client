import React, {InputHTMLAttributes, useState} from 'react';
import isEmpty from "is-empty";
import {IconEye, IconEyeClosed} from "@tabler/icons-react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | null | false
}

function TextInput({label, error, className, disabled, type: inputType, ...props}: IProps) {
  const [type, setType] = useState(inputType);

  const togglePassword = () => {
    setType(prev => prev === "password" ? "text" : "password")
  }

  return (
    <div>
      <label>
        {label && <p className="text-slate-700 typo-body-small mb-1">{label}</p>}
        <div className="relative flex">
          <input
            className={`input ${!isEmpty(error) ? `error` : ``} ${disabled ? "disabled" : ""} ${className} ${inputType === "password" ? "pr-10" : ""}`}
            disabled={disabled}
            type={type}
            {...props}
          />
          {
            inputType === "password" && (
              <div
                className="absolute px-3 right-0 place-self-center"
                onClick={togglePassword}
              >
                {type === "password" ? (
                  <IconEye className="text-gray-400"/>
                ) : (
                  <IconEyeClosed className="text-gray-400"/>
                )}
              </div>
            )
          }
        </div>
        {!isEmpty(error) && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}

      </label>
    </div>
  );
}

export default TextInput;
