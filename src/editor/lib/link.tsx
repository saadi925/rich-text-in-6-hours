import { DecoratorComponentProps } from "contenido";
import { FC } from "react";

export const EditorLink: FC<DecoratorComponentProps> = (props) => {
    return (
      <a className="editor-link" href={props.href || '/'} target={props.target}>
        {props.children}
      </a>
    );
  };