import {itemsSpacing} from './variables'
import styled from "styled-components";

export interface LanguageItem {
  lang: string;
  onClick?(lang:string): void;
}

export const LanguageIconWrapper = styled.div`
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
export const LanguageIcons = ({ langs }: { langs: Array<LanguageItem> }) => {
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
