type Containetrprops = {
  children: React.ReactNode;
};
export const Container = ({ children }: Containetrprops) => {
  return <div className="max-w-screen-xl mx-auto px-1 md:px-4">{children}</div>;
};
