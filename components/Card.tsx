interface Props {
  children: React.ReactNode;
}

export const Card = ({ children }: Props) => (
  <div className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-center shadow-md sm:p-8">
    {children}
  </div>
);
