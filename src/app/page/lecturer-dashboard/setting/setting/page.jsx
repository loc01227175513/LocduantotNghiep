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
        <div className="col-lg-9 h-[550px] overflow-y-scroll">
            <div className="settings-card">
                <h3 className="settings-title">Settings</h3>
                <div className="tabs-container">
                    <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`tab-button ${view === 'profile' ? 'active' : ''}`}
                                onClick={() => setView('profile')}
                            >
                                <FaUser className="tab-icon" />
                                <span>Profile</span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`tab-button ${view === 'password' ? 'active' : ''}`}
                                onClick={() => setView('password')}
                            >
                                <FaLock className="tab-icon" />
                                <span>Password</span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`tab-button ${view === 'social' ? 'active' : ''}`}
                                onClick={() => setView('social')}
                            >
                                <FaShare className="tab-icon" />
                                <span>Social</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="content-area">
                    {renderView()}
                </div>
            </div>

            <style jsx>{`
                .settings-card {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    padding: 2rem;
                    transition: all 0.3s ease;
                }

                .settings-card:hover {
                    box-shadow: 0 6px 30px rgba(0,0,0,0.12);
                }

                .settings-title {
                    color: #2d3748;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    font-size: 1.5rem;
                }

                .tabs-container {
                    border-bottom: 1px solid #e2e8f0;
                    margin-bottom: 2rem;
                }

                .tab-button {
                    background: none;
                    border: none;
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #4a5568;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }

                .tab-button:hover {
                    color: #3182ce;
                    background: #ebf8ff;
                    border-radius: 8px;
                }

                .tab-button.active {
                    color: #3182ce;
                    border-bottom: 2px solid #3182ce;
                }

                .tab-icon {
                    font-size: 1.2rem;
                }

                .content-area {
                    padding: 1rem 0;
                    min-height: 400px;
                }
            `}</style>
        </div>
    );
};

export default Page;    