import React from 'react';
import { Play, Star, Clock, Calendar, ChevronRight } from 'lucide-react';

const MovieInfo = ({ movie }) => {
    return (
        <div className="movie-info-container">
            <div className="movie-poster-wrapper">
                <img
                    src={movie.posterUrl || movie.thumb_url}
                    alt={movie.title}
                    className="movie-poster-vertical"
                />
            </div>
            <div className="movie-info-content">
                <h1 className="movie-title-large">{movie.title}</h1>
                <h2 className="movie-title-original">{movie.originalTitle || movie.original_name}</h2>

                <div className="movie-meta-badges">
                    <span className="meta-badge imdb">HD</span>
                    <span className="meta-badge">{movie.year}</span>
                    <span className="meta-badge">{movie.part}</span>
                    <span className="meta-badge">{movie.episodeCount}</span>
                </div>

                <div className="movie-genre-list">
                    {movie.category && movie.category['2'] && movie.category['2'].list.map((item) => (
                        <button key={item.id} className="genre-tag">
                            {item.name}
                        </button>
                    ))}
                    {/* Add more genres dynamically if available */}
                </div>

                <div className="movie-status">
                    Đã chiếu: <span className="highlight-text">{movie.episodeCount}</span>
                </div>

                <div className="movie-description">
                    {movie.description || "Mô tả phim chưa cập nhật..."}
                </div>

                <a href="#info" className="more-info-link">Thông tin phim <ChevronRight size={14} /></a>
            </div>
        </div>
    );
};

export default MovieInfo;
