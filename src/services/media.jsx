import { DEBUG_MODE } from "@/utils/constant";
import http from "@/utils/http";

const MEDIA_API = "";

const getAllMedias = () => {
    return http
        .get(MEDIA_API + "/allfiles")
        .then(
            (res) => {
                return res;
            },
            (err) => {
                if (!DEBUG_MODE) console.clear();
                return err.response;
            }
        )
        .catch((err) => {
            return err;
        });
}

const getTranscriptionByFileId = (fileId) => {
    return http
        .get(MEDIA_API + "?filename=" + fileId)
        .then(
            (res) => {
                return res;
            },
            (err) => {
                if (!DEBUG_MODE) console.clear();
                return err.response;
            }
        )
        .catch((err) => {
            return err;
        });
}

const MediaService = {
    getAllMedias,
    getTranscriptionByFileId
};

export default MediaService;