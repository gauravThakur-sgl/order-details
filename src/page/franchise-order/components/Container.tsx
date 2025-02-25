interface IContainerProps {
  children?: React.ReactNode;
}
export const Container = ({ children }: IContainerProps) => {
  return (
    <div className="mt-15 sm:ml-18">
      <div className="pb-8 pt-6 mx-4 lg:mx-5 2xl:mx-56 bg-gray-50">{children}</div>
    </div>
  );
};
