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
                boxShadow: '0 5px 30px rgba(0,0,0,0.05)',
            }}>
                <h5 className='text-black text-3xl p-3 font-bold'>Cài đặt</h5>
                <ul className="nav nav-pills mb-4 tab-buttons" style={{
                    gap: '1rem',
                    borderBottom: '1px solid rgb(251, 207, 232)', // pink-200
                    paddingBottom: '1rem',
                }}>
                    {[
                        { id: 'profile', icon: <FaUser/>, label: 'Thông tin' },
                        { id: 'password', icon: <FaLock/>, label: 'Mật khẩu' },
                        { id: 'social', icon: <FaShare/>, label: 'Mạng xã hội' }
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
                                    background: view === tab.id ? 'rgb(190, 24, 93)' : 'transparent', // pink-700
                                    color: view === tab.id ? 'white' : '#64748b',
                                }}
                                onMouseOver={(e) => {
                                    if (view !== tab.id) {
                                        e.currentTarget.style.background = 'rgb(251, 207, 232)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (view !== tab.id) {
                                        e.currentTarget.style.background = 'transparent';
                                    }
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

        </div>
    );
};

export default Page;