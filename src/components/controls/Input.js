import React from 'react';

export default function Input({_ref, type, defaultValue, placeholder, onChange, disabled=false, className, min=0, max=100, step=1, children=undefined}) {
	return <input ref={_ref}
		type={type}
		defaultValue={defaultValue}
		placeholder={placeholder}
		onChange={onChange} 
		disabled={disabled}
		min={min}
		max={max}
		step={step}
		className={`
		text-secondary-900
		dark:text-secondary-200
		transition duration-200
		${className}`}>
		{children}
	</input>;
}