export const AuthLayout = ({ title, children }) => {
  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-zinc-800 flex flex-col justify-center gap-4 p-8 rounded-md text-zinc-50 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};