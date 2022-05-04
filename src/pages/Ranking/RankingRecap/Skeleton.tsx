import { Skeleton } from "@appquality/appquality-design-system";

export const SkeletonHeader = () => (
  <Skeleton>
    <>
      <div className="aq-mt-3 aq-text-center">
        <Skeleton.Item
          className="profile-avatar"
          style={{ display: "inline-block" }}
        />
      </div>
      <div>
        <div className="aq-my-3">
          <div className="aq-mb-3 aq-py-1">
            <Skeleton.Item width="200px" height="21px" />
          </div>
          <div className="aq-py-1">
            <Skeleton.Item width="50px" height="1em" />
          </div>
        </div>
        <div className="aq-mb-3">
          <Skeleton.Item width="100px" height="calc(1em + 1px)" />
        </div>
        <div className="aq-mb-1">
          <Skeleton.Item width="100px" height="calc(1em + 1px)" />
        </div>
      </div>
      <div className="aq-mt-3">
        <div className="aq-mb-3">
          <Skeleton.Item width="50px" height="1em" />
        </div>
        <div>
          <Skeleton.Item width="80px" height="1em" />
        </div>
      </div>
    </>
  </Skeleton>
);
