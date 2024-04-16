import { ContentState } from 'draft-js';
import { stateToHTML, Options } from 'draft-js-export-html';

type InlineStyleConfig = { element: string; attributes?: any };

const inlineStyles: { [styleName: string]: InlineStyleConfig } = {

};

// Helper function to pre-calculate inline styles, including dynamic ones
const calculateInlineStyles = (color: string): { [styleName: string]: InlineStyleConfig } => ({
    ...inlineStyles,
    COLORIZE: { element: 'span', attributes: { style: `color: ${color}` } },
    FONT_16: { element: 'span', attributes: { style: 'font-size: 1rem' } },
    FONT_18: { element: 'span', attributes: { style: 'font-size: 1.125rem' } },
    FONT_20: { element: 'span', attributes: { style: 'font-size: 1.25rem' } },
    FONT_22: { element: 'span', attributes: { style: 'font-size: 1.375rem' } },
    FONT_24: { element: 'span', attributes: { style: 'font-size: 1.5rem' } },
    FONT_26: { element: 'span', attributes: { style: 'font-size: 1.625rem' } },
    FONT_28: { element: 'span', attributes: { style: 'font-size: 1.75rem' } },
    FONT_30: { element: 'span', attributes: { style: 'font-size: 1.875rem' } },
    CAPITALIZE: { element: 'span', attributes: { style: 'text-transform: capitalize' } },
    LOWERCASE: { element: 'span', attributes: { style: 'text-transform: lowercase' } },
    UPPERCASE: { element: 'span', attributes: { style: 'text-transform: uppercase' } },
    INITIAL: { element: 'span', attributes: { style: 'text-transform: initial' } },
    


});

// Define custom block renderer
const blockRenderers: { [blockType: string]: (block : any) => string } = {
    'code-block': (block) => {
        const text = block.getText();
        const key = block.getKey();
        return `<pre className="${key}"><code>${text}</code></pre>`;
    },
    'blockquote': (block) => {
        const text = block.getText();
        const key = block.getKey();
        return `<blockquote className="editor-blockquote dark:text-surface ${key}">${text}</blockquote>`;
    }
};

export const slateToHTML = (contentState: ContentState, color: string) => {
    const inlineStylesWithColor = calculateInlineStyles(color);
    const options: Options = {
        inlineStyles: inlineStylesWithColor,
        entityStyleFn : (entity) => {
            const entityData = entity.getData();
            switch (entity.getType()) {
                case 'image':
                    return {
                        element: 'img',
                        attributes: {
                            src: entityData.src,
                            alt: entityData.alt,
                            className : `editor-image aspect-video `
                        },
                    };
                case 'file':
                    return {
                        element: 'a',
                        attributes: {
                            href: entityData.url,
                            download: true,
                            className : `editor-file  `
                        },
                    };
                case 'link':
                    return {
                        element: 'a',
                        attributes: {
                            href: entityData.url,
                            className : `editor-link  `
                        },
                    };
                case 'youtube':
                    return {
                        element: 'iframe',
                        
                        attributes: {
                            src: `https://www.youtube.com/embed/${entityData.youtubeId}`,
                            frameBorder: 0,
                            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                            referrerPolicy: 'strict-origin-when-cross-origin',
                            allowFullScreen: true,
                            className : `aspect-video w-full h-[50%]  editor-youtube  `
                        },
                    };
                default:
                    return {};
            }
        },
        blockRenderers
    };
    return stateToHTML(contentState, options);
};
