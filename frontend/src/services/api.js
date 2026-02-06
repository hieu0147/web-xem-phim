const API_BASE = 'https://phim.nguonc.com/api/films';

export const fetchMoviesByCountry = async (countrySlug, page = 1) => {
    try {
        const response = await fetch(`${API_BASE}/quoc-gia/${countrySlug}?page=${page}`);
        const data = await response.json();
        if (data.status === 'success') {
            return data.items;
        }
        return [];
    } catch (error) {
        console.error(`Error fetching movies for ${countrySlug}:`, error);
        return [];
    }
};

export const fetchKoreanMovies = (page) => fetchMoviesByCountry('han-quoc', page);
export const fetchChineseMovies = (page) => fetchMoviesByCountry('trung-quoc', page);
export const fetchWesternMovies = (page) => fetchMoviesByCountry('au-my', page);

export const fetchPhimDangChieu = async (page = 1) => {
    try {
        const response = await fetch(`${API_BASE}/danh-sach/phim-dang-chieu?page=${page}`);
        const data = await response.json();
        if (data.status === 'success') {
            return data.items;
        }
        return [];
    } catch (error) {
        console.error(`Error fetching phim dang chieu:`, error);
        return [];
    }
};
