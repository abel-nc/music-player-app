import React, { useContext, useState } from "react";

export const baseUrl = 'https://shazam-core.p.rapidapi.com/v1'
export const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e1aa86e935msh105a0a10e2a755ep16cb7bjsn1c5345d83634',
		'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
	}
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [songs, setSongs] = useState([])
    const [activeSong, setActiveSong] = useState({ isPlaying: false })
    const [isError, setIsError] = useState(false)
    const [query, setQuery] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // FETCH DATA
    const fetchData = async (endpoint) => {
        setSongs([])
	setIsError(false)
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, options)
            const result = await response.json()
            setSongs(result)
        } catch {
            setIsError(true)
        } 
    }

    // SELECT SONG
    const selectSong = async (id) => {
        try {   
            const response = await fetch(`${baseUrl}/tracks/details?track_id=${id}`, options)
            const selectedSong = await response.json()
            setActiveSong({...selectedSong, isPlaying: true})
        } catch (e) {
            console.log(e)
            setIsError(true)
        }
    }

    const value = {
        fetchData,
        songs,
        setSongs,
        selectSong,
        activeSong,
        setActiveSong,
        isError,
        setIsError,
        query,
        setQuery,
        isSidebarOpen,
        setIsSidebarOpen,
    }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

// CUSTOM HOOK
const useGlobalContext = () => {
    return useContext(AppContext)
}

export { useGlobalContext, AppProvider }
