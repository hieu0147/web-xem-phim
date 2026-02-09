import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

const EpisodeList = ({ episodes, currentEpisode, onEpisodeSelect }) => {
    // API returns episodes as array of server objects: [{ server_name: "Vietsub #1", items: [...] }, ...]
    // Or it might be null/empty
    const [selectedServerIndex, setSelectedServerIndex] = useState(0);
    const [compactMode, setCompactMode] = useState(false);

    // Normalize episodes data
    const servers = Array.isArray(episodes) ? episodes : [];
    const currentServer = servers[selectedServerIndex];
    const episodeItems = currentServer ? currentServer.items : [];

    // Auto-select first server if available and none selected (handled by useState(0))

    return (
        <div className="episode-section">
            <div className="episode-header">
                <div className="server-tabs">
                    {servers.length > 0 ? (
                        servers.map((server, index) => (
                            <button
                                key={index}
                                className={`server-tab ${selectedServerIndex === index ? 'active' : ''}`}
                                onClick={() => setSelectedServerIndex(index)}
                            >
                                {server.server_name}
                            </button>
                        ))
                    ) : (
                        <button className="server-tab active">Server 1</button>
                    )}
                </div>

                <div className="episode-controls">
                    <span>Rút gọn</span>
                    <button
                        className={`toggle-switch ${compactMode ? 'active' : ''}`}
                        onClick={() => setCompactMode(!compactMode)}
                    >
                        <div className="switch-handle"></div>
                    </button>
                </div>
            </div>

            <div className="episode-grid">
                {episodeItems.length > 0 ? (
                    episodeItems.map((ep, index) => (
                        <button
                            key={index}
                            className={`episode-btn ${currentEpisode === ep.slug ? 'active' : ''}`} // Check by slug or name if id not present
                            onClick={() => onEpisodeSelect(ep)}
                        >
                            Tập {ep.name}
                        </button>
                    ))
                ) : (
                    <p className="no-data" style={{ color: '#888', fontStyle: 'italic' }}>Đang cập nhật...</p>
                )}
            </div>
        </div>
    );
};

export default EpisodeList;
