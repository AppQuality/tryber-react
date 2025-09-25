import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PostUsersMeCampaignsByCampaignIdMediaApiResponse,
  tryberApi,
} from "src/services/tryberApi";
import { normalizeFileName } from "./normalizeFileName";

export interface FileElement {
  id: string;
  fileName: string;
  fileType: string;
  mimeType: string;
  status: "success" | "failed" | "uploading";
  errorCode?: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
  previewUrl?: string;
  uploadedFileUrl?: string;
  uploadId?: string;
  taskId: string;
}

// Define a type for the slice state
interface MediaListState {
  mediaList: FileElement[];
}

// Define the initial state using that type
const initialState: MediaListState = {
  mediaList: [],
};
const mediaListSlice = createSlice({
  name: "mediaList",
  initialState: initialState,
  reducers: {
    setMediaList(state, action: PayloadAction<FileElement[]>) {
      state.mediaList = action.payload;
    },
    appendMediaList(state, action: PayloadAction<FileElement[]>) {
      state.mediaList = state.mediaList.concat(action.payload);
    },
    removeElementFromMedialist(
      state,
      action: PayloadAction<{ url?: string; id?: string }>
    ) {
      const { url, id } = action.payload;
      if (url) {
        state.mediaList = state.mediaList.filter(
          (media) => media.uploadedFileUrl !== url
        );
      } else if (id) {
        state.mediaList = state.mediaList.filter((media) => media.id !== id);
      }
    },
    updateMediaList(
      state,
      action: PayloadAction<{
        requestId: string;
        data: PostUsersMeCampaignsByCampaignIdMediaApiResponse;
      }>
    ) {
      const {
        data: { files, failed },
        requestId,
      } = action.payload;
      const { mediaList } = state;
      mediaList.forEach((media, i) => {
        files?.forEach((file) => {
          if (
            normalizeFileName(media.fileName) === file.name &&
            requestId === media.uploadId
          ) {
            mediaList[i].status = "success";
            mediaList[i].uploadedFileUrl = file.path;
          }
        });
        failed?.forEach((fail) => {
          if (media.fileName === fail.name && requestId === media.uploadId) {
            mediaList[i].status = "failed";
            mediaList[i].errorCode = fail.errorCode;
          }
        });
      });
    },
    rejectedForGenericError(
      state,
      action: PayloadAction<{
        requestId: string;
      }>
    ) {
      const { requestId } = action.payload;
      const { mediaList } = state;
      mediaList.forEach((media, i) => {
        if (requestId === media.uploadId) {
          mediaList[i].status = "failed";
          mediaList[i].errorCode = "GENERIC_ERROR";
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tryberApi.endpoints.postUsersMeCampaignsByCampaignIdTasksAndTaskIdMedia
        .matchFulfilled,
      (state, { meta, payload, type }) => {
        mediaListSlice.caseReducers.updateMediaList(state, {
          payload: {
            requestId: meta.requestId,
            data: payload,
          },
          type: type,
        });
      }
    );
    builder.addMatcher(
      tryberApi.endpoints.postUsersMeCampaignsByCampaignIdTasksAndTaskIdMedia
        .matchRejected,
      (state, { meta, type }) => {
        mediaListSlice.caseReducers.rejectedForGenericError(state, {
          payload: {
            requestId: meta.requestId,
          },
          type: type,
        });
      }
    );
    builder.addMatcher(
      tryberApi.endpoints.deleteMedia.matchFulfilled,
      (state, { meta, type }) => {
        mediaListSlice.caseReducers.removeElementFromMedialist(state, {
          payload: {
            url: meta.arg.originalArgs.body.url,
          },
          type: type,
        });
      }
    );
  },
});

const { actions, reducer } = mediaListSlice;
export const {
  setMediaList,
  appendMediaList,
  updateMediaList,
  removeElementFromMedialist,
} = actions;
export default reducer;
