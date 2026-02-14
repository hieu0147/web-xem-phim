import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BackToTop from './components/common/BackToTop';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main style={{ minHeight: '80vh', paddingTop: '0' }}>
                    {/* Padding top 0 because Hero is full screen, usually handle spacing in pages or components */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/phim/:slug" element={<WatchPage />} />
                        <Route path="/tim-kiem" element={<SearchPage />} />
                    </Routes>
                </main>
                <Footer />
                <BackToTop />
            </div>
        </Router>
    );
}

export default App;
