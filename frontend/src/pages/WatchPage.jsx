import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Star, Calendar, Clock, Share2, ThumbsUp } from 'lucide-react';
import MovieCard from '../components/movies/MovieCard';
import './WatchPage.css';

// Mock Data for Demo
const MOCK_RELATED = [
    { id: 2, title: 'Dune: Part Two', year: '2024', quality: 'Cam', duration: '2h 46m', episode: 'Full', posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop' },
    { id: 3, title: 'Kung Fu Panda 4', year: '2024', quality: 'FHD', duration: '1h 34m', episode: 'Full', posterUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=300&auto=format&fit=crop' },
    { id: 4, title: 'Oppenheimer', year: '2023', quality: 'Bluray', duration: '3h 00m', episode: 'Full', posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=300&auto=format&fit=crop' },
    { id: 5, title: 'Avatar 2', year: '2022', quality: '3D', duration: '3h 12m', episode: 'Full', posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop' },
];

const WatchPage = () => {
    const { id } = useParams();
    const [server, setServer] = useState(1);

    return (
        <div className="watch-page container">
            <div className="watch-content">
                <div className="player-wrapper">
                    <div className="player-container">
                        {/* Mock Player */}
                        <div className="video-placeholder">
                            <Play size={64} fill="currentColor" />
                            <p>Đang tải phim... Server {server}</p>
                        </div>
                    </div>
                    <div className="server-list">
                        <span>Server:</span>
                        <button className={`server-btn ${server === 1 ? 'active' : ''}`} onClick={() => setServer(1)}>VIP 1</button>
                        <button className={`server-btn ${server === 2 ? 'active' : ''}`} onClick={() => setServer(2)}>VIP 2</button>
                        <button className={`server-btn ${server === 3 ? 'active' : ''}`} onClick={() => setServer(3)}>Dự Phòng</button>
                    </div>
                </div>

                <div className="movie-details">
                    <h1 className="movie-title">Godzilla x Kong: The New Empire</h1>
                    <div className="movie-meta">
                        <span className="meta-item"><Calendar size={16} /> 2024</span>
                        <span className="meta-item"><Clock size={16} /> 1h 55m</span>
                        <span className="meta-item rating"><Star size={16} fill="currentColor" /> 8.5</span>
                        <span className="quality-badge">4K HDR</span>
                    </div>

                    <div className="action-buttons">
                        <button className="action-btn"><ThumbsUp size={18} /> Thích</button>
                        <button className="action-btn"><Share2 size={18} /> Chia sẻ</button>
                    </div>

                    <div className="movie-synopsis">
                        <h3>Nội Dung:</h3>
                        <p>
                            Hai chúa tể Godzilla và Kong buộc phải bỏ qua mâu thuẫn để hợp sức chống lại một mối đe dọa mới ẩn sâu trong lòng Trái Đất, đe dọa sự tồn vong của cả hai loài và nhân loại.
                            Phim hứa hẹn mang đến những trận chiến mãn nhãn và kỹ xảo đỉnh cao.
                        </p>
                    </div>
                </div>

                <div className="comments-section">
                    <h3>Bình Luận</h3>
                    <div className="comment-box">
                        <p>Chức năng bình luận đang bảo trì...</p>
                    </div>
                </div>
            </div>

            <div className="sidebar">
                <h3>Phim Liên Quan</h3>
                <div className="related-grid">
                    {MOCK_RELATED.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
