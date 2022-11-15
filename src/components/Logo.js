import React from 'react'
import { SiMusicbrainz } from 'react-icons/si'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Logo = () => {
    const { setIsSidebarOpen } = useGlobalContext()

    return <NavLink to='/' className='logo d-flex align-items-start' onClick={() => setIsSidebarOpen(false)}>
        <SiMusicbrainz />
    </NavLink> 
}

export default Logo