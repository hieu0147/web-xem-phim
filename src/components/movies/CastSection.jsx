import React from 'react';

const CastSection = ({ cast }) => {
    // Check if cast is a string (API format) or array (Mock format)
    let castList = [];

    if (typeof cast === 'string') {
        castList = cast.split(',').map(name => ({ name: name.trim() }));
    } else if (Array.isArray(cast)) {
        castList = cast;
    }

    return (
        <div className="cast-section">
            <h3 className="section-title">Diễn viên</h3>
            <div className="cast-list">
                {castList.length > 0 ? (
                    castList.map((actor, index) => (
                        <div key={index} className="cast-item">
                            <div className="cast-avatar">
                                <img
                                    src={actor.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=random`}
                                    alt={actor.name}
                                />
                            </div>
                            <span className="cast-name">{actor.name}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-data">Đang cập nhật...</p>
                )}
            </div>
        </div>
    );
};

export default CastSection;
