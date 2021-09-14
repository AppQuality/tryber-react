import { Toastr } from "@appquality/appquality-design-system";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import siteWideMessageStore from "../redux/siteWideMessages";
import styled from "styled-components";

const TIMEOUT = 200;
const ToastrContainer = styled.div`
  position: fixed;
  top: 0;
  left: 20%;
  right: 20%;
  z-index: 99999;

  .fade {
    transition: all ${TIMEOUT}ms;
  }
  .fade-enter {
    opacity: 0;
    &.fade-enter-active {
      opacity: 1;
    }
  }
  .fade-exit {
    opacity: 1;
    &.fade-exit-active {
      opacity: 0;
    }
  }
`;

const SiteWideMessages = () => {
  const { messages, add, remove } = siteWideMessageStore();

  return (
    <ToastrContainer>
      <TransitionGroup>
        {messages.map((m) => (
          <CSSTransition timeout={TIMEOUT} classNames="fade">
            <Toastr
              type={m.type}
              className="aq-mb-3 fade"
              onClose={m.expire ? undefined : () => remove({ uuid: m.uuid })}
            >
              {m.message}
            </Toastr>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ToastrContainer>
  );
};

export default SiteWideMessages;
