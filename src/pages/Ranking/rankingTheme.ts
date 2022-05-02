import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import { ReactNode } from "react";
import { ReactComponent as noLevelIcon } from "src/pages/Ranking/assets/noLevelIcon.svg";
import { ReactComponent as basicIcon } from "src/pages/Ranking/assets/basicIcon.svg";
import { ReactComponent as bronzeIcon } from "src/pages/Ranking/assets/bronzeIcon.svg";
import { ReactComponent as silverIcon } from "src/pages/Ranking/assets/silverIcon.svg";
import { ReactComponent as goldIcon } from "src/pages/Ranking/assets/goldIcon.svg";
import { ReactComponent as platinumIcon } from "src/pages/Ranking/assets/platinumIcon.svg";
import { ReactComponent as diamondIcon } from "src/pages/Ranking/assets/diamondIcon.svg";
import { ReactComponent as legendaryIcon } from "src/pages/Ranking/assets/legendaryIcon.svg";

const pink = "#D57287",
  pink05 = "#FBF1F3",
  pink2 = "#EEC7CF",
  pinkM600 = "#b23a5d",
  bronze = "#C38F00",
  orange05 = "#F9EFD4",
  bronze2 = "#E7CF8E",
  orangeM400 = "#D4772C",
  royalM400 = "#7986d8",
  royal05 = "#F2F3FB",
  royal2 = "#E6E8F7",
  royalM600 = "#636EB3",
  lemon600 = "#FFBB10",
  lemon05 = "#FFF8E7",
  lemon1 = "#FFF2D1",
  lemonM600 = "#c38f00",
  azure600 = "#1371D6",
  azure05 = "#E7F1FB",
  azure15 = "#B8D4F3",
  green = "#128881",
  green0 = "#CAF8F5",
  green15 = "#93D6D2",
  green7 = "#0B524D";
interface RankingTheme {
  [key: number]: {
    main: string;
    background1: string;
    background2: string;
    textColor: string;
    icon: ReactNode;
  };
}

const rankingTheme: RankingTheme = {
  0: {
    main: aqBootstrapTheme.colors.gray300,
    background1: aqBootstrapTheme.colors.gray300,
    background2: aqBootstrapTheme.colors.gray300,
    textColor: aqBootstrapTheme.colors.gray400,
    icon: noLevelIcon,
  },
  10: {
    main: pink,
    background1: pink05,
    background2: pink2,
    textColor: pinkM600,
    icon: basicIcon,
  },
  20: {
    main: bronze,
    background1: orange05,
    background2: bronze2,
    textColor: orangeM400,
    icon: bronzeIcon,
  },
  30: {
    main: royalM400,
    background1: royal05,
    background2: royal2,
    textColor: royalM600,
    icon: silverIcon,
  },
  40: {
    main: lemon600,
    background1: lemon05,
    background2: lemon1,
    textColor: lemonM600,
    icon: goldIcon,
  },
  50: {
    main: azure600,
    background1: azure05,
    background2: azure15,
    textColor: azure600,
    icon: platinumIcon,
  },
  60: {
    main: green,
    background1: green0,
    background2: green15,
    textColor: green7,
    icon: diamondIcon,
  },
  70: {
    main: aqBootstrapTheme.palette.secondary,
    background1: aqBootstrapTheme.colors.purple100,
    background2: aqBootstrapTheme.colors.indigo100,
    textColor: aqBootstrapTheme.colors.indigo500,
    icon: legendaryIcon,
  },
};

export { rankingTheme };
