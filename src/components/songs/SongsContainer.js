import React from 'react'
import { useGlobalContext } from '../../context'
import Error from '../Error'
import Loader from '../Loader'
import SongCard from './SongCard'

const SongsContainer = () => {
    const { songs, isError } = useGlobalContext()

    return (
        <>
            { songs.length > 0 
                ? <div className='songs-ct'>
                {
                    songs.map(song => <SongCard 
                        key={song.key}
                        id={song.key}
                        title={song.title}
                        artists={song.artists}
                        cover={song.images.coverart}
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