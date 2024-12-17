import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PostUsersMeCampaignsByCampaignIdMediaApiResponse,
  tryberApi,
} from "src/services/tryberApi";

// Define a type for the slice state
interface BugFormState {
  mediaList: FileElement[];
  bugDetailsModal: {
    open: boolean;
    title: string;
    type: "severity" | "type" | "replicability" | "";
  };
}

// Define the initial state using that type
const initialState: BugFormState = {
  mediaList: [],
  bugDetailsModal: {
    open: false,
    title: "",
    type: "",
  },
};
const bugFormSlice = createSlice({
  name: "bugForm",
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
          if (media.fileName === file.name && requestId === media.uploadId) {
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
    setBugDetailsModal(
      state,
      action: PayloadAction<{
        open: boolean;
        title: string;
        type: "severity" | "type" | "replicability" | "";
      }>
    ) {
      state.bugDetailsModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tryberApi.endpoints.postUsersMeCampaignsByCampaignIdMedia.matchFulfilled,
      (state, { meta, payload, type }) => {
        bugFormSlice.caseReducers.updateMediaList(state, {
          payload: {
            requestId: meta.requestId,
            data: payload,
          },
          type: type,
        });
      }
    );
    builder.addMatcher(
      tryberApi.endpoints.postUsersMeCampaignsByCampaignIdMedia.matchRejected,
      (state, { meta, type }) => {
        bugFormSlice.caseReducers.rejectedForGenericError(state, {
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
        bugFormSlice.caseReducers.removeElementFromMedialist(state, {
          payload: {
            url: meta.arg.originalArgs.body.url,
          },
          type: type,
        });
      }
    );
  },
});

const { actions, reducer } = bugFormSlice;
export const {
  setMediaList,
  appendMediaList,
  updateMediaList,
  removeElementFromMedialist,
  setBugDetailsModal,
} = actions;
export default reducer;
