export const ProgressPage = () => {
  const stepData = [
    { id: 1, title: "Buyer Details" },
    { id: 2, title: "Order Details" },
    { id: 3, title: "Shipping Partner" },
    { id: 4, title: "Place Order" },
  ];
  return (
    <div className="w-full">
      <div className="rounded-md m-4 p-4 text-gray-400 font-semibold bg-white space-y-8 flex flex-col justify-start h-full">
        {stepData.map((step) => (
          <p key={step.id} className="">
            <span className="rounded-md p-1 px-3 bg-order-primary">
              <span className="text-white text-sm">{step.id}</span>
            </span>
            <span className="px-4">{step.title}</span>
          </p>
        ))}
      </div>
    </div>
  );
};
