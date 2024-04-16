'use client'
import React, { useState } from 'react'
import ToolbarButton, { ToolbarIconButton } from '../buttons/Buttons'
import { AlignButtons, BLOCKS, HEADINGS, inlineTextTransform, TEXT_BUTTONS, textAlignments } from '../elements'
import {  hasInlineStyleOf, insertSoftNewline,  State, StateHandler, toggleBold, toggleInlineStyle, toggleTextAlign } from 'contenido'
import { getIconFromName } from '../icons'
import { AlignIcon } from '../assets/icons/AlignIcons'

interface ToolbaProps {
    state : State
    toggleImage : ()=> void
    stateHandler : StateHandler, toggleLinkAdding: ()=> void
    toggleFileAdding: ()=> void
}
export default function Toolbar({
    state, stateHandler, toggleLinkAdding, toggleImage, toggleFileAdding
} : ToolbaProps) {
    const [addingImage, setAddingImage] = useState(false)
    const onCloseImage = () => {
        setAddingImage(false)
    }
  return (
    <div className='bg-primary relative z-40 gap-2 w-full overflow-x-auto px-5 items-center py-2 flex max-w-full'>
    {
        TEXT_BUTTONS.map((button, id)=>(
            <ToolbarIconButton icon={getIconFromName(button.name)} key={id} 
            isActive={button.isActive(state)}
            onClick={() => button.action(state,stateHandler)} />
        ))
    }
     {
        textAlignments.map((alignment, inx) => (
        <ToolbarIconButton key={inx} icon={<AlignIcon alignment={alignment.name}/>} onClick={()=>{
          toggleTextAlign(state, stateHandler, alignment.name)
        
        
        }}
        isActive={alignment.detector(state)}
        />
        ))
      }
    {
        BLOCKS.map((button, id)=>(
            <ToolbarIconButton icon={getIconFromName(button.name)} key={id} 
            isActive={button.isActive(state)}
            onClick={() => button.action(state,stateHandler)} />
        ))
    }

    {
      HEADINGS.map((button, id)=>(
          <ToolbarButton name={button.name} key={id} 
          isActive={button.isActive(state)}
          onClick={() => button.action(state,stateHandler)} />
      ))
    }
    {
      inlineTextTransform.map((textTrannsform, id)=>(
          <ToolbarButton name={textTrannsform} key={id} 
          isActive={hasInlineStyleOf(state, textTrannsform)}
          onClick={() => toggleInlineStyle(state,stateHandler, textTrannsform)} />
      ))
    }

  
   <ToolbarButton isActive={false}  onClick={toggleFileAdding} name='File'/>
    <ToolbarButton isActive={addingImage} onClick={toggleImage} name='Image'/>

    <ToolbarButton isActive={false} onClick={toggleLinkAdding} name='Link'/>
    <ToolbarButton name='line' onClick={()=>{
      insertSoftNewline(state, stateHandler)
    }}
     isActive={false}
    />
   
    </div>
  )
}



