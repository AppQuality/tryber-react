import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";

export const uploadMedia =
  (
    files: File[]
  ): ThunkAction<Promise<any>, GeneralState, unknown, BugFormActions> =>
  async (dispatch, getState) => {
    const elements: FileElement[] = [];
    files.forEach((f) => {
      const type = f.type.split("/")[0];
      elements.push({
        fileName: f.name,
        fileType: type,
        status: "uploading",
        previewUrl: type === "image" ? URL.createObjectURL(f) : undefined,
      });
    });
    dispatch({
      type: "bugForm/appendMediaList",
      payload: elements,
    });
    try {
      const data = await API.uploadMedia(files);
      const {
        bugForm: { mediaList },
      } = getState();
      const newMediaList = [...mediaList];
      newMediaList.forEach((media, i) => {
        data.files.forEach((file) => {
          if (media.fileName === file.name) {
            newMediaList[i].status = "success";
            newMediaList[i].uploadedFileUrl = file.path;
          }
        });
        data.failed?.forEach((fail) => {
          if (media.fileName === fail.name) newMediaList[i].status = "failed";
        });
      });
      dispatch({
        type: "bugForm/setMediaList",
        payload: newMediaList,
      });
    } catch (e) {
      console.log(e);
      const {
        bugForm: { mediaList },
      } = getState();
      const newMediaList = [...mediaList];
      newMediaList.forEach((media, i) => {
        elements.forEach((element) => {
          if (media.fileName === element.fileName)
            newMediaList[i].status = "failed";
        });
      });
      dispatch({
        type: "bugForm/setMediaList",
        payload: newMediaList,
      });
    }
  };
