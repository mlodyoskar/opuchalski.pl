const Button = ({ children }) => {
  return (
    <button className="flex gap-2 items-center bg-white border-[#5686F5] border-2 dark:border-0  dark:bg-[#1D2433] rounded py-2 px-4 text-[#5686F5] text-lg hover:shadow-[0_2px_40px_-4px] transition-all ">
      {children}
    </button>
  );
};

export { Button };
