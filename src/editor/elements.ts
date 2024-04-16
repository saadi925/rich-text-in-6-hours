import { isBlockquote, isBold, isH1, isH2, isH3, isH4, isH5, isH6, isItalic, isLineThrough, isOL, isOverline, isParagraph, isTextCenterAligned, isTextJustifyAligned, isTextLeftAligned, isTextRightAligned, isUL, isUnderline, State, StateHandler, toggleBlockquote, toggleBold, toggleH1, toggleH2, toggleH3, toggleH4, toggleH5, toggleH6, toggleItalic, toggleLineThrough, toggleOL, toggleOverline, toggleParagraph, toggleTextAlign, toggleUL, toggleUnderline } from "contenido"
 export const textAlignments = [
    {name: 'text-align-left', detector: isTextLeftAligned},
          {name: 'text-align-center', detector: isTextCenterAligned},
          {name: 'text-align-justify', detector: isTextJustifyAligned},
          {name: 'text-align-right', detector: isTextRightAligned},
]

export const AlignButtons = textAlignments.map((alignment)=>(
        {
            name : alignment.name, 
            action : (state : State, handler : StateHandler)=> {
                toggleTextAlign(state, handler)
            },
            isActive : (state : State)=> {return alignment.detector(state)  }
        }
))
export const TEXT_BUTTONS = [
    {
        name : "bold",
        action : (state : State, stateHanlder : StateHandler)=> {
            toggleBold(state, stateHanlder)
            
        },
        isActive: (state: State) => {
            return isBold(state); // Return the result of isBold function
        }

    },{
        name : "italic",
        action : (state : State, stateHanlder : StateHandler)=> {
            toggleItalic(state, stateHanlder)
        },
        isActive : (state : State) => {return isItalic(state)}
    },
    {
        name : "underline",
        action : (state : State, stateHandler : StateHandler)=> {
            toggleUnderline(state , stateHandler)
        },
        isActive : (state : State) => {return isUnderline(state)}
    }, {
        name : "strikeThrough",
        action : (state : State, stateHandler : StateHandler)=> {
            toggleLineThrough(state, stateHandler)
        },
        isActive : (state : State) => {return isLineThrough(state)}
    }
    ,{
        name : "overline",
        action : (state :  State, stateHandler : StateHandler)=> {
            toggleOverline(state, stateHandler)
        },
        isActive : (state : State) => {return isOverline(state)}
    }
]
const actions = {
    paragraph : (state : State, handle : StateHandler)=> {
        toggleParagraph(state, handle)
    },
    ul :(state : State, handle : StateHandler) =>{
        toggleUL(state, handle)
    },
    ol : (state : State, handle : StateHandler) =>{
        toggleOL(state, handle)
    }, 
    blockquote : (state : State, handle : StateHandler) =>{
        toggleBlockquote(state, handle)
    }


}

export const BLOCKS = [
    {
        name : 'ul',
        isActive : isUL,
        action : actions.ul
    }, 
    {
        name : 'ol',
        isActive : isOL,
        action : actions.ol
    },
    {
        name : 'blockquote',
        isActive : isBlockquote,
        action : actions.blockquote
    }, {
        name : "paragraph", 
        isActive : isParagraph,
        action : actions.paragraph
    },
]
export const HEADINGS = [
    {
        name : 'H1',
        action : (state : State, handler : StateHandler)=> {
            toggleH1(state, handler)
        },
        isActive : (state : State)=> {
            return isH1(state)
        }
    },
    {
        name : 'H2',
        action : (state : State, handler : StateHandler)=> {
            toggleH2(state, handler)
        },
        isActive : (state : State)=> {
            return isH2(state)
        }
    },
    {
        name : 'H3',
        action : (state : State, handler : StateHandler)=> {
            toggleH3(state, handler)
        },
        isActive : (state : State)=> {
            return isH3(state)
        }
    },
    {
        name : 'H4',
        action : (state : State, handler : StateHandler)=> {
            toggleH4(state, handler)
        },
        isActive : (state : State)=> {
            return isH4(state)
        }
    },
    {
        name : 'H5',
        action : (state : State, handler : StateHandler)=> {
            toggleH5(state, handler)
        },
        isActive : (state : State)=> {
            return isH5(state)
        }
    },
    {
        name : 'H6',
        action : (state : State, handler : StateHandler)=> {
            toggleH6(state, handler)
        },
        isActive : (state : State)=> {
            return isH6(state)
        }
    }
]
const CAPITALIZE = 'CAPITALIZE';
const LOWERCASE = 'LOWERCASE';
const UPPERCASE = 'UPPERCASE';
const INITIAL = 'INITIAL';

export const inlineTextTransform = [CAPITALIZE, LOWERCASE, UPPERCASE, INITIAL]


export const DEFAULT_SIZES = [ "16" , "18" , "20" , "22" , "24"  , "26" , "28" , "30"]