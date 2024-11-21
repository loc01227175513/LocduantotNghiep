"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DanhSachYeuThich, XoaKhoaHocYeuThich } from '../../../../service/YeuThich/YeuThich';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const YeuThich = `
@keyframes cardHover {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes deleteSlide {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); opacity: 0; }
}

@keyframes shimmer {
    0% { background-position: -468px 0; }
    100% { background-position: 468px 0; }
}

.single-course-style-three {
    animation: fadeIn 0.5s ease-out;
    transition: all 0.3s ease;
}

.single-course-style-three:hover {
    animation: cardHover 1s ease-in-out;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.deleting {
    animation: deleteSlide 0.5s ease-out forwards;
}

.loading {
    background: #f6f7f8;
    background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #edeef1 20%,
        #f6f7f8 40%,
        #f6f7f8 100%
    );
    background-repeat: no-repeat;
    background-size: 800px 104px;
    animation: shimmer 1s linear infinite;
}

.thumbnail img {
    transition: transform 0.3s ease;
}

.thumbnail:hover img {
    transform: scale(1.05);
}

.rts-btn {
    transition: all 0.3s ease;
}

.rts-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.stars i {
    transition: all 0.3s ease;
}

.stars:hover i {
    transform: rotate(360deg);
    color: #ffd700;
}
    @keyframes cardHover {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(0.5deg); }
    100% { transform: translateY(0) rotate(0deg); }
}

.page-background {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    padding: 2rem 0;
}

.single-course-style-three {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.single-course-style-three:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.thumbnail {
    overflow: hidden;
    border-radius: 12px;
    margin: 12px;
}

.thumbnail img {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.thumbnail:hover img {
    transform: scale(1.08);
}

.body-area {
    padding: 1.5rem;
}

.course-top {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: -1.5rem -1.5rem 1rem;
    padding: 1rem;
    color: white;
    border-radius: 0 0 15px 15px;
}

.tags {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.3rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    backdrop-filter: blur(5px);
}

.rts-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    margin: 0.5rem;
    transition: all 0.3s ease;
}

.rts-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.stars {
    background: linear-gradient(45deg, #ffd700, #ffa500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
}

.stars:hover i {
    transform: rotate(720deg) scale(1.2);
    transition: all 0.5s ease;
}

.loading-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
    @keyframes shine {
    0% {
        background-position: -200% center;
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        background-position: 200% center;
        opacity: 0;
    }
}

@keyframes glow {
    0% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
    50% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.8); }
    100% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
}

@keyframes shimmerBorder {
    0% { border-color: rgba(255,255,255,0.3); }
    50% { border-color: rgba(255,255,255,0.9); }
    100% { border-color: rgba(255,255,255,0.3); }
}

.single-course-style-three {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255,255,255,0.3);
    animation: shimmerBorder 3s infinite;
}

.single-course-style-three::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent,
        rgba(255,255,255,0.1),
        transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
    pointer-events: none;
}

.course-top {
    position: relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    animation: glow 3s infinite;
}

.thumbnail::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        to right,
        transparent,
        rgba(255,255,255,0.3),
        transparent
    );
    transform: skewX(-25deg);
    animation: shine 2s infinite;
}

.rts-btn {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.rts-btn::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: linear-gradient(
        45deg,
        transparent,
        rgba(255,255,255,0.2),
        transparent
    );
    transform: rotate(45deg);
    animation: shine 2s infinite;
    pointer-events: none;
}

.stars i {
    position: relative;
    background: linear-gradient(45deg, #ffd700, #ffa500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: glow 2s infinite;
}

@media (prefers-reduced-motion: reduce) {
    .single-course-style-three,
    .single-course-style-three::before,
    .course-top,
    .thumbnail::after,
    .rts-btn::before,
    .stars i {
        animation: none;
    }
}
    @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes neonPulse {
    0% { box-shadow: 0 0 5px #667eea, 0 0 10px #667eea, 0 0 15px #667eea; }
    50% { box-shadow: 0 0 10px #667eea, 0 0 20px #667eea, 0 0 30px #667eea; }
    100% { box-shadow: 0 0 5px #667eea, 0 0 10px #667eea, 0 0 15px #667eea; }
}

.page-background {
    background: linear-gradient(
        45deg, 
        #ff6b6b, 
        #4ecdc4, 
        #45b7d1,
        #96c93d
    );
    background-size: 400% 400%;
    animation: rainbow 15s ease infinite;
    min-height: 100vh;
    padding: 2rem 0;
}

.single-course-style-three {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    animation: float 6s ease-in-out infinite;
}

.single-course-style-three:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
                0 0 20px rgba(102, 126, 234, 0.3);
    animation: neonPulse 2s infinite;
}

.course-top {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
}

.course-top::before {
    content: '';
    position: absolute;
    top: -180%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
    transition: all 0.5s ease;
}

.rts-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    padding: 1rem 2rem;
    color: white;
    border-radius: 30px;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 1;
}

.rts-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #764ba2, #667eea);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.rts-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.rts-btn:hover::before {
    opacity: 1;
}

.stars i {
    background: linear-gradient(45deg, #ffd700, #ffa500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.5s ease;
}

.stars:hover i {
    transform: rotate(720deg) scale(1.3);
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.6));
}

@media (prefers-reduced-motion: reduce) {
    .page-background,
    .single-course-style-three,
    .course-top::before,
    .stars i {
        animation: none;
        transition: none;
    }
}
`;



export default function VoucherPage() {
    const [love, setLove] = useState([]);

    useEffect(() => {
        const fetchLove = async () => {
            try {
                const response = await DanhSachYeuThich();
                setLove(response.khoahoc);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to fetch vouchers.");
            }
        };

        fetchLove();
    }, []);

    const deleteFavorite = async (id) => {
        try {
            const element = document.querySelector(`[data-id="${id}"]`);
            element.classList.add('deleting');
            await XoaKhoaHocYeuThich(id);
            setTimeout(() => {
                setLove(prevLove => prevLove.filter(item => item.khoahoc.id !== id));
                toast.success("Deleted successfully.");
            }, 500);
        } catch (error) {
            console.error('Delete error:', error);
            toast.error("Failed to delete the course.");
        }
    };
    console.log(love);


    return (
        <>
            <style>{YeuThich}</style>

            <div className="overflow-y-scroll col-lg-9 h-lvh" style={{ backgroundColor: '#f5f5f5' }}>
                <ToastContainer />
                <div className="page-background">
                    <div className="exrolled-course-wrapper-dashed">
                        <div className="row g-5">
                            {love.map((item, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12" data-id={item.khoahoc.id}>
                                    <div className="single-course-style-three enroll-course">
                                        <Link href={`/page/course-detail?id=${item.khoahoc.id}`} className="thumbnail">
                                            <Image width={500} height={300} src={item.khoahoc.hinh} alt="course" />
                                            {/* <div className="tag-thumb">
                                        <span>{item.khoahoc.chuDe}</span>
                                    </div> */}
                                        </Link>
                                        <div className="body-area">
                                            <div className="course-top">
                                                <div className="tags">Bán tốt nhất</div>
                                                <div className="price">
                                                    {item.khoahoc.gia === 0 && item.khoahoc.giamgia === 0 ? 'Miễn phí' : `$ ${item.khoahoc.gia}`}
                                                </div>
                                                {item.khoahoc.gia !== 0 || item.khoahoc.giamgia !== 0 ? (
                                                    <div className="line-through price">
                                                        $ {item.khoahoc.giamgia}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                                <h5 className="title">{item.khoahoc.ten}</h5>
                                            </Link>
                                            <div className="teacher-stars">
                                                <div className="teacher">
                                                    <span>{item.khoahoc.tenGiangVien}</span>
                                                </div>
                                                <ul className="stars">
                                                    <li className="span">4.5</li>
                                                    <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                    <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                    <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                    <li><i className="fa-sharp fa-solid fa-star" /></li>
                                                    <li><i className="fa-sharp fa-regular fa-star" /></li>
                                                </ul>
                                            </div>
                                            <div className="leasson-students">
                                                <div className="lesson">
                                                    <i className="fa-light fa-calendar-lines-pen" />
                                                    <span>{item.baihoc.length || 0} Bài học</span>
                                                </div>
                                                <div className="students">
                                                    <i className="fa-light fa-users" />
                                                    <span>{item.thanhtoan.length || 0} Học sinh</span>
                                                </div>
                                            </div>

                                            <button className="rts-btn btn-border">
                                                <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                                    Xem Chi Tiết
                                                </Link>
                                            </button>
                                            <button className="rts-btn btn-border" onClick={() => deleteFavorite(item.khoahoc.id)}>
                                                <i className="fa-sharp fa-solid fa-trash" /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
}