import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ArtistCard = ({ cover, id, name }) => {
    const navigate = useNavigate()

    if (!cover) return 
    return (
        <div onClick={() => navigate(`/artists/${id}`)} className="artist-card song-card p-3 rounded">
            <div className='card-img w-100'
                style={{ backgroundImage: `url(${cover})` }}>    
            </div>
            <div className="card-body pt-3">
                <Link to={`/artists/${id}`}  
                    className='card-song font-primary' 
                >
                    <h5 className="card-title d-inline text-capitalize">
                        {name.replace('-', ' ')}
                    </h5>
                </Link>               
            </div>
        </div>
    )
}

export default ArtistCard