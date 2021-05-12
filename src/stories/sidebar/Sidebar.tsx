import React from "react";
import "./sidebar.scss";
import styled, { DefaultTheme } from "styled-components";
import {
  itemsSpacing,
  sidebarItemsWidth,
  sidebarWidth,
  marginFromTop,
} from "./variables";
import {
  LanguageIcons,
  LanguageItem,
  LanguageIconWrapper,
} from "./LanguageIcons";
import { SidebarIconProps, SidebarIcon } from "./SidebarIcon";
import { SidebarTextProps, SidebarText } from "./SidebarText";

export interface SidebarItemProps extends SidebarIconProps, SidebarTextProps {}

export interface SidebarProps {
  children?: React.ReactNode;
  items: Array<SidebarItemProps>;
  languages: {
    current: LanguageItem;
    others: Array<LanguageItem>;
  };
  open?: boolean;
}

const SidebarWrapper = styled.div(({ theme }: { theme: DefaultTheme }) => {
  const { palette } = theme;
  return `
   height:calc(100vh - ${marginFromTop}px);
   top:${marginFromTop}px;
   position:sticky;
   float:left;
   left:0;
   width: ${sidebarWidth}px;
   
   ${SidebarIcons}, ${SidebarItems} {
    padding-top: 20px;
    height:100%;
   }
   ${SidebarIcons} {
     position:relative;
     top:0;
    z-index: 1;
    padding: ${itemsSpacing}px;
    background-color:${palette.primary};
   }
   ${SidebarItems} {
     position:absolute;
     top:0;
     background-color:${palette.info};
   }
   .btn {
     margin-bottom: ${itemsSpacing}px;
     box-shadow: none;
     padding: 0;
     width: 32px;
     height: 32px;
     &:active:focus,&:focus{
       box-shadow: none;
     }
   }
   .btn svg {
     margin: 4px 0;
     font-size:18px;
   }
`;
});

const SidebarIcons = styled.div``;
const SidebarItems = styled.div(({ open = false }: { open: boolean }) => {
  return `
    transition: transform .2s ease;
    width: ${sidebarItemsWidth}px;
    transform: translate3d(${open ? `${sidebarWidth}px` : "-100%"} ,0,0);
    
    ${LanguageIconWrapper} div,
    ${LanguageIconWrapper} button{
  		margin: 0 8px;
    }
`;
});

const NavigationContainer = styled.div`
  width: calc(100% - ${sidebarWidth}px);
  float: right;
`;
export const Sidebar = ({
  children,
  items,
  languages,
  open = false,
}: SidebarProps) => {
  return (
    <>
      <SidebarWrapper>
        <SidebarIcons>
          {items.map((i, idx) => (
            <SidebarIcon
              key={idx}
              url={i.url}
              icon={i.icon}
              active={i.active}
            />
          ))}
          <LanguageIcons langs={[languages.current]} />
        </SidebarIcons>
        <SidebarItems open={open}>
          <div>
            {items.map((i, idx) => (
              <SidebarText key={idx} url={i.url} text={i.text} />
            ))}
            <LanguageIcons langs={languages.others} />
          </div>
        </SidebarItems>
      </SidebarWrapper>
      <NavigationContainer>{children}</NavigationContainer>
      <div style={{ clear: "both" }}></div>
    </>
  );
};
