import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SearchCard from '../components/SearchCard'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import { clearVideos } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos'
import { HomePageVideos } from '../Types'

const Search = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.utubeApp.videos);
    const searchTerm = useAppSelector((state) => state.utubeApp.searchTerm);

    useEffect(() => {
        dispatch(clearVideos());
        if (searchTerm === "") {
            navigate("/");
        }
        else {
            dispatch(getSearchPageVideos(false));
        }
    }, [dispatch, navigate, searchTerm]);


    return (
        <div className='max-h-screen overflow-hidden'>
            <div>
                <Navbar />
            </div>
            <div className='flex h-screen'>
                <div className='w-60'>
                    <Sidebar />
                </div>
                <div className='w-full h-screen'>
                    {videos.length ? (
                        <div className='py-8 pl-8 flex flex-col gap-5 w-full'>

                            <InfiniteScroll dataLength={videos.length}
                                next={() => dispatch(getSearchPageVideos(true))}
                                hasMore={videos.length < 500}
                                loader={<Spinner />}
                                height={window.screen.height}
                            >
                                <div className='my-5'>
                                    {videos.map((video: HomePageVideos, key: number) => {
                                        return (
                                            <SearchCard data={video} key={key} />
                                        )
                                    })}
                                </div>
                            </InfiniteScroll>
                        </div>
                    )
                        :
                        <Spinner />
                    }
                </div>
            </div>
        </div>
    )
}

export default Search