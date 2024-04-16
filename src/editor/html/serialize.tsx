import {  StateHandler } from "contenido"
import { EditorState } from "draft-js"

import { useEffect, useState } from "react"
import { slateToHTML } from "./tohtml";
export const useSerialize = (editorState: EditorState, stateHandler : StateHandler, stylesMap : any) => {
    const [htmlContent , setHtmlContent] = useState({})
  useEffect(()=>{
    const html = slateToHTML(editorState.getCurrentContent(), stylesMap.COLORIZE.color);
    setHtmlContent(html)
    stateHandler(editorState)
  }, [editorState, editorState, stylesMap, setHtmlContent])
  return {
    htmlContent
  }
    
}