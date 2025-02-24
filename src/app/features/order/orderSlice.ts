import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialFormData } from "@/page/franchise-order/config/initialData";
import {
  ConsignorData,
  FormData,
  ShipmentInformationData,
  ShippingPartnerFormData,
} from "@/page/franchise-order/interface";

const initialState = initialFormData && { isChecked: true, currentStep: 1, openIndex: 1, countryName: "", billingCountryName: "", ...initialFormData };

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
      if (state.isChecked) {
        state.consigneeDetail.billingfirstName = state.consigneeDetail.firstName;
        state.consigneeDetail.billinglastName = state.consigneeDetail.lastName;
        state.consigneeDetail.billingmobileNumber = state.consigneeDetail.mobileNumber;
        state.consigneeDetail.billingCountry = state.consigneeDetail.country;
        state.consigneeDetail.billingLandMark = state.consigneeDetail.landMark;
        state.consigneeDetail.billingAddress1 = state.consigneeDetail.address1;
        state.consigneeDetail.billingAddress2 = state.consigneeDetail.address2;
        state.consigneeDetail.billingcity = state.consigneeDetail.shippingcity;
        state.consigneeDetail.billingPincode = state.consigneeDetail.shippingPincode;
        state.consigneeDetail.billingState = state.consigneeDetail.shippingState;
      }
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setFormData, toggleCheckbox, nextStep, prevStep, setStep } = orderSlice.actions;
export default orderSlice.reducer;
