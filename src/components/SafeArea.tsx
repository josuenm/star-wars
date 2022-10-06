interface SafeAreaProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const SafeArea = ({ children, className }: SafeAreaProps) => {
  return (
    <div className={`w-full max-w-[800px] px-3 sm:px-0 mx-auto ${className}`}>
      {children}
    </div>
  );
};
