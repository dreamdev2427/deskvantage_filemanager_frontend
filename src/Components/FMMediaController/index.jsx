import { useEffect } from "react";
// redux
import {
  setIsPlaying,
  setSelectedMediaId,
  setFrameSpeed,
  setVolume,
} from "@/redux-toolkit/reducers/Media";
import { useSelector, useDispatch } from "react-redux";

// material
import { Slider } from "@material-tailwind/react";

// icons
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { BiSolidVolume, BiSolidVolumeFull } from "react-icons/bi";

// constant
import {
  getIndexFromArr,
  getItemFromArr,
  msToTime,
  setMinimumFractionFormat,
} from "@/utils/function";

const TMediaController = () => {
  const dispatch = useDispatch();
  const {
    selectedMediaId,
    medias,
    isPlaying,
    frameSpeed,
    volume,
    currentTime,
  } = useSelector((state) => state.media);

  const onClickMinusFrameSpeed = () => {
    let frameSpeedNum = frameSpeed * 1;
    frameSpeedNum -= 0.2;
    if (frameSpeedNum < 0.4) frameSpeedNum = 0.4;
    dispatch(setFrameSpeed(setMinimumFractionFormat(frameSpeedNum)));
  };

  const onClickPlusFrameSpeed = () => {
    let frameSpeedNum = frameSpeed * 1;
    frameSpeedNum += 0.2;
    if (frameSpeedNum > 4) frameSpeedNum = 4;
    dispatch(setFrameSpeed(setMinimumFractionFormat(frameSpeedNum)));
  };

  const onClickPrevMedia = () => {
    let selMIndex = getIndexFromArr(medias, "fileId", selectedMediaId);
    if (selMIndex < 1) return;
    dispatch(setSelectedMediaId(medias[selMIndex - 1].fileId));
  };

  const onClickNextMedia = () => {
    let selMIndex = getIndexFromArr(medias, "fileId", selectedMediaId);
    if (selMIndex == medias.length - 1 || selMIndex == -1) return;
    dispatch(setSelectedMediaId(medias[selMIndex + 1].fileId));
  };

  useEffect(() => {
    if (!medias.length) return;
  }, [currentTime]);

  return (
    <div className="h-[90px] w-[100%] fixed bottom-0 z-50 bg-custom-white">
      <div className="flex gap-6 h-full w-full justify-between px-10">
        <div className="flex justify-between">
          <div className="flex items-center gap-1.5 w-[260px]">
            <BiSolidVolume
              className="text-custom-medium-gray text-lg cursor-pointer"
              onClick={() => dispatch(setVolume(1))}
            />
            <Slider
              value={volume}
              onChange={(e) => dispatch(setVolume(e.target.value))}
              className="h-0.5 w-36 text-custom-sky"
              thumbClassName="[&::-webkit-slider-thumb]:bg-custom-sky [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2"
            />
            <BiSolidVolumeFull
              className="text-custom-medium-gray text-lg cursor-pointer"
              onClick={() => dispatch(setVolume(100))}
            />
          </div>
          <div className="flex items-center gap-10 mr-[46px] ml-[42px]">
            <AiFillBackward
              className="text-custom-medium-gray text-2xl cursor-pointer"
              onClick={onClickPrevMedia}
            />
            {isPlaying ? (
              <BsPauseCircleFill
                className="text-custom-sky text-5xl cursor-pointer"
                onClick={() =>
                  selectedMediaId == "" ? "" : dispatch(setIsPlaying(false))
                }
              />
            ) : (
              <BsPlayCircleFill
                className="text-custom-sky text-5xl cursor-pointer"
                onClick={() =>
                  selectedMediaId == "" ? "" : dispatch(setIsPlaying(true))
                }
              />
            )}
            <AiFillForward
              className="text-custom-medium-gray text-2xl cursor-pointer"
              onClick={onClickNextMedia}
            />
          </div>
          <p className="text-custom-black text-[13px] self-center w-[260px]">
            {msToTime(currentTime, true)}/
            {selectedMediaId == ""
              ? "00:00"
              : msToTime(
                  getItemFromArr(medias, "fileId", selectedMediaId)?.duration,
                  true
                )}
          </p>
        </div>
        <div className="flex gap-2 items-center w-[400px] justify-end">
          <p className=" text-sm">Frames Speed</p>
          <div className="flex items-center border-[1px] rounded border-custom-light-gray select-none">
            <p
              onClick={onClickMinusFrameSpeed}
              className="border-r-[1px] border-custom-light-gray cursor-pointer bg-custom-white w-[34px] h-[34px] rounded flex items-center justify-center"
            >
              -
            </p>
            <p className="w-8 items-center justify-center flex">{frameSpeed}</p>
            <p
              onClick={onClickPlusFrameSpeed}
              className="border-l-[1px] border-custom-light-gray cursor-pointer bg-custom-white w-[34px] h-[34px] rounded flex items-center justify-center"
            >
              +
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TMediaController;
