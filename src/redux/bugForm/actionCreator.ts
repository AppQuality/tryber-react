import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";
import { createFilesElementList } from "./utils";
import { v4 as uuidv4 } from "uuid";

export const uploadMedia =
  (
    files: File[]
  ): ThunkAction<Promise<any>, GeneralState, unknown, BugFormActions> =>
  async (dispatch, getState) => {
    const uploadId = uuidv4();
    const elements = createFilesElementList(files, "uploading", uploadId);
    dispatch({
      type: "bugForm/appendMediaList",
      payload: elements,
    });
    try {
      const data = await API.uploadMedia(files);
      const {
        bugForm: { mediaList },
      } = getState();
      const newMediaList = mediaList.map((media) => ({
        id: media.id,
        fileName: media.fileName,
        fileType: media.fileType,
        mimeType: media.mimeType,
        status: media.status,
        errorCode: media.errorCode,
        previewUrl: media.previewUrl,
        uploadedFileUrl: media.uploadedFileUrl,
        uploadId: media.uploadId,
      }));
      newMediaList.forEach((media, i) => {
        data.files.forEach((file) => {
          if (media.fileName === file.name && uploadId === media.uploadId) {
            newMediaList[i].status = "success";
            newMediaList[i].uploadedFileUrl = file.path;
          }
        });
        data.failed?.forEach((fail) => {
          if (media.fileName === fail.name && uploadId === media.uploadId) {
            newMediaList[i].status = "failed";
          }
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
          if (
            media.fileName === element.fileName &&
            media.uploadId === uploadId
          ) {
            newMediaList[i].status = "failed";
            newMediaList[i].errorCode = "UPLOAD_ERROR";
          }
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
        if (f.id === media.id) newList.splice(i, 1);
      });
      dispatch({
        type: "bugForm/setMediaList",
        payload: newList,
      });
    } catch (e) {
      console.log(e);
    }
  };
