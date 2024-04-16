import { hasInlineStyleOf, State, StateHandler, toggleInlineStyle } from 'contenido'
import React, { useState } from 'react'
import {BlockPicker} from 'react-color'
import { OptionButton } from '../buttons/Buttons'

interface ColorPalleteProps  {
    state: State, stateHandler: StateHandler, onClose: ()=> void, color : string, setColor: (color: string)=> void
    bgColor: string, setBgColor: (color: string)=> void
}

export default function ColorPallete(
    
    {state, stateHandler, onClose, color, setColor, bgColor, setBgColor} : ColorPalleteProps) {
     const [property, setProperty] = useState<"COLORIZE" | "BGCOLORIZE">("COLORIZE")
        const onColorChange = (color: string) => {
            if(property === 'COLORIZE') {
                setColor(color)
            }else {
                setBgColor(bgColor)
            }
        toggleInlineStyle(state, stateHandler,property)
        
    }

    return (
        <div className="fixed left-0 top-[10vh] min-h-[60vh] p-3 w-full">
        <div className="flex w-full flex-col gap-2 items-center">
         
          <OptionButton name='remove' onClick={()=>{
            hasInlineStyleOf(state, property) && toggleInlineStyle(state, stateHandler, property)
            
          }} />
            <BlockPicker color={property ==="BGCOLORIZE" ? bgColor : color} onChangeComplete={(color)=> onColorChange(color.hex)} />
         <div className="flex gap-2 flex-wrap">
         <OptionButton name='Close' onClick={onClose} />
         <button className='px-2 py-1 bg-background text-white rounded-lg' onClick={()=> setProperty(
                property === 'COLORIZE' ? 'BGCOLORIZE' : 'COLORIZE'
          )}>
                {property === 'COLORIZE' ? 'Text' : 'Background'}
          </button>
         </div>
        </div>
        </div>
    )
}