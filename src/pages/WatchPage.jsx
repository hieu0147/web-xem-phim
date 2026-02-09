import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, MessageCircle, Star, Calendar } from 'lucide-react';
import MovieCard from '../components/movies/MovieCard';
import MovieInfo from '../components/movies/MovieInfo';
import CastSection from '../components/movies/CastSection';
import EpisodeList from '../components/movies/EpisodeList';
import { fetchFilmDetail } from '../services/api';
import './WatchPage.css';

const WatchPage = () => {
    const { slug } = useParams(); // Use slug instead of id
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null); // Slug for highlighting
    const [currentEmbedUrl, setCurrentEmbedUrl] = useState(''); // Direct URL for iframe
    const playerRef = useRef(null);

    // Handle episode selection
    const handleEpisodeSelect = (episode) => {
        if (!episode) return;
        setCurrentEpisode(episode.slug);
        setCurrentEmbedUrl(episode.embed);

        // Scroll to player
        if (playerRef.current) {
            playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    useEffect(() => {
        const loadMovie = async () => {
            if (!slug) return;
            const data = await fetchFilmDetail(slug);
            if (data && data.movie) {
                const apiMovie = data.movie;
                setMovie({
                    title: apiMovie.name,
                    originalTitle: apiMovie.original_name,
                    year: apiMovie.created ? apiMovie.created.substring(0, 4) : '2024',
                    imdb: '0.0', // API doesn't seem to have imdb in the sample
                    part: 'Phần 1', // Static or derived if available
                    episodeCount: apiMovie.current_episode,
                    description: apiMovie.description,
                    posterUrl: apiMovie.poster_url,
                    thumb_url: apiMovie.thumb_url,
                    cast: apiMovie.casts,
                    episodes: apiMovie.episodes,
                    category: apiMovie.category
                });

                // Auto-select first episode
                if (apiMovie.episodes && apiMovie.episodes.length > 0 && apiMovie.episodes[0].items.length > 0) {
                    const firstEp = apiMovie.episodes[0].items[0];
                    setCurrentEpisode(firstEp.slug);
                    setCurrentEmbedUrl(firstEp.embed);
                }
            }
        };
        loadMovie();
    }, [slug]);

    if (!movie) return <div className="loading">Loading...</div>;

    // Helper name for display
    const currentEpisodeName = movie?.episodes?.flatMap(server => server.items).find(ep => ep.slug === currentEpisode)?.name;

    return (
        <div className="watch-page-container">
            <div className="watch-body container">
                <div className="watch-header">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <ChevronLeft size={20} />
                        <span>{movie.title} - {currentEpisodeName ? `Tập ${currentEpisodeName}` : ''}</span>
                    </button>
                </div>

                <div className="player-wrapper-large" ref={playerRef}>
                    {currentEmbedUrl ? (
                        <iframe
                            title={`Xem phim ${movie.title}`}
                            src={currentEmbedUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    ) : (
                        <div className="video-player-placeholder">
                            <div className="play-icon-bg">
                                <p>Đang tải hoặc không tìm thấy tập phim...</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="content-grid">
                    {/* Left Column: Info, Episodes, Comments */}
                    <div className="main-column">
                        <section className="info-block">
                            <MovieInfo movie={movie} />
                        </section>

                        <section className="episode-block">
                            {/* <div className="section-header-simple">
                                <h3>Phần 1</h3>
                            </div> */}
                            <EpisodeList
                                episodes={movie.episodes}
                                currentEpisode={currentEpisode}
                                onEpisodeSelect={handleEpisodeSelect}
                            />
                        </section>

                        <section className="comments-block">
                            <div className="comments-header">
                                <div className="tabs">
                                    <button className="tab-btn active">Bình luận (5)</button>
                                    <button className="tab-btn">Đánh giá</button>
                                    <button className="tab-btn">Lịch chiếu</button>
                                </div>
                            </div>
                            <div className="login-prompt">
                                Vui lòng <span className="highlight-link">đăng nhập</span> để tham gia bình luận.
                            </div>
                            <div className="comment-input-area">
                                <textarea
                                    className="comment-textarea"
                                    placeholder="Viết bình luận hoặc gõ /lichchieu để đóng góp lịch chiếu"
                                >
                                </textarea>
                                <div className="comment-tools">
                                    <label className="spoiler-toggle">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                        <span className="label-text">Tiết lộ?</span>
                                    </label>
                                    <button className="send-btn">
                                        Gửi <Play size={12} fill="currentColor" className="rotate-icon" />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Actions, Cast, Related */}
                    <div className="sidebar-column">
                        <div className="action-stats">
                            <div className="stat-item">
                                <Star size={18} />
                                <span>Đánh giá</span>
                            </div>
                            <div className="stat-item">
                                <MessageCircle size={18} />
                                <span>Bình luận</span>
                            </div>
                            <button className="rating-btn-blue">
                                <Star size={14} fill="currentColor" />
                                9.4 Đánh giá
                            </button>
                        </div>

                        <CastSection cast={movie.cast} />

                        {/* Related Movies could go here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
