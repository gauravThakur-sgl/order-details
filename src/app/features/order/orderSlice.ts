import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { orderSchema } from "@/src/zod/ordersSchema";

type OrderState = z.infer<typeof orderSchema> & {
  currentStep: number;
  billingCheckbox: boolean;
};

const initialState: OrderState = {
  pickupAddress: "",
  firstName: "",
  lastName: "",
  mobileNumber: "",
  alternateMobileNumber: "",
  email: "",
  country: "",
  address1: "",
  address2: "",
  shippingcity: "",
  shippingPincode: "",
  shippingState: "",
  billingCheckbox: false,
  billingfirstName: "",
  billinglastName: "",
  billingmobileNumber: "",
  billingCountry: "",
  billingAddress1: "",
  billingAddress2: "",
  billingcity: "",
  billingPincode: "",
  billingState: "",
  currentStep: 0,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setBuyerDetail: (state, action: PayloadAction<Partial<OrderState>>) => {
      return { ...state, ...action.payload };
    },
    isBillingSame: (state, action: PayloadAction<boolean>) => {
      state.billingCheckbox = action.payload;
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

export const { setBuyerDetail, nextStep, prevStep, setStep } = orderSlice.actions;
export default orderSlice.reducer;
