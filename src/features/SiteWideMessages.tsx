import { TransitionGroup, CSSTransition } from "react-transition-group";
import siteWideMessageStore from "../redux/siteWideMessages";

const SiteWideMessages = () => {
  const { messages, add, remove } = siteWideMessageStore();

  return (
    <>
      <button onClick={() => add({ message: "Test", type: "success" })}>
        Add message
      </button>
      <button
        onClick={() => add({ message: "Test", type: "success", expire: false })}
      >
        Add message without expire
      </button>
      <TransitionGroup>
        {messages.map((m) => (
          <CSSTransition timeout={200} classNames="fade">
            <div
              onClick={m.expire ? undefined : () => remove({ uuid: m.uuid })}
            >
              ({m.uuid}) - {m.message} (Type: {m.type})
              {m.expire ? `Expire in ${m.expire}s` : ""}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default SiteWideMessages;
