const SearchBox = ({ className }) => {
  return (
    <div
      className={`${className} flex items-center justify-between rounded-[8px]`}
    >
      <div className="flex justify-start items-center">
        <img
          src="/image/SearchIcon.svg"
          className="w-[18px] h-[18px] ml-4"
          alt="search icon"
        ></img>
        <input
          placeholder="Start typing to search"
          type="text"
          className="text-black text-md bg-transparent  w-full ml-3            
        "
        />
      </div>
    </div>
  );
};

export default SearchBox;
