/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import colors from 'tailwindcss/colors';

export default function Icon({onClick, strokeWidth = 32, fill = 'none', className}: {onClick?: () => void, strokeWidth?: number, fill?: string, className?: string}) {
	return <svg xmlns="http://www.w3.org/2000/svg" onClick={onClick} className={className} viewBox="0 0 512 512">
		<defs>
			<linearGradient id="underTheSea" gradientTransform="rotate(-45)" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
				<stop offset="0" stopColor={colors.pink[500]}/>
				<stop offset="1" stopColor={colors.purple[400]}/>
			</linearGradient>
		</defs>
		<path fill={fill} stroke="url(#underTheSea)" strokeWidth={strokeWidth} strokeLinejoin="round" d="M240,152c-50.71,12.21-94.15,52.31-120.3,73.43a261.14,261.14,0,0,0-23.81-19.58C59.53,179.29,16,176,16,176s11.37,51.53,41.36,79.83C27.37,284.14,16,335.67,16,335.67s43.53-3.29,79.89-29.85a259.18,259.18,0,0,0,23.61-19.41C145.6,307.55,189.24,347.75,240,360l-16,56c39.43-6.67,78.86-35.51,94.72-48.25C448,362,496,279,496,256c0-22-48-106-176.89-111.73C303.52,131.78,263.76,102.72,224,96Z"/>
		<circle fill="url(#underTheSea)" cx="416" cy="239.99" r="16"/>
		<path fill={fill} stroke="url(#underTheSea)" strokeWidth={strokeWidth} strokeLinecap="round" strokeMiterlimit="20" d="M378.37,356a199.22,199.22,0,0,1,0-200"/>
	</svg>;
}