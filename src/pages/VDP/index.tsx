import { useParams } from "react-router-dom";
import { useAppSelector } from "src/store";
import BugForm from "../BugForm";
import Loading from "src/features/Loading";
import { PageTemplate } from "src/features/PageTemplate";

export default function VdpPage() {
  const { id } = useParams<{ id: string }>();
  const isPublic = useAppSelector((state) => state.publicUserPages.isPublic);
  const route = `/vdp/${id}`;

  if (!isPublic) {
    return (
      <PageTemplate route={route} shouldBeLoggedIn={false}>
        <Loading />
      </PageTemplate>
    );
  }

  return <BugForm customRoute={route} shouldBeLoggedIn={false} />;
}
