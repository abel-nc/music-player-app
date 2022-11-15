import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { BsFillVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import PlayPause from './PlayPause'

const SongBar = () => {

    const audioRef = useRef()
    const [volume, setVolume] = useState(0.5)
    const { activeSong, setActiveSong } = useGlobalContext()
    const { images, artists, title } = activeSong
    const songID = activeSong.key
    const [duration, setDuration] = useState('')
    const [currentTime, setCurrentTime] = useState('')
    
    useEffect(() => {
        handlePlayPause()
        getCurrentTime()
    }, [activeSong])

    useEffect(() => {
        const audio = audioRef.current
        audio.volume = volume
    }, [volume])
    
    const handlePlayPause = () => {
        const audio = audioRef.current
        if (activeSong.isPlaying) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    // CONVERT TIME
    const convertTime = (seconds) => {
        let minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        let second = seconds % 60;
        second = (second < 10)? '0' + second : second;
        return minute + ':' + second;
    }

    // GET CURRENT TIME
    const getCurrentTime = () => {
        if (!activeSong.isPlaying) return
        const audio = audioRef.current
        setCurrentTime(audio.currentTime)
        if (duration == NaN || duration == '') setDuration(audio.duration)
        setTimeout(() => {
            getCurrentTime()
        }, 100)
    }

    // HANDLE CHANGE
    const handleChange = (e) => {
        setCurrentTime(e.target.value)
        audioRef.current.currentTime = e.target.value
        setActiveSong({...activeSong, isPlaying: false})
        if (!activeSong.isPlaying) {
            setTimeout(() => {
                setActiveSong({...activeSong, isPlaying: true})
            }, 200)
        }
    }

    return (
        <div className='song-bar row'>
            {/* SONG INFO */}
            <div className='col col-md justify-self-start d-flex align-items-center ps-0'>
                <div className='song-bar-img' style={{ backgroundImage: `url(${images.coverart})` }}></div>
                <div>
                    <Link className='card-song font-primary'>
                        <h5 className="card-title d-inline">{title}</h5>
                    </Link>
                    <br />
                    {
                        artists.map(artist => {
                            const artistName = artist.alias.replace('-', ' ')
                            return (
                                <Link /* to={`/artists/${artist.adamid}`} */ className='card-artist text-decoration-none font-secondary' key={artist.adamid}>
                                    <h6 className="d-inline card-title">{artistName}<span className='me-1'>, </span> </h6>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            {/* AUDIO ELEMENT */}
            <audio 
                src={
                    activeSong.hub.actions
                    ? activeSong.hub.actions[1].uri
                    : activeSong.hub.options
                        ? activeSong.hub.options[0].actions[1].uri
                        : null
                }
                className='col-4'
                ref={audioRef}
                preload="metadata"
                loop
                >
            </audio>
            {/* MAIN CONTROLS */}
            <div className='col-12 col-md-5 col-lg-4 order-first order-md-0 mb-4 mb-md-0 d-flex flex-column align-items-center justify-content-center'>
                <div className='d-flex align-items-center font-primary mb-2'>
                    <button className='font-primary fs-2 bg-transparent border-0 p-0'
                            onClick={() => setActiveSong({...activeSong, isPlaying: !activeSong.isPlaying})}
                    >
                        <PlayPause songID={songID} />
                    </button>
                </div>
                <div className='d-flex align-items-center w-100 font-primary'>
                    <h6 className='time-num mb-0'>
                        {convertTime(Math.round(currentTime))}
                    </h6>
                    <input className='w-100 mx-3'
                        onChange={handleChange}
                        type="range"
                        value={currentTime}
                        max={duration}
                    />
                    <h6 className='time-num mb-0'>
                        {convertTime(Math.round(duration))}
                    </h6>
                </div>
            </div>
            {/* VOLUME CONTROLS */}
            <div className='col-auto col-md d-flex justify-self-start justify-md-self-end justify-content-end pe-0'>
                { volume == 0
                    ? <BsFillVolumeMuteFill
                    onClick={() => setVolume(0.5)}
                    className='volume-icon text-white me-2'
                    />
                    : <BsFillVolumeDownFill
                    onClick={() => setVolume(0)}
                    className='volume-icon text-white me-2'
                    />
                }
                <input onChange={(e) => setVolume(e.target.value / 100) }
                    className='volume-range'
                    type="range" 
                    min='0' 
                    max='100' 
                    value={volume * 100} 
                />
            </div>
        </div>
    )
}

export default SongBar