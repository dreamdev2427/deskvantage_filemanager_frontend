// redux
import { setSelectedMediaId, clearSelectedMediaId } from "@/redux-toolkit/reducers/Media";
import { useSelector, useDispatch } from "react-redux";

// icons
import { AiOutlineClose } from "react-icons/ai";
import { CgPlayButtonO, CgPlayPause } from "react-icons/cg";
import { msToTime } from "@/utils/function";

const PlaylistSideBar = ({ close }) => {
  const dispatch = useDispatch();

  const { selectedMediaId, medias, isPlaying } = useSelector((state) => state.media); //true: left, false: right

  const onClickMedia = (id) => {
    if (id === selectedMediaId) dispatch(clearSelectedMediaId());
    else dispatch(setSelectedMediaId(id))
  }

  return (
    <div className={'w-full h-[calc(100vh-160px)] shadow-xl shadow-blue-gray-900/5 duration-300 border-gray-300'}>
      <div className="flex justify-between py-3 ml-5 mr-4">
        <div className="text-custom-black font-bold">
          <p className="text-base">Playlist</p>
          <p className="text-[11px] font-normal text-custom-gray">{ medias.length } Files</p>
        </div>
        <AiOutlineClose onClick={() => close()} className="w-[30px] h-[30px] self-center text-custom-sky bg-custom-sky-gray p-1 cursor-pointer rounded-full" />
      </div>
      <hr className="border-blue-gray-50 mb-6" /> 
      <div className="h-[calc(100%-124px)] overflow-auto scrollbar scrollPaddingRight ml-5 mr-[10px]">
        {medias.map((media, index) => {
          let selected = selectedMediaId === media.fileId;
          return (
            <div key={media.fileId} className={`flex justify-between cursor-pointer ${index == 0 ? "" : "mt-3"}`} onClick={() => onClickMedia(media.fileId)}>
              <div className="flex gap-3 overflow-hidden">
                {selected && isPlaying ? <CgPlayPause className={`min-w-[20px] min-h-[20px] self-center ${selected ? "text-custom-sky" : "text-custom-gray"}`} /> : <CgPlayButtonO className={`min-w-[20px] min-h-[20px] self-center ${selected ? "text-custom-sky" : "text-custom-gray"}`} />}
                <p className={selected ? "text-custom-sky" : "text-custom-black"}>{index + 1}</p>
                <p className={`${selected ? "text-custom-sky" : "text-custom-black"} overflow-hidden text-ellipsis whitespace-nowrap`}>{ media.fileName }</p>
              </div>
              <p className="text-custom-gray ml-3">{ msToTime(media.duration) }</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default PlaylistSideBar;
