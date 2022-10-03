import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CustomUserFieldsData,
  GetUsersMeCampaignsByCampaignIdFormsApiResponse,
} from "src/services/tryberApi";

interface PreviewSelectionFormState {
  cufList: CustomUserFieldsData[];
  formData?: GetUsersMeCampaignsByCampaignIdFormsApiResponse;
}

const initialState: PreviewSelectionFormState = {
  cufList: [],
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
  },
});

const { actions, reducer } = previewSelectionFormSlice;
export const { setCufList, setformData } = actions;
export default reducer;
