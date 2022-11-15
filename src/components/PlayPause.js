import React from 'react'
import { useGlobalContext } from '../context'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import { BsFillPauseCircleFill } from 'react-icons/bs'

const PlayPause = ({ songID }) => {
    const { activeSong } = useGlobalContext()

    return (
        <>
            { activeSong.isPlaying && activeSong.key == songID
                ? <BsFillPauseCircleFill className='play-icon' />
                : <BsFillPlayCircleFill className='play-icon' />
            }
        </>
    )
}

export default PlayPause