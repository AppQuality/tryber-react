import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";

export const uploadMedia =
  (
    files: File[]
  ): ThunkAction<Promise<any>, GeneralState, unknown, BugFormActions> =>
  async (dispatch) => {
    try {
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
        type: "bugForm/setMediaList",
        payload: elements,
      });
      const data = await API.uploadMedia(files);
    } catch (e) {
      console.log(e);
    }
  };
