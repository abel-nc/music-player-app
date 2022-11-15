import React from 'react'
import Logo from './Logo'
import { links } from '../assets/constants'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { FaTimes } from 'react-icons/fa'

const Sidebar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useGlobalContext()

    const NavLinks = () => {
        return (
            <div className='s-links d-flex flex-column'>
                {
                    links.map(link => {
                        return <NavLink to={link.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className='link d-flex align-items-center text-white-50 text-decoration-none fs-5 mb-4' 
                                key={link.name}>
                            <link.icon className='me-2' />
                            {link.name}   
                        </NavLink>
                    }) 
                }
            </div>
        )
    }

    return (
        <div className={`${isSidebarOpen ? 'show-sidebar' : ''} sidebar d-flex flex-column text-white py-5`}>
            <Logo />
            <NavLinks />
            <FaTimes onClick={() => setIsSidebarOpen(false)} className='menu-icon close-icon fs-2 font-primary ms-3 col-auto c-pointer' />
        </div>
    )
}

export default Sidebar