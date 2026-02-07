import React, { useEffect, useState } from 'react';
import HeroSection from '../components/movies/HeroSection';
import CategoryRow from '../components/movies/CategoryRow';
import Top10Section from '../components/movies/Top10Section';
import MovieSlider from '../components/common/MovieSlider';
import { ChevronRight } from 'lucide-react';
import { fetchKoreanMovies, fetchChineseMovies, fetchVietnameseMovies } from '../services/api';
import './HomePage.css';
import MovieCard from '../components/movies/MovieCard';

const HomePage = () => {
    const [koreanMovies, setKoreanMovies] = useState([]);
    const [chineseMovies, setChineseMovies] = useState([]);
    const [vietnameseMovies, setVietnameseMovies] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const [kr, cn, us] = await Promise.all([
                fetchKoreanMovies(1),
                fetchChineseMovies(1),
                fetchVietnameseMovies(1)
            ]);
            setKoreanMovies(kr);
            setChineseMovies(cn);
            setVietnameseMovies(us);
        };
        loadData();
    }, []);

    return (
        <div id="wrapper" className="home-page">
            <HeroSection />

            <div className="fluid-gap">
                <CategoryRow />
                <div className="container">
                    {/* Section: Phim Hàn Quốc */}
                    {koreanMovies.length > 0 && (
                        <section className="movie-section horizontal">
                            <div className="section-header-side">
                                <div className="header-titles">
                                    <h2 className="text-highlight">Phim Hàn Quốc mới</h2>
                                    <a href="#" className="view-more-link">Xem toàn bộ <ChevronRight size={14} /></a>
                                </div>
                            </div>
                            <div className="slider-container-flex">
                                <MovieSlider movies={koreanMovies} />
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
                            <div className="slider-container-flex">
                                <MovieSlider movies={chineseMovies} />
                            </div>
                        </section>
                    )}

                    {/* Section: Phim Việt Nam */}
                    {vietnameseMovies.length > 0 && (
                        <section className="movie-section horizontal">
                            <div className="section-header-side">
                                <div className="header-titles">
                                    <h2 className="text-highlight-pink">Phim Việt Nam Mới</h2>
                                    <a href="#" className="view-more-link">Xem toàn bộ <ChevronRight size={14} /></a>
                                </div>
                            </div>
                            <div className="slider-container-flex">
                                <MovieSlider movies={vietnameseMovies} />
                            </div>
                        </section>
                    )}
                </div>
                <Top10Section movies={vietnameseMovies} />
                {/* <MovieSlider movies={vietnameseMovies} /> */}
            </div>
        </div>
    );
};

export default HomePage;
