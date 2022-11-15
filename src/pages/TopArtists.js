import React, { useEffect } from 'react'
import ArtistCard from '../components/ArtistCard'
import Error from '../components/Error'
import Loader from '../components/Loader'
import SongsContainer from '../components/songs/SongsContainer'
import { useGlobalContext } from '../context'

const TopArtists = () => {
    const { fetchData, setSongs, songs, isError } = useGlobalContext()

    useEffect(() => {
        setSongs([])
        fetchData('/charts/world')
    }, [])

    return (
        <section className='w-100'>
            <h2 className='text-white mb-5'>Top Artists</h2>
            
                { songs.length > 0
                    ? <div className='songs-ct w-100'> 
                        {
                            songs.map(song => <ArtistCard
                                key={song.key}
                                id={song.artists[0].adamid}
                                name={song.artists[0].alias}
                                cover={song.images.background}
                            />)
                        }
                    </div> 
                    : isError
                        ? <Error />
                        : <Loader />
                }
        </section>
    )
}

export default TopArtists