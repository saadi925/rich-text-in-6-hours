import { addImage, State } from 'contenido'
import React, { useState } from 'react'

export default function ImageInput({
    state, stateHandler , onClose
} :{
    onClose : ()=> void
    state : State
    stateHandler : (state : State)=> void

}) {
  const [imageOptions, setImageOptions] = useState({src: '', alt: '', style: {
    width : '100%',
    height: 'auto',
    maxWidth: '100%',
    minWidth : '100%',
    margin: 'auto',
    padding: '0',
    loading: 'lazy'
  }})
  const [preview, setPreview] = useState("")
  const onAddImage = () => {
    addImage(state, stateHandler, imageOptions)
    onClose()
    }
  const [showExtraOptions, setShowExtraOptions] = useState(false)
    return (
       <div className="flex w-full flex-col gap-2 bg-background items-center ">
        <input type="text" value={imageOptions.src} onChange={(e)=> {
            setImageOptions({...imageOptions, src: e.target.value})
            setPreview(e.target.value)
        }} placeholder='Image Url' className='py-4 px-5 border outline-none rounded-lg bg-background text-white' />
          
        {/* buttons */}
        <div className="flex gap-2">
        <button onClick={onClose} className="bg-background border hover:bg-blue-500 py-2 px-5 rounded-lg text-white">cancel</button>
        <button className='bg-background border hover:bg-blue-500  py-2 px-5 rounded-lg text-white' onClick={onAddImage}>Add</button>
        <button onClick={()=> setShowExtraOptions(!showExtraOptions)} className='bg-background border hover:bg-blue-500  py-2 px-5 rounded-lg text-white'>Extra Options</button>
        </div>
        {/* controlling styles */}
        <div className="flex gap-2 flex-wrap justify-center w-full" >
        <OptionInput value={imageOptions.alt} onChange={(e)=> setImageOptions({...imageOptions, alt: e.target.value})} placeholder='Alt' label='Alt' />
        <OptionInput value={imageOptions.style.width} onChange={(e)=> setImageOptions({...imageOptions, style: {...imageOptions.style, width: e.target.value}})} placeholder='Width' label='Width' />
        <OptionInput value={imageOptions.style.height} onChange={(e)=> setImageOptions({...imageOptions, style: {...imageOptions.style, height: e.target.value}})} placeholder='Height' label='Height' />
        {
            showExtraOptions && <>
            <OptionInput value={imageOptions.style.maxWidth} onChange={(e)=> setImageOptions({...imageOptions, style: {...imageOptions.style, maxWidth: e.target.value}})} placeholder='Max Width' label='Max Width' />
            <OptionInput value={imageOptions.style.minWidth} onChange={(e)=> setImageOptions({...imageOptions, style: {...imageOptions.style, minWidth: e.target.value}})} placeholder='Min Width' label='Min Width' />
            <OptionInput value={imageOptions.style.margin} onChange={(e)=> setImageOptions({...imageOptions, style: {...imageOptions.style, margin: e.target.value}})} placeholder='Margin' label='Margin' />
            <OptionInput value={imageOptions.style.padding} onChange={(e)=> setImageOptions({...imageOptions, style: {...imageOptions.style, padding: e.target.value}})} placeholder='Padding' label='Padding' />
            <OptionInput value={imageOptions.style.loading} onChange={(e)=> setImageOptions({...imageOptions, style: {...imageOptions.style, loading: e.target.value}})} placeholder='Loading' label='Loading' />
            </>
        }
        
        </div>

        {/* preview */}
       <ImagePreviewer src={preview} alt='image' imageOptions={
         imageOptions
       }/>
     
       </div>
  )
}

export function OptionInput ({value, onChange, placeholder, label} : {value : string, onChange : (e : React.ChangeEvent<HTMLInputElement>)=> void, placeholder : string, label : string}) {
    return (
        <div className="relative">
        <span className='absolute top-0 right-2 text-md text-gray-500 '>{label}</span>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} className=' border outline-none rounded-lg p-2 bg-background text-white' />
        </div>
    )
}


function ImagePreviewer ({src, alt, imageOptions} : {src? : string, alt? : string, imageOptions ?: any}) {
    return (
        <>
        {
            src && <img src={src} alt={alt} style={{
                width: imageOptions.style.width,
                height: imageOptions.style.height,
                maxWidth: imageOptions.style.maxWidth,
                minWidth: imageOptions.style.minWidth,
                margin: imageOptions.style.margin,
                padding: imageOptions.style.padding,
                display: imageOptions.style.display,
            }}
            sizes={imageOptions.style.sizes}
            loading={imageOptions.style.loading}

            />
        }
        </>
    )
}
