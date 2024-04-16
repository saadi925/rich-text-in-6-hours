import { BlockQuoteIcon, BoldIcon, ItalicIcon, OrderedListIcon, Para, StrikeThroughIcon, SvgIcon,  UlIcon, UnderlineIcon } from "./assets/icons/TextIcons"
export const getIconFromName = (name: string) => {
    switch (name) {
        case 'bold':
            return <SvgIcon>
                <BoldIcon />
            </SvgIcon>;
        case 'italic':
            return <SvgIcon>
                <ItalicIcon />
            </SvgIcon>;
        case 'underline':
            return <SvgIcon>
                <UnderlineIcon />
            </SvgIcon>;
        case 'strikeThrough':
            return <SvgIcon>
                <StrikeThroughIcon />
                </SvgIcon>;
        case 'overline':
            return <div className=" w-full ">
             ‾‾‾
            </div>;
        case 'ul':
            return <SvgIcon>
                <UlIcon />
            </SvgIcon>;
        case 'ol':
            return <SvgIcon>
                <OrderedListIcon />
            </SvgIcon>;
        case 'blockquote':
            return <BlockQuoteIcon />
        case 'paragraph':
            return <div className="">paragraph</div>
    }   }