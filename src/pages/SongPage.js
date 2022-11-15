import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import PlayPause from '../components/PlayPause'
import { baseUrl, options, useGlobalContext } from '../context'

const SongPage = () => {
    const { selectSong, setActiveSong, activeSong } = useGlobalContext()
    const { id } = useParams()
    const [song, setSong] = useState([])

    useEffect(() => {
        setSong([])
        fetchSong()
    }, [])
    
    // FETCH SONG DATA
    const fetchSong = async () => {
        try {   
            const response = await fetch(`${baseUrl}/tracks/details?track_id=${id}`, options)
            const result = await response.json()
            setSong(result)
        } catch (e) {
            console.log(e)
        }
    }

    // SELECT SONG 
    const handleClick = async () => {
        if (activeSong.key !== id) {
            try {   
                const response = await fetch(`${baseUrl}/tracks/details?track_id=${id}`, options)
                const song = await response.json()
                setActiveSong({...song, isPlaying: true})
            } catch (e) {
                console.log(e)
            }
        } else {
            const isPlaying = activeSong.isPlaying
            setActiveSong({ ...activeSong, isPlaying: !isPlaying })
        }
    }

    if (song.length == 0 || song == undefined) {
        return <Loader />
    }
    return (
        <section className='song-page artist-page w-100 font-primary mb-5'>
            <div className='d-flex align-items-center mb-5'>
                <div className={`${activeSong.key == id ? 'active' : ''} song-img artist-img me-3 d-flex align-items-center justify-content-center`}
                    onClick={handleClick}
                    style={{ backgroundImage: `url(${song.images.coverart})` }}
                >
                    <PlayPause songID={id} />
                </div>
                <div>
                    <h3 className='mb-2'>{song.title}</h3>
                    {
                        song.artists.map((artist) => {
                            return (
                                <Link to={`/artists/${artist.adamid}`} className='link genre font-secondary text-decoration-none' key={artist.adamid}>
                                    <h6 className='font-secondary d-inline text-capitalize' >
                                        {artist.alias}<span>, </span>
                                    </h6>
                                </Link>
                            )
                        } )
                    }
                    {
                        Object.values(song.genres).map((genre, index) => {
                            return <h6 className='genre font-secondary mt-2' key={index}>{genre}<span>/</span></h6>
                        } )
                    }
                </div>
            </div>
            <h3 className='mb-3'>Lyrics: </h3>
            {
                song.sections[1].text 
                ? song.sections[1].text.map((verse, index) => <h6 className='font-secondary' key={index}>{verse}</h6>)
                : <h6 className='font-secondary'>No lyrics to display.</h6>
            }
        </section>
    )
}

export default SongPage