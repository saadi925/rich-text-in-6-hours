'use client'
import { useEffect, useRef, useState } from 'react';
import styles from '../../app/editor.module.css';
import {  EditorState } from 'draft-js';
import {
  blockStyleFn,
  clear,
  Editor,
  focusOnEditor,
  getCharCount,
  getWordCount,

  hasInlineStyleOf,

  shortcutHandler,
  toggleInlineStyle,
} from 'contenido';
import Toolbar from '../toolbar/Toolbar';
import ToolbarButton, { OptionButton } from '../buttons/Buttons';
import ColorPallete from '../components/ColorPallete';
import CustomAdding from '../components/CustomAdding';
import { useEditorConfig } from './utils';
import { DEFAULT_SIZES } from '../elements';

const AppEditor = () => {
  const [showHtml , setShowHtml] = useState(false)
  const toggleShowHtml = () => setShowHtml(!showHtml)
  const {
    styleMap, color, setColor, bgColor, setBgColor, toggleLinkAdding, isAddingColor, setIsAddingColor, editorRef, handlePastedText, blockType, 
    toggleFileAdding, toggleImageAdding, editorState, setEditorState, setIsAddingFile, setIsAddingImage, isAddingFile, isAddingImage, isLinkAdding, setIsAddingLink, htmlContent

  } = useEditorConfig({})
  return (
    <div className='relative'>
     
      <div className={styles.editor + ' list-none'} onClick={() => focusOnEditor(editorRef)} >
        <Editor handlePastedText={handlePastedText}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={shortcutHandler(setEditorState)}
          customStyleMap={styleMap}
          blockStyleFn={blockStyleFn}
          editorRef={editorRef}
        />
      </div>
      <Toolbar state={editorState} toggleImage={toggleImageAdding} toggleFileAdding={toggleFileAdding} stateHandler={setEditorState} toggleLinkAdding={toggleLinkAdding} />
      {
        DEFAULT_SIZES.map((size, indx)=> {
         const key = `FONT_${size}`
         let unique = indx
         return <>
          <ToolbarButton className='mx-2' key={indx}  isActive={hasInlineStyleOf(editorState, key) && unique === indx } name={size + 'px'}
          onClick={()=>{
            
            
            toggleInlineStyle(editorState, setEditorState,key )
          }} />
          </>
        })
      }
     
      <ToolbarButton className='bg-background text-white mx-2' name='clear' onClick={() => {
        clear(editorState, setEditorState)
      }}
        isActive={false}
      />
       <OptionButton name='Add Color' onClick={() => setIsAddingColor(true)} />
      {
        isAddingColor && <ColorPallete bgColor={bgColor} setBgColor={setBgColor} color={color} setColor={setColor} state={editorState} stateHandler={setEditorState} onClose={() => setIsAddingColor(false)} />
      }
      {blockType && <p className='px-3 text-md text-gray-500 text-right'>{blockType} : tag</p>}
      <CustomAdding isLinkAdding={isLinkAdding} isAddingImage={isAddingImage} setIsAddingImage={setIsAddingImage} isFileAdding={isAddingFile} setIsAddingFile={setIsAddingFile} setIsAddingLink={setIsAddingLink} state={editorState} stateHandler={setEditorState} />
      <WordsCounter editorState={editorState} />
      <button onClick={toggleShowHtml}>Show HTML</button>
      {
        showHtml && <div className={styles.editor} dangerouslySetInnerHTML={{__html : htmlContent}}></div>
      }
    
    </div>
  );
};

export default AppEditor;


const WordsCounter = ({ editorState }: { editorState: EditorState }) => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  useEffect(() => {
    setWordCount(getWordCount(editorState))
    setCharCount(getCharCount(editorState))
  }, [charCount, editorState])
  return (
    <>
      {<p className='text-center text-md text-gray-500'>{charCount} characters</p>}
      { <p className='text-center text-md text-gray-500'>{wordCount} words</p>}
    </>
  )
}