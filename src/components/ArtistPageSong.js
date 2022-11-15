import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PlayPause from './PlayPause'
import { options, baseUrl, useGlobalContext } from '../context'

const ArtistPageSong = ({ number, cover, name, album, id }) => {
    const { activeSong, setActiveSong, selectSong } = useGlobalContext()
    const [searchID, setSearchID] = useState('')
    const navigate = useNavigate()

    const handleClick = async () => {
        if (activeSong.key !== searchID) {
            const newID = await fetchNewID()
            selectSong(newID)
        } else {
            const isPlaying = activeSong.isPlaying
            setActiveSong({ ...activeSong, isPlaying: !isPlaying })
        }
    }

    // FETCH NEW ID
    const fetchNewID = async () => {
        try {
            const response = await fetch(`https://shazam-core.p.rapidapi.com/v2/tracks/details?track_id=${id}`, options)
            const result = await response.json()
            const newID = Object.values(result.resources['shazam-songs'])[0].id
            setSearchID(newID)
            return newID
        }
        catch (e) {
            console.log(e)
        }
    }

    // HANDLE LINK CLICK
    const handleLinkClick = async () => {
        const newID = await fetchNewID()
        navigate(`/songs/${newID}`)
    }

    return (
        <div className='card-song w-100 mb-3 d-flex font-primary align-items-center p-0'>
            <h6 className='number mb-0'>{number}.</h6>
            <div className='d-flex align-items-center'>
                <div className={`${activeSong.key == searchID && searchID.length > 0  
                        ? 'active' 
                        : ''} song-img rounded me-3 d-flex align-items-center justify-content-center`}
                    onClick={handleClick}
                    style={{ backgroundImage: `url(${cover})` }}
                >
                    <PlayPause songID={searchID} />
                </div>
                <div>
                    <Link onClick={handleLinkClick} className='font-primary text-decoration-none'>
                        <h5>{name}</h5>
                    </Link>
                    <h6 className='font-secondary mb-0'>{album}</h6>
                </div>
            </div>
        </div>
    )
}

export default ArtistPageSong