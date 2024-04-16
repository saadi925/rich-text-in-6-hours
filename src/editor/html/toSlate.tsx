'use client'

import { DecoratorComponentProps } from 'contenido';
import { ContentState, EditorState, convertFromHTML, CompositeDecorator, ContentBlock } from 'draft-js';
import React from 'react';

type CustomInlineStyles = {
    [key: string]: {
        element: string;
        attributes: {
            style: string;
        };
    };
};

type CustomBlockRenderers = {
    [blockType: string]: (block: any) => string;
};

type CustomEntities = {
    [entityType: string]: (entityData: any) => { type: string; data: any };
};

type CustomDecorator = {
    strategy: (contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => void;
    component: (props: DecoratorComponentProps) => React.ReactNode;
};

export const htmlToEditorState = (
    html: string,
    customInlineStyles: CustomInlineStyles,
    customBlockRenderers: CustomBlockRenderers,
    customEntities: CustomEntities
): EditorState => {
    try {
        // Convert HTML to ContentState
        const contentBlocks = convertFromHTML(html);

        // Create decorators for custom inline styles
        const customDecorators: CustomDecorator[] = Object.keys(customInlineStyles).map(styleName => ({
            strategy: (contentBlock, callback, contentState) => {
                contentBlock.findEntityRanges(
                    (character) => {
                        const entityKey = character.getEntity();
                        if (entityKey === null) {
                            return false;
                        }
                        const entity = contentState.getEntity(entityKey);
                        return entity.getType() === styleName;
                    },
                    callback
                );
            },
            component: (props) => {
                const { children, offsetKey } = props;
                const styleConfig = customInlineStyles[styleName];
                return React.createElement(styleConfig.element, { key: offsetKey, ...styleConfig.attributes }, children);
            }
        }));

        // Create a CompositeDecorator with custom decorators
        const compositeDecorator = new CompositeDecorator(customDecorators);

        // Create ContentState from blocks and decorators
        const contentState = ContentState.createFromBlockArray(contentBlocks.contentBlocks, contentBlocks.entityMap);

        // Create EditorState with ContentState and CompositeDecorator
        const editorState = EditorState.createWithContent(contentState, compositeDecorator);

        return editorState;
    } catch (error) {
        console.error('Error converting HTML to Draft.js EditorState:', error);
        return EditorState.createEmpty();
    }
};
