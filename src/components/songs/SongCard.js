import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import PlayPause from '../PlayPause'

const SongCard = (props) => {
    const { title, artists, cover, id, subtitle, artistID } = props
    const { selectSong, activeSong, setActiveSong } = useGlobalContext()
    
    const handleClick = () => {
        if (activeSong.key !== id) {
            selectSong(id)
        } else {
            const isPlaying = activeSong.isPlaying
            setActiveSong({ ...activeSong, isPlaying: !isPlaying })
        }
    }

    return (
        <div className="song-card p-3 rounded">
            <div onClick={handleClick} className={activeSong.key == id ? 'active card-img w-100' : 'card-img w-100'} 
                style={{ backgroundImage: `url(${cover})` }}
            >   
                <PlayPause songID={id} />
            </div>
            <div className="card-body pt-3">
                <Link to={`/songs/${id}`} className='card-song font-primary'>
                    <h5 className="card-title d-inline">{title}</h5>
                </Link>
                <br />
                {
                    artists?.map(artist => {
                        const artistName = artist.alias.replace('-', ' ')
                        return (
                            <Link to={`/artists/${artist.adamid}`} 
                                className='card-artist text-decoration-none font-secondary' 
                                key={artist.adamid}
                            >
                                <h6 className="d-inline card-title">{artistName}<span className='me-1'>, </span> </h6>
                            </Link>
                        )
                    })
                }
                {
                    subtitle 
                    ? <Link to={`/artists/${artistID}`} 
                        className='card-artist text-decoration-none font-secondary'
                    >
                        <h6 className="d-inline card-title">{subtitle}<span className='me-1'>, </span> </h6>
                    </Link>
                    : null
                }
            </div>
        </div>
    )
}

export default SongCard