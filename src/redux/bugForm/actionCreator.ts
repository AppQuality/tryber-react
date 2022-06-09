import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";
import { createFilesElementList } from "./utils";

export const uploadMedia =
  (
    files: File[]
  ): ThunkAction<Promise<any>, GeneralState, unknown, BugFormActions> =>
  async (dispatch, getState) => {
    const elements = createFilesElementList(files, "uploading");
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

export const addedDiscardedMedia =
  (
    files: File[]
  ): ThunkAction<Promise<any>, GeneralState, unknown, BugFormActions> =>
  async (dispatch) => {
    const elements = createFilesElementList(files, "failed");
    dispatch({
      type: "bugForm/appendMediaList",
      payload: elements,
    });
  };

export const deleteMedia =
  (
    media: FileElement
  ): ThunkAction<Promise<any>, GeneralState, unknown, BugFormActions> =>
  async (dispatch, getState) => {
    const {
      bugForm: { mediaList },
    } = getState();
    try {
      if (media.uploadedFileUrl) {
        await API.deleteMedia({ url: media.uploadedFileUrl });
      }
      const newList = [...mediaList];
      newList.forEach((f, i) => {
        if (f.fileName === media.fileName) newList.splice(i, 1);
      });
      dispatch({
        type: "bugForm/setMediaList",
        payload: newList,
      });
    } catch (e) {
      console.log(e);
    }
  };
