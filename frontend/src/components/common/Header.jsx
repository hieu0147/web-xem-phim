import React, { useState, useEffect } from 'react';
import { Search, Menu, User } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    return (
        <header className={`fly ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-elements container-fluid">
                {/* Mobile Toggles */}
                <div className="for-mobile menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu size={24} />
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
                    <form className="search-elements" action="/tim-kiem">
                        <div className="search-icon">
                            <Search size={18} />
                        </div>
                        <input id="main-search" className="search-input" placeholder="Tìm kiếm phim, diễn viên" autoComplete="off" name="q" />
                    </form>
                </div>

                <div id="main_menu" className={isMobileMenuOpen ? 'open' : ''}>
                    <nav>
                        <a href="/">Phim Mới</a>
                        <a href="#">Phim Bộ</a>
                        <a href="#">Phim Lẻ</a>
                        <a href="#">Quốc Gia</a>
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="el-group">
                    {/* <div id="main_menu" className={isMobileMenuOpen ? 'open' : ''}>
                        <nav>
                            <a href="/">Phim Mới</a>
                            <a href="#">Phim Bộ</a>
                            <a href="#">Phim Lẻ</a>
                            <a href="#">Quốc Gia</a>
                        </nav>
                    </div> */}

                    <div id="main_user">
                        <button aria-label="Đăng nhập" className="button-user button-login">
                            <div className="line-center">
                                <User size={16} className="ms-1" />
                                <span>Thành viên</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
