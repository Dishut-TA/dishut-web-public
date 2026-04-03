interface Props {
  children: React.ReactNode;
}

const AuthCard = ({ children }: Props) => {
  return (
    <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-md">
      {children}
    </div>
  );
};

export default AuthCard;