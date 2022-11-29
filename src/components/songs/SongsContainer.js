import React from 'react'
import { useGlobalContext } from '../../context'
import Error from '../Error'
import Loader from '../Loader'
import SongCard from './SongCard'

const SongsContainer = () => {
    const { songs, isError } = useGlobalContext()

    if (isError) {
        return <h2 className='text-center text-white'>Something went wrong. Please try again later.</h2>
    }
    return (
        <>
            { songs.length > 0 
                ? <div className='songs-ct'>
                {
                    songs?.map(song => <SongCard 
                        key={song.key}
                        id={song.key}
                        title={song.title}
                        artists={song.artists}
                        cover={song?.images?.coverart}
                    />)
                }
                </div>
                : isError
                    ? <Error />
                    : <Loader /> 
            }
        </>
    )
}

export default SongsContainer
