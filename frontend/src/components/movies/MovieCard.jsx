import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    // Map API fields to UI
    const imageUrl = movie.poster_url || movie.thumb_url; // Use poster if available for better quality, or thumb
    // Note: API returns thumb_url (horizontal?) and poster_url (vertical?). 
    // If we want landscape cards, check which one is suitable.
    // Actually, usually thumb_url is 16:9 in many systems. Let's try poster_url first as the previous mock used vertical, 
    // BUT the user asked for LANDSCAPE "Giong hinh" update. 
    // Let's assume thumb_url is the landscape one suitable for the horizontal slider. 
    // However, inspecting the API sample: "thumb_url": ".../chuyen-nha-cha.jpg", "poster_url": ".../chuyen-nha-cha-1.jpg"
    // Let's prioritize thumb_url for landscape cards.
    const displayImage = movie.thumb_url;

    return (
        <div className="movie-card landscape">
            <Link to={`/watch/${movie.slug}`}>
                <div className="card-image">
                    <img src={displayImage} alt={movie.name} loading="lazy" onError={(e) => e.target.src = 'https://via.placeholder.com/300x169?text=No+Image'} />
                    <div className="card-overlay">
                        <button className="play-btn-mini">
                            <Play size={16} fill="currentColor" />
                        </button>
                        {/* Badge Logic */}
                        <span className={`card-badge ${movie.language.includes('Vietsub') ? 'tm' : 'pd'}`}>
                            {movie.language}
                        </span>
                        <span className="card-episode-badge">
                            {movie.current_episode}
                        </span>
                    </div>
                </div>
                <div className="card-info">
                    <h3 className="card-title">{movie.name}</h3>
                    <p className="card-subtitle">{movie.original_name} ({movie.created ? movie.created.substring(0, 4) : ''})</p>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
