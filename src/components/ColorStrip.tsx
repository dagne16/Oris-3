import React from 'react';
import './ColorStrip.css';

type Props = {
  color?: string;
  height?: number; // px for desktop
  mobileHeight?: number; // px for smaller devices
  className?: string;
};

const ColorStrip: React.FC<Props> = ({ color = '#f6f0e8', height = 20, mobileHeight = 10, className = '' }) => {
  const style: React.CSSProperties = {
    ['--strip-color' as any]: color,
    ['--strip-height' as any]: `${height}px`,
    ['--strip-mobile-height' as any]: `${mobileHeight}px`,
  };

  return <div className={`color-strip ${className}`} style={style} aria-hidden="true" />;
};

export default ColorStrip;
