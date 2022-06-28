import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PostUsersMeCampaignsByCampaignIdMediaApiResponse,
  tryberApi,
} from "src/services/tryberApi";

// Define a type for the slice state
interface BugFormState {
  mediaList: FileElement[];
}

// Define the initial state using that type
const initialState: BugFormState = {
  mediaList: [],
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
  },
});

const { actions, reducer } = bugFormSlice;
export const {
  setMediaList,
  appendMediaList,
  updateMediaList,
  removeElementFromMedialist,
} = actions;
export default reducer;
