import { CSSGrid, Skeleton } from "@appquality/appquality-design-system";

export const SkeletonTab = () => (
  <Skeleton>
    <div className="aq-p-3">
      <CSSGrid min="250px" gutter="50px">
        <div>
          <Skeleton.Item width="50px" height="1em" className="aq-mb-2" />
          <Skeleton.Item width="50px" height="1em" className="aq-mb-2" />
          <Skeleton.Item width="250px" height="39px" className="aq-mb-3" />
          <Skeleton.Item width="50px" height="1em" className="aq-mb-2" />
          <Skeleton.Item width="250px" height="39px" className="aq-mb-3" />
        </div>
        <div>
          <Skeleton.Item width="50px" height="1em" className="aq-mb-2" />
          <Skeleton.Item width="50px" height="1em" className="aq-mb-2" />
          <Skeleton.Item width="250px" height="39px" className="aq-mb-3 " />
          <Skeleton.Item width="50px" height="1em" className="aq-mb-2" />
          <Skeleton.Item width="250px" height="39px" className="aq-mb-3 " />
        </div>
      </CSSGrid>
    </div>
  </Skeleton>
);
