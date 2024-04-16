'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import { AtomicBlockUtils, convertFromRaw, EditorState } from 'draft-js';
import {
  isH2,
  isH3,
  isH4,
} from 'contenido';
import { stateToHTML } from "draft-js-export-html";
import { decorators } from './decorators';
import { useStyles } from './stylemap';
import emptyRawContentState from './raw';
import { useSerialize } from '../html/serialize';
type DraftHandleValue = "handled" | "not-handled";
type HandlePastedText = (text:string , html: string | undefined , state : EditorState) => DraftHandleValue 

interface EditorConfigProps {}
export function useEditorConfig({

} : EditorConfigProps){
const editorRef = useRef(null);
const [isAddingFile, setIsAddingFile] = useState(false)
const emptyRaw = convertFromRaw(emptyRawContentState)
const { styleMap, color, setColor, bgColor, setBgColor } = useStyles()
const [editorState, setEditorState] = useState(EditorState.createWithContent(emptyRaw, decorators));
const [isAddingImage, setIsAddingImage] = useState(false);

  const toggleImageAdding = () => {
    setIsAddingImage(!isAddingImage)
  }
  const toggleFileAdding = () => {
    setIsAddingFile(!isAddingFile)
  }
  const [isAddingColor, setIsAddingColor] = useState(false);
  const [blockType, setBlockType] = useState<'p' | 'h2' | 'h3' | 'h4' | 'blockqoute'>('p');
  const [isLinkAdding, setIsAddingLink] = useState(false);
  const handlePastedText : HandlePastedText = (text, html , state) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\?.*v=|embed\/|watch\/?\?(?:.*&)?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

     
    const match = text.match(youtubeRegex);
      console.log('Match:', match);
      if (match) {
        console.log('YouTube link detected:', match[0]);
        const contentState = editorState.getCurrentContent();
        
        const contentStateWithEntity = contentState.createEntity(
          'youtube',
          'IMMUTABLE',
          {
            youtubeId :match[1],

          }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
          editorState,
          entityKey,
          'youtube'
        );
        setEditorState(newEditorState);
        return 'handled';
      }
      return 'not-handled';
    };
    
  const handleBlockTypeChange = useCallback(() => {
    if (isH2(editorState)) {
      setBlockType('h2');
      return;
    }
    if (isH3(editorState)) {
      setBlockType('h3');
      return;
    }
    if (isH4(editorState)) {
      setBlockType('h4');
      return;
    }
    setBlockType('p');
  }, [editorState]);
  useEffect(() => {
    handleBlockTypeChange();
  }, [editorState, handleBlockTypeChange]);

  const toggleLinkAdding = () => {
    setIsAddingLink(!isLinkAdding)
  }
  const {htmlContent} =useSerialize(editorState, setEditorState, styleMap)
  return {
    styleMap, color, setColor, bgColor, setBgColor, toggleLinkAdding, isAddingColor, setIsAddingColor, editorRef, handlePastedText, handleBlockTypeChange, blockType, setBlockType, 
    toggleFileAdding, toggleImageAdding, editorState, setEditorState, setIsAddingFile, setIsAddingImage, isAddingImage, isAddingFile, isLinkAdding, setIsAddingLink, htmlContent

  }
}