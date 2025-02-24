import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsignorData } from "./interface";
import ConsignorSelect from "./components/ConsignorSelect";
import { consignorDetailSchema } from "@/zod/franchiseOrderSchema";

interface IConsignorDetailProps {
  data: ConsignorData;
  onNext: (formData: ConsignorData) => void;
}
export const ConsignorDetail = ({ data, onNext }: IConsignorDetailProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ConsignorData>({
    resolver: zodResolver(consignorDetailSchema),
    defaultValues: data,
  });

  const userOption = userDetail.map((user) => ({
    label: `${user.mobileNo.slice(4)} / ${user.firstName} ${user.lastName} / ${user.email}`,
    value: JSON.stringify({
      mobileNo: user.mobileNo.slice(4),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      billingAddress: user.billingAddress,
      documentType: user.documentType,
      documentDetail: user.documentDetail,
    }),
  }));

  const onSubmit = (data: ConsignorData) => {
    onNext(data);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="pb-2 text-sm font-normal leading-none text-franchise-sectionp">Select Customer</h5>
        <div className="relative w-3/5 z-10">
          <Controller
            control={control}
            name="pickupAddress"
            render={({ field }) => (
              <ConsignorSelect
                title="Select Customer"
                className="z-100"
                options={userOption}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleUserSelect(value);
                }}
                errorName={errors.pickupAddress?.message}
              />
            )}
          />
        </div>

        <div className="flex justify-between">
          {(data.pickupAddress || selectedUser) && (
            <div className="flex flex-col tablet:flex-row justify-start items-center gap-4">
              {userDetail.map((user) => (
                <div className="flex flex-col tablet:flex-row justify-start gap-4 md:gap-10 py-5 text-xs text-franchise-sectionp pt-6">
                  <div className="flex flex-col text-nowrap">
                    <span className="text-franchise-sectionp font-semibold text-xs">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-sm">{user.email}</span>
                    <span>{user.mobileNo}</span>
                  </div>
                  <div className="w-full">
                    <p className="font-semibold text-xs text-franchise-consignor-text">Address</p>
                    <p className="mt-1">{user.billingAddress}</p>
                  </div>
                  <div className="w-full">
                    <p className="font-medium text-xs text-franchise-consignor-text">Documnet Type</p>
                    <p className="mt-1">{user.documentDetail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={`flex justify-end items-end ${(!data.pickupAddress || selectedUser) && "w-5/4"} mt-4`}>
            <button
              type="submit"
              className="text-franchise-button-text bg-franchise-primary text-sm rounded-md py-2 px-4 font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

const userDetail = [
  {
    firstName: "Murli",
    lastName: "Chandani",
    email: "murli@gmail.com",
    mobileNo: "+91-8239989323",
    billingAddress:
      "S/O Assudomal Chandani, House No 6 New Frinds Colony Behind 56 Bhog, Huzur Bhopa, Madhya Pradesh - 462016",
    documentType: "Aadhar",
    documentDetail: "786567876545",
  },
];
