import { addLink, State, StateHandler } from 'contenido'
import React from 'react'
import { OptionButton } from '../buttons/Buttons'
interface LinkAddProps {
     state : State
     stateHandler : StateHandler, onClose : ()=> void 
    }
export default function LinkComponent({
    state, stateHandler, onClose
} :LinkAddProps) {
    const [linkAttributes, setLinkAttributes] = React.useState({href: '', title: '', target: ''})
    const onLinkAdd = () => {
      addLink(state, stateHandler, linkAttributes)
        onClose()
    }
    const options = [
        {name: 'href', placeholder: 'Link Url', value: linkAttributes.href},
        {name: 'title', placeholder: 'Title', value: linkAttributes.title},
        {name: 'target', placeholder: 'Target', value: linkAttributes.target},
    ]
  return (
    <div className="fixed left-0 top-[10vh] min-h-[60vh] w-full">
    <div className="flex w-full bg-background flex-col gap-2 items-center">
        {
            options.map((option, id)=>(
                <OptionInput key={id} value={option.value} onChange={(e)=> setLinkAttributes({...linkAttributes, [option.name]: e.target.value})} placeholder={option.placeholder} label={option.name} />
            ))
        }
     <div className="flex gap-2 flex-wrap">
     <OptionButton name='Add' onClick={onLinkAdd} />
        <OptionButton name='Cancel' onClick={onClose} />
     </div>
    </div>
    </div>
  )
}
const OptionInput = ({value, onChange, placeholder, label} : {value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void, placeholder: string, label: string}) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-white'>{label}</label>
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} className='py-2 px-5 border outline-none rounded-lg bg-background text-white' />
        </div>
    )
}


