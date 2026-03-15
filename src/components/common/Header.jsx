import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <header className={`fly ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-elements container-fluid">
                {/* Mobile Toggles */}
                <div className={`for-mobile menu-toggle ${isMobileMenuOpen ? 'menu-open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                {/* Logo */}
                <a id="logo" title="ThungPhim" href="/">
                    <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
                        <span style={{ color: 'yellow' }}>Thùng</span>
                        <span style={{ color: 'white' }}>Phim</span>
                    </span>
                </a>

                {/* Search */}
                <div id="search">
                    <form className="search-elements" onSubmit={handleSearch}>
                        <div className="search-icon">
                            <Search size={18} />
                        </div>
                        <input 
                            id="main-search" 
                            className="search-input" 
                            placeholder="Tìm kiếm phim, diễn viên" 
                            autoComplete="off" 
                            name="q" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                <div id="main_menu" className={isMobileMenuOpen ? 'open' : ''}>
                    <nav>
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Phim Mới</Link>
                        <Link to="/danh-sach/tv-shows" onClick={() => setIsMobileMenuOpen(false)}>TV Shows</Link>
                        <Link to="/danh-sach/phim-bo" onClick={() => setIsMobileMenuOpen(false)}>Phim Bộ</Link>
                        <Link to="/danh-sach/phim-le" onClick={() => setIsMobileMenuOpen(false)}>Phim Lẻ</Link>
                        <a href="#">Quốc Gia</a>
                        <a href="#">Thể Loại</a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
