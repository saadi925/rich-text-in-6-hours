export const Image = (props : any) => {
    return <img className='editor-image' alt={props.alt} src={props.src} />;
  };

import { FC, FunctionComponent } from 'react';
import  {  YouTubeProps } from 'react-youtube';

interface YouTubeWrapperProps extends YouTubeProps {
 youtubeId : string
}

const YouTubeWrapper: FunctionComponent<YouTubeWrapperProps> = (props) => {

 const embed = <iframe className='aspect-video editor-youtube w-full h-[50%]'  src={`https://www.youtube.com/embed/${props.youtubeId}`}  
 frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
 ></iframe>
 console.log(props.youtubeId);
 
  return embed
  ;
};

export default YouTubeWrapper;

export const File : FC<any> = (props) => {
  return (
    <a className='editor-file' href={props.href} download>
      {props.title}
    </a>
  );
};

