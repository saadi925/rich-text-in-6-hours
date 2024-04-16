import { createDecorator, DecoratorProps, findEntitiesOf, findEntitiesOfLink } from "contenido";
import YouTubeWrapper, { File, Image } from "./cp";
import { EditorLink } from "./link";

export const decorators = createDecorator([
    {
      component: Image,
      strategy: findEntitiesOf('image'),
    },
    {
        component: EditorLink,
        strategy: findEntitiesOfLink
      },
      {
        component: File,
        strategy: findEntitiesOf('file'),
      },
      {
        // @ts-ignore
        component : YouTubeWrapper,
        strategy : findEntitiesOf('youtube')
      }

  ]);
