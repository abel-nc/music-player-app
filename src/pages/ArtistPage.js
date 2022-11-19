import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ArtistPageSong from '../components/ArtistPageSong'
import Loader from '../components/Loader'
import { baseUrl, options } from '../context'

const ArtistPage = () => {
    const { id } = useParams()
    const [artist, setArtist] = useState([])

    useEffect(() => {
        setArtist([])
        fetchArtistData()
    }, [])

    // GET ARTIST DATA
    const fetchArtistData = async () => {
        try {
            const response = await fetch(`${baseUrl}/artists/details?artist_id=${id}`, options)
            const result = await response.json()
            setArtist(result)
        } catch (e) {
            console.log(e)
        }
    }

    if (artist.length == 0 || artist == undefined) {
        return <Loader />
    }
    return (
        <section className='artist-page w-100 font-primary mb-4'>
            <div className='d-flex align-items-center mb-5'>
                <div className='artist-img me-3' 
                    style={{ backgroundImage: `url(${artist.artists[id].attributes.artwork?.url})` }}>
                </div>
                <div>
                    <h3 className='mb-1'>{artist.artists[id].attributes.name}</h3>
                    {
                        artist.artists[id].attributes.genreNames.map((genre, index) => {
                            return <h6 className='genre font-secondary' key={index}>{genre}<span>/</span></h6>
                        } )
                    }
                </div>
            </div>
            <div className='d-flex flex-column'>
                <h3 className='mb-4'>Related Songs:</h3>
                <div className='artist-songs-ct'>
                    {
                        Object.values(artist.songs).map((song, index) => <ArtistPageSong
                            song={song}
                            key={song.id}
                            id={song.id}
                            number={index + 1}
                            cover={song.attributes.artwork.url}
                            album={song.attributes.albumName}
                            name={song.attributes.name}
                        />)
                    }
                </div>
            </div>
        </section>
    )
}

export default ArtistPage
