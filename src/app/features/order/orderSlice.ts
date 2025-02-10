import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { orderDetailsSchema, orderSchema } from "@/src/zod/ordersSchema";

type OrderState = z.infer<typeof orderSchema> & {
  currentStep: number;
  isChecked: boolean;
} & z.infer<typeof orderDetailsSchema>;

const initialState: OrderState = {
  pickupAddress: "",
  firstName: "",
  lastName: "",
  mobileNumber: "",
  alternateMobileNumber: "",
  email: "",
  country: "",
  landMark: "",
  address1: "",
  address2: "",
  shippingcity: "",
  shippingPincode: "",
  shippingState: "",

  isChecked: true,

  billingfirstName: "",
  billinglastName: "",
  billingmobileNumber: "",
  billingCountry: "",
  billingLandMark: "",
  billingAddress1: "",
  billingAddress2: "",
  billingcity: "",
  billingPincode: "",
  billingState: "",

  actualWeight: "",
  length: "",
  breadth: "",
  height: "",
  invoiceNo: "",
  invoiceCurrency: "",
  invoiceDate: "",
  orderid: "",
  items: [
    {
      productName: "",
      sku: "",
      hsn: "",
      qty: "",
      unitPrice: "",
      igst: "",
    },
  ],

  currentStep: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setBuyerDetail: (state, action: PayloadAction<Partial<OrderState>>) => {
      Object.assign(state, action.payload);
      if (state.isChecked) {
        state.billingfirstName = state.firstName;
        state.billinglastName = state.lastName;
        state.billingmobileNumber = state.mobileNumber;
        state.billingCountry = state.country;
        state.billingLandMark = state.landMark;
        state.billingAddress1 = state.address1;
        state.billingAddress2 = state.address2;
        state.billingcity = state.shippingcity;
        state.billingPincode = state.shippingPincode;
        state.billingState = state.shippingState;
      }
    },
    setBillingDetail: (state, action: PayloadAction<Partial<OrderState>>) => {
      Object.assign(state, action.payload);
    },
    toggleCheckbox: (state) => {
      state.isChecked = !state.isChecked;

      if (state.isChecked) {
        state.billingfirstName = state.firstName;
        state.billinglastName = state.lastName;
        state.billingmobileNumber = state.mobileNumber;
        state.billingCountry = state.country;
        state.billingLandMark = state.landMark;
        state.billingAddress1 = state.address1;
        state.billingAddress2 = state.address2;
        state.billingcity = state.shippingcity;
        state.billingPincode = state.shippingPincode;
        state.billingState = state.shippingState;
      }
    },
    setShippingField: (state, action: PayloadAction<{ field: keyof OrderState; value: string }>) => {
      (state[action.payload.field] as string) = action.payload.value;

      if (state.isChecked) {
        const billingField = ("billing" +
          action.payload.field.charAt(0).toUpperCase() +
          action.payload.field.slice(1)) as keyof typeof initialState;
        state[billingField] = action.payload.value as never;
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

export const { setBuyerDetail, setBillingDetail, toggleCheckbox, setShippingField, nextStep, prevStep, setStep } =
  orderSlice.actions;
export default orderSlice.reducer;
