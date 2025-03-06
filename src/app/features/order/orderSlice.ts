import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialFormData } from "@/page/franchise-order/config/initialData";
import {
  ConsignorData,
  FormData,
  ShipmentInformationData,
  ShippingPartnerFormData,
} from "@/page/franchise-order/interface";

const initialState = initialFormData && {
  isChecked: true,
  currentStep: 1,
  openIndex: 1,
  countryName: "",
  billingCountryName: "",
  shipperRate: {},
  selectedRate: {},
  ...initialFormData,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setFormData: (
      state,
      action:
        | PayloadAction<Partial<ConsignorData>>
        | PayloadAction<Partial<FormData>>
        | PayloadAction<Partial<ShippingPartnerFormData>>
        | PayloadAction<Partial<ShipmentInformationData>>,
    ) => {
      // Object.assign(state, action.payload);
      return { ...state, ...action.payload };
    },

    toggleCheckbox: (state) => {
      state.isChecked = !state.isChecked;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
  },
});

export const { setFormData, toggleCheckbox, nextStep, prevStep } = orderSlice.actions;
export default orderSlice.reducer;
