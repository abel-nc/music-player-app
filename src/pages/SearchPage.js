import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ArtistCard from '../components/ArtistCard'
import Error from '../components/Error'
import Loader from '../components/Loader'
import SongCard from '../components/songs/SongCard'
import SongsContainer from '../components/songs/SongsContainer'
import { useGlobalContext } from '../context'
import { baseUrl, options } from '../context'

const SearchPage = () => {
    const { isError, setIsError } = useGlobalContext()
    const [results, setResults] = useState([])
    const { query } = useParams()

    useEffect(() => {
        setResults([])
        setIsError(false)
        fetchSearch()
    }, [query])

    const fetchSearch = async () => {
        try {
            const response = await fetch(`${baseUrl}/search/multi?query=${query}&search_type=SONGS_ARTISTS`, options)
            const result = await response.json()
            setResults(result)
            console.log(result)
        } catch (e) {
            console.log(e)
            setIsError(true)
        }
    }

    if (results.length == 0) {
        if (isError) {
            return <Error />
        } else {
            return <Loader /> 
        }
    } else if (results.detail == 'Object not found') {
        return <h2 className='text-white mb-5'>No results found for '{query}'</h2>
    }
    return (
        <section className='w-100 mb-5'>
            <h2 className='text-white mb-5'>Showing results for '{query}'</h2>
            {/* SONGS */}
            <h4 className='text-white mb-3 text-center'>Songs</h4>
            <div className='songs-ct mb-5'>
                {
                    results.tracks.hits.map(song => <SongCard 
                        key={song.track.key}
                        id={song.track.key}
                        title={song.track.title}
                        cover={song.track.images.coverart}
                        subtitle={song.track.subtitle}
                        artistID={song.track.artists[0].adamid}
                    />)
                }
            </div>
            {/* ARTISTS */}
            <h4 className='text-white mb-3 text-center'>Artists</h4>
            <div className='songs-ct'>
                {
                    results.artists.hits.map(artist => <ArtistCard
                        key={artist.artist.adamid}
                        id={artist.artist.adamid}
                        name={artist.artist.name}
                        cover={artist.artist.avatar}
                    />)
                }
            </div>
        </section>
    )
}

export default SearchPage
