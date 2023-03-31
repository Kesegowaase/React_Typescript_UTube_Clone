import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '..';
import { HomePageVideos } from '../../Types';
import { parseData } from '../../utils';
import { UTUBE_API_URL } from '../../utils/constants';


const API_KEY = process.env.REACT_APP_UTUBE_API_KEY;

export const getSearchPageVideos = createAsyncThunk("utubeApp/searchPageVideos", async (next: boolean, { getState }) => {
    const {
        utubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm }
    } = getState() as RootState;

    const {
        data: { items, nextPageToken }
    } = await axios.get(`${UTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video${next && `&pageToken=${nextPageTokenFromState}`}`);
    const parsedData: HomePageVideos[] = await parseData(items);
    return { parsedData: [...videos, ...parsedData], nextPageToken }
});