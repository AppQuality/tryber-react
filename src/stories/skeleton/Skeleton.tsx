import styled, { DefaultTheme } from "styled-components";

export interface SkeletonProps {
  theme: DefaultTheme;
}

const Skeleton = styled.div(({ theme }: SkeletonProps) => {
  return `
      min-height: 1em;
      min-width: 100px;
      background-image: linear-gradient(90deg, #F0F5F7 0px, #ffffff 40px, #F0F5F7 80px);
      background-size: 600px;
      border-radius: 4px;
      animation: active 1.6s infinite linear;
      @keyframes active {
       0% {background-position: -100px;}
       40% {background-position: 140px;}
       100% {background-position: 140px;}
      }
    `;
});

export default Skeleton;
