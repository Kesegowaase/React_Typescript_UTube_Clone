import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { RecommendedVideos } from "../../Types";
import { parseRecommendedData } from "../../utils";
import { UTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_UTUBE_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
    "utubeApp/getRecommendedVideos",
    async (videoId: string, { getState }) => {
        const { utubeApp: { currentPlaying: { channelInfo: { id: channelId } } } } = getState() as RootState;

        const {
            data: { items },
        } = await axios.get(
            `${UTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
        );

        const parsedData: RecommendedVideos[] = await parseRecommendedData(
            items,
            videoId
        );

        return { parsedData };
    }
);