'use client'
import { SvgIcon } from '@/editor/assets/icons/TextIcons';
import DraftEditor from '@/editor/lib/main';import { useState } from 'react';
 {ssr : false}

export default function page() {
  const [light, setLight] = useState(false)
  
  return (
    <div className={`min-h-screen w-full ${light ? "bg-white text-black":"bg-background text-white"}`}>
      <button className='flex' onClick={()=> setLight(!light)}>
        <SvgIcon color={light ? '#000' :'#fff'}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
        </SvgIcon>
        {light ? 'Dark' : 'Light'}
      </button>
      <DraftEditor />
    </div>
  )
}

