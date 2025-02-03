export const ProgressPage = () => {
  const stepData = [
    { id: 1, title: "Buyer Details" },
    { id: 2, title: "Order Details" },
    { id: 3, title: "Shipping Partner" },
    { id: 4, title: "Place Order" },
  ];
  return (
    <>
      <div className="flex flex-col items-center m-4 bg-white p-8 text-nowrap gap-8 rounded-md justify-center">
        {stepData.map((step, index) => (
          <div key={index} className="w-full mr-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center font-semibold bg-progress-step text-sm text-white h-8 w-8 rounded-md">{step.id}</div>
              <div className="font-semibold text-gray-500">{step.title}</div>
            </div>
            {/* {index !== stepData.length - 1 && <div className="flex-1 h-0.5 bg-gray-300 w-8"></div>} */}
          </div>
        ))}
      </div>
    </>
  );
};
