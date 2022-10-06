import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CustomUserFieldsData,
  GetUsersMeCampaignsByCampaignIdFormsApiResponse,
} from "src/services/tryberApi";

interface PreviewSelectionFormState {
  cufList: CustomUserFieldsData[];
  formData?: GetUsersMeCampaignsByCampaignIdFormsApiResponse;
  showSubmitError: boolean;
}

const initialState: PreviewSelectionFormState = {
  cufList: [],
  showSubmitError: false,
};
const previewSelectionFormSlice = createSlice({
  name: "previewSelectionForm",
  initialState: initialState,
  reducers: {
    setCufList(state, action: PayloadAction<CustomUserFieldsData[]>) {
      state.cufList = action.payload;
    },
    setformData(
      state,
      action: PayloadAction<GetUsersMeCampaignsByCampaignIdFormsApiResponse>
    ) {
      state.formData = action.payload;
    },
    setShowSubmitError(state, action: PayloadAction<boolean>) {
      state.showSubmitError = action.payload;
    },
  },
});

const { actions, reducer } = previewSelectionFormSlice;
export const { setCufList, setformData, setShowSubmitError } = actions;
export default reducer;
