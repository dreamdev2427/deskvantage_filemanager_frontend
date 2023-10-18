import { BiSearch } from "react-icons/bi";
import { GRAY } from "../../utils/constant";

const FMSearchBox = ({ className }) => {
  return (
    <div
      className={`${className} flex items-center justify-between rounded-[8px]`}
    >
      <div className="flex justify-start items-center">
        <BiSearch className={`w-[18px] h-[18px] ml-4 fill-[#000000af]`} />
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

export default FMSearchBox;
