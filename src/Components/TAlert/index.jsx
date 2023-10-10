
const TAlert = ({ title = "Title", description = "Description", titleClr = "text-custom-black", bgClr = "bg-gray-50" }) => {
  return (
    <div variant="ghost" className={` mr-0 rounded-sm w-full min-h-[158px] py-5 px-6 ${bgClr}`}>
      <p className={`font-bold w-full text-sm ${titleClr} mb-[18px]`}>
        {title}
      </p>
      <span className="text-custom-gray text-[13px] w-full">{description}</span>
    </div>
  );
};

export default TAlert;