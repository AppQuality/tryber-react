import styled from "styled-components";
import { ReactComponent as LeaveCrowdDesktop } from "./assets/leave-crowd.svg";

const LeaveCrowdComponent = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <LeaveCrowdDesktop className="aq-float-right lv-crowd-desktop" />
      <LeaveCrowdDesktop className="aq-float-right lv-crowd-mobile" />
    </div>
  );
};

const LeaveCrowd = styled(LeaveCrowdComponent)`
  .lv-crowd-desktop {
    display: none;
  }
  @media screen and (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    .lv-crowd-desktop {
      display: block;
      height: 250px;
    }
    .lv-crowd-mobile {
      display: none;
    }
  }
`;

export default LeaveCrowd;
