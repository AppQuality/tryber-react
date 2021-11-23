import { ReactComponent as LeaveCrowdDesktop } from "../assets/leave-crowd.svg";
import { ReactComponent as LeaveCrowdMobile } from "../assets/leave-crowd-mobile.svg";
import styled from "styled-components";

const LeaveCrowdComponent = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <LeaveCrowdDesktop className="aq-float-right lv-crowd-desktop" />
      <LeaveCrowdMobile className="lv-crowd-mobile" style={{ width: "100%" }} />
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
