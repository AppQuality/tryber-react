import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store";
import BugForm from "../BugForm";
import { useEffect } from "react";
import { setUserTokenPublic } from "src/redux/publicUserPages";
import Loading from "src/features/Loading";

export default function VdpPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isPublic = useAppSelector((state) => state.publicUserPages.isPublic);

  useEffect(() => {
    dispatch(setUserTokenPublic());
  }, []);

  if (!isPublic) {
    return <Loading />;
  }

  return <BugForm customRoute={`/vdp/${id}`} shouldBeLoggedIn={false} />;
}
