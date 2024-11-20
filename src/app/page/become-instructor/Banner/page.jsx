"use client";
import React from 'react'
import Link from 'next/link'
export default function page() {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb-wrapper" style={{
                        background: 'linear-gradient(145deg, #f6f8fd 0%, #ffffff 100%)',
                        padding: '2rem',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        margin: '2rem 0'
                    }}>
                        <h1 style={{
                            fontSize: '2.5rem',
                            background: 'linear-gradient(90deg, #2563eb, #4f46e5)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem'
                        }}>
                            Become an Instructor
                        </h1>
                        <div className="navigation" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '1rem',
                            color: '#64748b'
                        }}>
                            <Link  href="/" style={{
                                textDecoration: 'none',
                                color: '#64748b',
                                transition: 'color 0.3s ease',
                                ':hover': { color: '#2563eb' }
                            }}>
                                Home
                            </Link>
                            <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <Link 
                                className="active"
                                href="/page/become-instructor"
                                style={{
                                    textDecoration: 'none',
                                    color: '#2563eb',
                                    fontWeight: '600'
                                }}
                            >
                                Become an Instructor
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{` .breadcrumb-wrapper a:hover {
    color: #2563eb !important;
}

@media (max-width: 768px) {
    .breadcrumb-wrapper h1 {
        font-size: 2rem !important;
    }
    .breadcrumb-wrapper .navigation {
        font-size: 0.875rem !important;
    }
}`}</style>
        </>
    )
}