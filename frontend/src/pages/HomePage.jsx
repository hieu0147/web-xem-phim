import React, { useEffect, useState } from 'react';
import HeroSection from '../components/movies/HeroSection';
import MovieCard from '../components/movies/MovieCard';
import CategoryRow from '../components/movies/CategoryRow';
import { ChevronRight } from 'lucide-react';
import { fetchKoreanMovies, fetchChineseMovies, fetchWesternMovies } from '../services/api';
import './HomePage.css';

const HomePage = () => {
    const [koreanMovies, setKoreanMovies] = useState([]);
    const [chineseMovies, setChineseMovies] = useState([]);
    const [westernMovies, setWesternMovies] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const [kr, cn, us] = await Promise.all([
                fetchKoreanMovies(),
                fetchChineseMovies(),
                fetchWesternMovies()
            ]);
            setKoreanMovies(kr);
            setChineseMovies(cn);
            setWesternMovies(us);
        };
        loadData();
    }, []);

    return (
        <div id="wrapper" className="home-page">
            <HeroSection />

            <div className="fluid-gap">
                <CategoryRow />

                {/* Section: Phim Hàn Quốc */}
                {koreanMovies.length > 0 && (
                    <section className="movie-section horizontal">
                        <div className="section-header-side">
                            <div className="header-titles">
                                <h2 className="text-highlight">Phim Hàn Quốc mới</h2>
                                <a href="#" className="view-more-link">Xem toàn bộ <ChevronRight size={14} /></a>
                            </div>
                        </div>
                        <div className="cards-slider">
                            {koreanMovies.map(movie => (
                                <MovieCard key={`kr-${movie.slug}`} movie={movie} />
                            ))}
                            <button className="slider-next"><ChevronRight size={24} /></button>
                        </div>
                    </section>
                )}

                {/* Section: Phim Trung Quốc */}
                {chineseMovies.length > 0 && (
                    <section className="movie-section horizontal">
                        <div className="section-header-side">
                            <div className="header-titles">
                                <h2 className="text-highlight-yellow">Phim Trung Quốc mới</h2>
                                <a href="#" className="view-more-link">Xem toàn bộ <ChevronRight size={14} /></a>
                            </div>
                        </div>
                        <div className="cards-slider">
                            {chineseMovies.map(movie => (
                                <MovieCard key={`cn-${movie.slug}`} movie={movie} />
                            ))}
                            <button className="slider-next"><ChevronRight size={24} /></button>
                        </div>
                    </section>
                )}

                {/* Section: Phim Âu Mỹ */}
                {westernMovies.length > 0 && (
                    <section className="movie-section horizontal">
                        <div className="section-header-side">
                            <div className="header-titles">
                                <h2 className="text-highlight-pink">Phim Âu Mỹ Mới</h2>
                                <a href="#" className="view-more-link">Xem toàn bộ <ChevronRight size={14} /></a>
                            </div>
                        </div>
                        <div className="cards-slider">
                            {westernMovies.map(movie => (
                                <MovieCard key={`us-${movie.slug}`} movie={movie} />
                            ))}
                            <button className="slider-next"><ChevronRight size={24} /></button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default HomePage;
