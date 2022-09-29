import LoadingImg from "./assets/tryber_loading.gif";
import SiteHeader from "src/features/SiteHeader";

export default () => {
  return (
    <>
      <SiteHeader />
      <div id="appq-loading-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "280px" }}
            src={LoadingImg}
            alt="tryber loading"
          />
        </div>
      </div>
    </>
  );
};
