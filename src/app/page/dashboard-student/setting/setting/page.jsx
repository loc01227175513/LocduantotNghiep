"use client";
import React, { useState } from 'react';
import { Profile, Password, MangXaHoi } from './setting';
import { FaUser, FaLock, FaShare } from 'react-icons/fa'; // Add icons

const Page = () => {
    const [view, setView] = useState('profile');

    const renderView = () => {
        switch (view) {
            case 'profile':
                return <Profile />;
            case 'password':
                return <Password />;
            case 'social':
                return <MangXaHoi />;
            default:
                return <Profile />;
        }
    };

    return (
        <div className="col-lg-9">
            <div className="settings-wrapper-dashed" style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            }}>
                <h5 className="title" style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '2rem',
                    background: 'linear-gradient(90deg, #2563eb, #4f46e5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>Settings</h5>
                <ul className="nav nav-pills mb-4 tab-buttons" style={{
                    gap: '1rem',
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '1rem',
                }}>
                    {[
                        { id: 'profile', icon: <FaUser/>, label: 'Profile' },
                        { id: 'password', icon: <FaLock/>, label: 'Password' },
                        { id: 'social', icon: <FaShare/>, label: 'Social' }
                    ].map(tab => (
                        <li key={tab.id} className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${view === tab.id ? 'active' : ''}`}
                                style={{
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease',
                                    background: view === tab.id ? '#2563eb' : 'transparent',
                                    color: view === tab.id ? 'white' : '#64748b',
                                }}
                                onClick={() => setView(tab.id)}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="tab-content" style={{
                    padding: '1rem',
                    transition: 'all 0.3s ease',
                }}>
                    {renderView()}
                </div>
            </div>
            <style jsx>{`
.settings-wrapper-dashed {
    animation: fadeIn 0.5s ease-in-out;
}

.nav-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
            `}</style>
        </div>
    );
};

export default Page;