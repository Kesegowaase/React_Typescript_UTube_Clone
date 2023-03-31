import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import { clearVideos } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'
import { HomePageVideos } from '../Types'

const Home = () => {
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.utubeApp.videos);

    useEffect(() => {
        return () => {
            dispatch(clearVideos())
        }
    }, [dispatch])


    useEffect(() => {
        dispatch(getHomePageVideos(false))

    }, [dispatch]);


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
                        <InfiniteScroll dataLength={videos.length}
                            next={() => dispatch(getHomePageVideos(true))}
                            hasMore={videos.length < 500}
                            loader={<Spinner />}
                            height={window.screen.height}
                        >
                            <div className='grid gap-y-14 gap-x-8 grid-cols-4 p-8'>
                                {videos.map((video: HomePageVideos, key: number) => {
                                    return (
                                        <Card data={video} key={key} />
                                    )
                                })}
                            </div>
                        </InfiniteScroll>
                    )
                        :
                        <Spinner />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home