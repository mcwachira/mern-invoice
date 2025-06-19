const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center min-h-[115vh]">
      {children}
    </div>
  );
};

export default AuthWrapper;
