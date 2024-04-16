import { initialStyleMap } from "contenido";
import { DraftStyleMap } from "draft-js";
import React from "react";
export const useStyles = ()=>{
  const [color, setColor] = React.useState('')
  const [bgColor, setBgColor] = React.useState('')
  const styleMap  : DraftStyleMap= {
    ...initialStyleMap,
    CAPITALIZE: {
      textTransform: 'capitalize'
    },
    LOWERCASE: {
      textTransform: 'lowercase'
    },
    UPPERCASE: {
      textTransform: 'uppercase'
    },
    INITIAL: {
      textTransform: 'initial'
    },
    COLORIZE :{
        color
    }, 
    BGCOLORIZE :{
        backgroundColor: bgColor
    },
    FONT_16 :{
      fontSize : "1rem"
    }, 
    FONT_18 :{
      fontSize : "1.125rem"
    },
    FONT_20 :{
     fontSize :'1.25rem'
    },
    FONT_22 :{
      fontSize : '1.375rem'
    },
    FONT_24 :{
      fontSize : '1.5rem'
    },
    FONT_26 :{
      fontSize :'1.625remem',
    },
    FONT_28 :{
      fontSize : '1.75rem'
    },
    FONT_30 :{
      fontSize : '1.875rem'
    }
  }

  return {
    styleMap,
    setColor, color, bgColor, setBgColor
  } 
}
