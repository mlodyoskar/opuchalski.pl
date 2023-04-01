interface Props {
  children: React.ReactNode;
}

export const Card = ({ children }: Props) => (
  <div className="w-full rounded-lg border bg-white p-4 text-center shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8">
    {children}
  </div>
);
