import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { useGlobalContext } from '../context'
import { FaBars } from 'react-icons/fa'

const Searcher = () => {
    const { query, setQuery, setIsSidebarOpen } = useGlobalContext()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.length == 0) return navigate('/')
        navigate(`/search/${query}`)
    }

    return (
        <form onSubmit={handleSubmit} className='searcher justify-content-between d-flex mb-5 pt-3 fs-5'>
            <div className='d-flex col'>
                <button className='d-flex align-items-center pe-4 text-white fw-bold bg-transparent border-0 cursor-normal'>
                    <BsSearch />
                </button>
                <input onChange={handleChange} value={query} className='text-white bg-transparent border-0 outline-0' type="text" placeholder='Search...' />
            </div>
            <FaBars onClick={() => setIsSidebarOpen(true)} className='menu-icon fs-2 font-primary ms-3 col-auto c-pointer' />
        </form>
    )
}

export default Searcher