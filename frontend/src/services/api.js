const API_BASE = 'https://phim.nguonc.com/api/films';
const API_FILM = 'https://phim.nguonc.com/api/film';

/* ----- Tìm kiếm phim ----- */
export const searchFilms = async (keyword, page = 1) => {
    try {
        const response = await fetch(`${API_BASE}/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);
        const data = await response.json();
        if (data.status === 'success') {
            return data.items || [];
        }
        return [];
    } catch (error) {
        console.error('Error searching films:', error);
        return [];
    }
};

/* ----- Phim theo thể loại ----- */
export const fetchMoviesByGenre = async (genreSlug, page = 1) => {
    try {
        const response = await fetch(`${API_BASE}/the-loai/${genreSlug}?page=${page}`);
        const data = await response.json();
        if (data.status === 'success') {
            return data.items || [];
        }
        return [];
    } catch (error) {
        console.error(`Error fetching genre ${genreSlug}:`, error);
        return [];
    }
};

/** Thể loại (tên → slug thường dùng): Hành Động, Phiêu Lưu, Hoạt Hình, Hài, Hình Sự, Tài Liệu, Chính Kịch, Gia Đình, Giả Tưởng, Lịch Sử, Kinh Dị, Nhạc, Bí Ẩn, Lãng Mạn, Khoa Học Viễn Tưởng, Gây Cấn, Chiến Tranh, Tâm Lý, Tình Cảm, Cổ Trang, Miền Tây */
export const GENRE_SLUGS = {
    'hanh-dong': 'Hành Động',
    'phieu-luu': 'Phiêu Lưu',
    'hoat-hinh': 'Hoạt Hình',
    'hai': 'Hài',
    'hinh-su': 'Hình Sự',
    'tai-lieu': 'Tài Liệu',
    'chinh-kich': 'Chính Kịch',
    'gia-dinh': 'Gia Đình',
    'gia-tuong': 'Giả Tưởng',
    'lich-su': 'Lịch Sử',
    'kinh-di': 'Kinh Dị',
    'nhac': 'Nhạc',
    'bi-an': 'Bí Ẩn',
    'lang-man': 'Lãng Mạn',
    'khoa-hoc-vien-tuong': 'Khoa Học Viễn Tưởng',
    'gay-can': 'Gây Cấn',
    'chien-tranh': 'Chiến Tranh',
    'tam-ly': 'Tâm Lý',
    'tinh-cam': 'Tình Cảm',
    'co-trang': 'Cổ Trang',
    'mien-tay': 'Miền Tây',
};

/* ----- Phim theo quốc gia ----- */
export const fetchMoviesByCountry = async (countrySlug, page = 1) => {
    try {
        const response = await fetch(`${API_BASE}/quoc-gia/${countrySlug}?page=${page}`);
        const data = await response.json();
        if (data.status === 'success') {
            return data.items || [];
        }
        return [];
    } catch (error) {
        console.error(`Error fetching movies for ${countrySlug}:`, error);
        return [];
    }
};

/** Quốc gia (slug → tên): Âu Mỹ, Anh, Trung Quốc, Indonesia, Việt Nam, Pháp, Hồng Kông, Hàn Quốc, Nhật Bản, Thái Lan, Đài Loan, Nga, Hà Lan, Philippines, Ấn Độ, Quốc gia khác */
export const COUNTRY_SLUGS = {
    'au-my': 'Âu Mỹ',
    'anh': 'Anh',
    'trung-quoc': 'Trung Quốc',
    'indonesia': 'Indonesia',
    'viet-nam': 'Việt Nam',
    'phap': 'Pháp',
    'hong-kong': 'Hồng Kông',
    'han-quoc': 'Hàn Quốc',
    'nhat-ban': 'Nhật Bản',
    'thai-lan': 'Thái Lan',
    'dai-loan': 'Đài Loan',
    'nga': 'Nga',
    'ha-lan': 'Hà Lan',
    'philippines': 'Philippines',
    'an-do': 'Ấn Độ',
    'quoc-gia-khac': 'Quốc gia khác',
};

export const fetchKoreanMovies = (page) => fetchMoviesByCountry('han-quoc', page);
export const fetchChineseMovies = (page) => fetchMoviesByCountry('trung-quoc', page);
export const fetchVietnameseMovies = (page) => fetchMoviesByCountry('viet-nam', page);

/* ----- Thông tin phim & danh sách tập phim ----- */
export const fetchFilmDetail = async (slug) => {
    try {
        const response = await fetch(`${API_FILM}/${slug}`);
        const data = await response.json();
        if (data.status === 'success') {
            return data.data || data;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching film ${slug}:`, error);
        return null;
    }
};

/* ----- Phim theo danh mục (TV shows, Phim lẻ, Phim bộ, Phim đang chiếu) ----- */
export const fetchMoviesByCategory = async (categorySlug, page = 1) => {
    try {
        const response = await fetch(`${API_BASE}/danh-sach/${categorySlug}?page=${page}`);
        const data = await response.json();
        if (data.status === 'success') {
            return data.items || [];
        }
        return [];
    } catch (error) {
        console.error(`Error fetching category ${categorySlug}:`, error);
        return [];
    }
};

/** Danh mục (slug → tên): TV shows, Phim lẻ, Phim bộ, Phim đang chiếu */
export const CATEGORY_SLUGS = {
    'tv-shows': 'TV shows',
    'phim-le': 'Phim lẻ',
    'phim-bo': 'Phim bộ',
    'phim-dang-chieu': 'Phim đang chiếu',
};

export const fetchPhimLe = (page = 1) => fetchMoviesByCategory('phim-le', page);
export const fetchPhimBo = (page = 1) => fetchMoviesByCategory('phim-bo', page);
export const fetchTvShows = (page = 1) => fetchMoviesByCategory('tv-shows', page);
export const fetchPhimDangChieu = (page = 1) => fetchMoviesByCategory('phim-dang-chieu', page);
