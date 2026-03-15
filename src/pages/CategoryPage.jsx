import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Film, ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../components/movies/MovieCard';
import { fetchMoviesByCategory, CATEGORY_SLUGS } from '../services/api';
import './CategoryPage.css';

const defaultPaginate = {
    current_page: 1,
    total_page: 1,
    total_items: 0,
    items_per_page: 10,
};

const CategoryPage = () => {
    const { categorySlug } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState(defaultPaginate);
    const [pageInput, setPageInput] = useState('1');

    const title = CATEGORY_SLUGS[categorySlug] || categorySlug || 'Danh sách phim';
    const { current_page, total_page } = paginate;

    useEffect(() => {
        if (!categorySlug) return;
        setMovies([]);
        setPaginate(defaultPaginate);
        setPageInput('1');
        loadPage(categorySlug, 1);
    }, [categorySlug]);

    const loadPage = async (slug, page = 1) => {
        setLoading(true);
        try {
            const result = await fetchMoviesByCategory(slug, page);
            setMovies(result.items);
            setPaginate(result.paginate);
            setPageInput(String(result.paginate.current_page));
        } catch (error) {
            console.error('Category load error:', error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        const p = Number(page);
        if (p < 1 || p > total_page) return;
        loadPage(categorySlug, p);
    };

    const handlePageInputSubmit = (e) => {
        e.preventDefault();
        const p = parseInt(pageInput, 10);
        if (!Number.isNaN(p)) handlePageChange(p);
        else setPageInput(String(current_page));
    };

    return (
        <div className="category-page">
            <div className="category-content container">
                <div className="category-info">
                    <h2 className="category-title">{title}</h2>
                    {!loading && paginate.total_items > 0 && (
                        <p className="category-count">Có {paginate.total_items} phim</p>
                    )}
                </div>

                {loading && current_page === 1 ? (
                    <div className="category-loading">
                        <div className="loading-spinner"></div>
                        <p>Đang tải danh sách phim...</p>
                    </div>
                ) : (
                    <>
                        {movies.length > 0 ? (
                            <>
                                <div className="category-results-grid">
                                    {movies.map((movie) => (
                                        <div key={movie.slug} className="category-result-item">
                                            <MovieCard movie={movie} />
                                        </div>
                                    ))}
                                </div>
                                {total_page >= 1 && (
                                    <nav className="pagination-capsule" aria-label="Phân trang">
                                        <button
                                            type="button"
                                            className="pagination-arrow"
                                            onClick={() => handlePageChange(current_page - 1)}
                                            disabled={current_page <= 1 || loading}
                                            aria-label="Trang trước"
                                        >
                                            <ChevronLeft size={22} />
                                        </button>
                                        <div className="pagination-capsule-center">
                                            <span className="pagination-label">Trang</span>
                                            <form onSubmit={handlePageInputSubmit} className="pagination-form">
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={total_page}
                                                    className="pagination-input"
                                                    value={pageInput}
                                                    onChange={(e) => setPageInput(e.target.value)}
                                                    onBlur={handlePageInputSubmit}
                                                />
                                            </form>
                                            <span className="pagination-sep">/</span>
                                            <span className="pagination-total">{total_page}</span>
                                        </div>
                                        <button
                                            type="button"
                                            className="pagination-arrow"
                                            onClick={() => handlePageChange(current_page + 1)}
                                            disabled={current_page >= total_page || loading}
                                            aria-label="Trang sau"
                                        >
                                            <ChevronRight size={22} />
                                        </button>
                                    </nav>
                                )}
                            </>
                        ) : !loading ? (
                            <div className="no-results">
                                <Film size={48} className="no-results-icon" />
                                <h3>Chưa có phim nào</h3>
                                <p>Danh mục này đang cập nhật</p>
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
