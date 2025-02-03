type Containetrprops = {
  children: React.ReactNode;
};
export const Container = ({ children }: Containetrprops) => {
  return <div className="max-w-screen-xl mx-auto px-4">{children}</div>;
};
