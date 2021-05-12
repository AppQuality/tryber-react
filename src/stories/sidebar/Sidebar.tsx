import React from "react";
import "./sidebar.scss";
import { Button } from "../button/Button";
import styled, { DefaultTheme } from "styled-components";

export interface SidebarIconProps {
  url: string;
  icon: React.ReactNode;
  active: boolean;
}
export interface SidebarTextProps {
  url: string;
  text: string;
}
export interface SidebarItemProps extends SidebarIconProps, SidebarTextProps {}

interface LanguageItem {
  lang: string;
  onClick?(lang:string): void;
}
export interface SidebarProps {
  children?: React.ReactNode;
  items: Array<SidebarItemProps>;
  languages: {
    current: LanguageItem;
    others: Array<LanguageItem>;
  };
  open?: boolean;
}

const marginFromTop = 54;
const sidebarWidth = 60;
const sidebarItemsWidth = 260;
const itemsSpacing = 14;

const SidebarItemsWrapper = styled.div(
  ({ theme, open = false }: { theme: DefaultTheme; open: boolean }) => {
    const { palette } = theme;
    return `
   padding: ${itemsSpacing}px 0;
   padding-top: 20px;
   height:calc(100vh - ${marginFromTop}px);
   top: ${marginFromTop}px; 
   left: ${sidebarWidth}px;
   position: fixed;
   overflow: hidden;
   
   width: ${open ? sidebarItemsWidth : 0}px;
   background-color:${palette.info};
   transition: width .2s ease;
   
   ${LanguageIconWrapper} button,
   ${LanguageIconWrapper} div {
     margin: 0 8px;
   }
   
`;
  }
);

const SidebarWrapper = styled.div(({ theme }: { theme: DefaultTheme }) => {
  const { palette } = theme;
  return `
   padding: ${itemsSpacing}px;
   padding-top: 20px;
   height:calc(100vh - ${marginFromTop}px);
   top:${marginFromTop}px;
   position:sticky;
   float:left;
   left:0;
   z-index: 1;
   width: ${sidebarWidth}px;
   background-color:${palette.primary};
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

const SidebarItem = ({ url, icon, active }: SidebarIconProps) => {
  return (
    <Button
      onClick={() => (window.location.href = url)}
      size="sm"
      type={active ? "light" : "primary"}
    >
      {icon}
    </Button>
  );
};

const SidebarItemDiv = styled.div(({ theme }: { theme: DefaultTheme }) => {
  const { palette } = theme;
  return `
  margin-bottom: ${itemsSpacing}px;
  
  a {
    width:100%;
    font-size: 14px;
    line-height: 150%;
    padding: 6px 8px 5px;
    display:block;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    &:hover {
      background-color: ${palette.primary}
    }
  }
`;
});

const SidebarText = ({ url, text }: SidebarTextProps) => {
  return (
    <SidebarItemDiv>
      <a href={url}>{text}</a>
    </SidebarItemDiv>
  );
};

const LanguageIconWrapper = styled.div`
  position: absolute;
  bottom: ${itemsSpacing}px;
  display: flex;
  button,div {
    border: 0;
    padding:0;
    text-decoration:none;
    display:block;
    background: #fff;
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    text-transform: uppercase;
  }
`;
const LanguageIcons = ({ langs }: { langs: Array<LanguageItem> }) => {
  return (
    <LanguageIconWrapper>
      {langs.map((l, idx) => {
        if (l.onClick) {
          return <button key={idx} onClick={() => {
            if (l.onClick) {
              l.onClick(l.lang)
            }
          }}>{l.lang}</button>
        } 
        return <div key={idx}>{l.lang}</div>
      }
      )}
    </LanguageIconWrapper>
  );
};

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
        {items.map((i, idx) => (
          <SidebarItem key={idx} url={i.url} icon={i.icon} active={i.active} />
        ))}
        <LanguageIcons langs={[languages.current]} />
      </SidebarWrapper>
      <SidebarItemsWrapper open={open}>
        {items.map((i, idx) => (
          <SidebarText key={idx} url={i.url} text={i.text} />
        ))}
        <LanguageIcons langs={languages.others} />
      </SidebarItemsWrapper>
      <NavigationContainer>{children}</NavigationContainer>
      <div style={{ clear: "both" }}></div>
    </>
  );
};
