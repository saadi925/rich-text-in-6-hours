import { addAtomicBlock, addFile, addLink, State } from 'contenido'
import React, { SetStateAction, useState } from 'react'
import { OptionButton } from '../buttons/Buttons'
import ImageInput, { OptionInput } from './ImageInput'
interface CustomAdingProps {
    state : State
    stateHandler : (state : State)=> void
    isLinkAdding : boolean
    setIsAddingLink : React.Dispatch<SetStateAction<boolean>>
    isFileAdding : boolean
    setIsAddingFile : React.Dispatch<SetStateAction<boolean>>
    isAddingImage : boolean
    setIsAddingImage : React.Dispatch<SetStateAction<boolean>>
  }

export default function CustomAdding({
    state, stateHandler, isLinkAdding, setIsAddingLink, isFileAdding, setIsAddingFile, isAddingImage, setIsAddingImage
} : CustomAdingProps) {
  const [fileurl , setFileurl] = useState('https://')
  const [Filename , setFilename] = useState('') 
    const [linkAttributes, setLinkAttributes] = React.useState({href: 'https://', title: '', target: ''})
    const onLinkAdd = () => {
      addLink(state, stateHandler, linkAttributes)
      setIsAddingLink(false)
    }
  
    const options = [
        {name: 'href', placeholder: 'Link Url', value: linkAttributes.href},
        {name: 'title', placeholder: 'Title', value: linkAttributes.title},
        {name: 'target', placeholder: 'Target', value: linkAttributes.target},
    ]
  return (
  <>
  {(isFileAdding || isLinkAdding || isAddingImage) &&   <div className='absolute top-0 flex justify-center min-h-[50vh] items-center w-full'>
  <div className="flex   justify-center bg-background border border-surface/50 p-5 rounded-lg flex-col gap-2 items-center">
    {
      isLinkAdding && (
        <>
        {
        options.map((option, id)=>(
            <OptionInput key={id} value={option.value} onChange={(e)=> setLinkAttributes({...linkAttributes, [option.name]: e.target.value})} placeholder={option.placeholder} label={option.name} />
        ))
    }
 <div className="flex gap-2 flex-wrap">
 <OptionButton name='Add' onClick={onLinkAdd} />
    <OptionButton name='Cancel' onClick={()=> setIsAddingLink(false)} />
 </div>
        </>
      )
    }
    {
      isFileAdding && (
        <>
        <OptionInput label='File Url' placeholder='File Url' value={fileurl} onChange={(e)=> setFileurl(e.target.value)} />
        <OptionInput label='Name' placeholder='File Name' value={Filename} onChange={(e)=> setFilename(e.target.value)} />
         <div className="flex flex-wrap gap-2 flex-row-reverse">
         <OptionButton name='Add' onClick={()=> {
          addFile(state, stateHandler, {
            href: fileurl,
            title : Filename

          })
        }} />
        <OptionButton name='Cancel' onClick={()=> setIsAddingFile(false)} />
         </div>
        </>
      )
    }

    {
      isAddingImage && (
       <ImageInput state={state} stateHandler={stateHandler} onClose={()=> setIsAddingImage(false)}/>
      )
    }
</div>
    </div>}
  </>
  )
}
