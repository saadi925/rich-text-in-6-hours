import React, { useState } from 'react';

interface ButtonProps {
  name: string;
  onClick: () => void;
  className?: string;
  tooltip?: string;
  isActive : boolean
}

const ToolbarButton: React.FC<ButtonProps> = ({
  name,
  onClick,
  className = '',
  tooltip = '',
  isActive= false
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center px-3 py-1 border border-transparent text-sm  rounded-md shadow-sm text-white font-semibold  focus:outline-none ${className}  ${isActive ?' bg-surface' :'bg-background'} `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {name}
      {tooltip && showTooltip && (
        <div className="absolute z-10 -top-8 left-1/2 transform -translate-x-1/2 p-2 bg-black text-white text-xs rounded-md">
          {tooltip}
        </div>
      )}
    </button>
  );
};

export default ToolbarButton;
export const OptionButton = ({name, onClick} : {name: string, onClick: ()=> void}) => {
  return (
      <button onClick={onClick} className='bg-background border hover:bg-blue-500 py-2 px-5 rounded-lg text-white'>{name}</button>
  )
}

interface IconButtonProps {
  onClick: () => void;
  className?: string;
  tooltip?: string;
  isActive : boolean
  icon : React.ReactNode
}

export const ToolbarIconButton: React.FC<IconButtonProps> = ({
  onClick,
  className = '',
  isActive= false,
  icon
}) => {

  return (
    <button
      onMouseDown={(e)=>{
        e.preventDefault()
        onClick()
      }}
      className={`relative items-center p-1   rounded-md shadow-sm text-white    ${className}  ${isActive ?' bg-surface' :'bg-background'} `}
 
    >
      {
        icon
      }
  
    </button>
  );
};
