"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import Axios from 'axios';
import Link from 'next/link';
import { PlusIcon, MinusIcon, XIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, CheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemKhoaHocDaHoc } from "../../../../service/course/course.service";
import { ShowTracNghiem, ShowCauHoi, GuiCauTraLoi, checkQuizCompletion } from "@/service/TaoBaiTracNghiem/TaoBaiTracNghiem";
import KetQuaTracNghiem from './ketquatracnghiem';
import { Dashboard } from "@/service/dashbordStuden/Dashboard-service";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [isYTReady, setIsYTReady] = useState(false);
    const [khoahoc, setKhoahoc] = useState(null);
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [watchedVideos, setWatchedVideos] = useState({});
    const [chitietkhoahoc, setChitietkhoahoc] = useState({});
    const [videotieptheo, setVideotieptheo] = useState({});
    const [baihoctieptheo, setBaihoctieptheo] = useState({});
    const [conbaihoc, setConbaihoc] = useState(true);
    const [convideo, setConvideo] = useState(true);
    const [showBaiQuiz, setShowBaiQuiz] = useState(false);
    const [idBaihoc, setIdBaihoc] = useState(null);
    const [idTracNghiem, setIdTracNghiem] = useState(null);
    const playerRef = useRef(null);
    const [id, setId] = useState(null);
    useEffect(() => {
        // Check if the YouTube API script is already present
        const existingScript = document.getElementById('youtube-iframe-api');
        if (!existingScript) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.id = 'youtube-iframe-api'; // Set an ID for the script
            tag.onload = () => {
                window.onYouTubeIframeAPIReady = () => {
                    setIsYTReady(true);
                };
            };
            document.getElementsByTagName('script')[0].parentNode.insertBefore(tag, null);
        } else {
            setIsYTReady(true); // If the script exists, set the state directly
        }
    }, []);
    const parsedData = typeof window !== 'undefined' && window.localStorage ? JSON.parse(localStorage.getItem('data')) : null;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Dashboard();
                if (!res || !res.data || res.data.length === 0) {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Redirect to home on error
                router.push('/'); // Adjust the path as necessary
            }
        };
        fetchData();
    }, [router]); // Added 'router' as a dependency


    useEffect(() => {
        const data = localStorage.getItem('data');
        if (!data) {
            router.push('/page/login');
            return;
        }
        const parsedUserData = JSON.parse(data);
        if (!parsedUserData || !parsedUserData.id) {
            router.push('/page/login');
            return;
        }
    }, [router]);



    const getYouTubeVideoID = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        } catch (e) {
            console.error('Invalid URL:', url, 'Assuming it is a video ID.');
            return url;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://huuphuoc.id.vn/api/Khoahocchitiet/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'referrerPolicy': 'unsafe-url'
                    }
                });
                const data = await response.json(); // Parse the JSON response
                const khoahocData = data.khoahoc; // Access khoahoc from the parsed data
                setKhoahoc(khoahocData);

                if (khoahocData.baihocs.length > 0) {
                    const firstBaifhoc = khoahocData.baihocs[0];
                    if (firstBaifhoc && firstBaifhoc.video.length > 0) {
                        const firstVideo = firstBaifhoc.video[0];
                        setChitietkhoahoc({
                            tenbaihoc: firstBaifhoc.ten,
                            motavideo: firstVideo.ten
                        });
                        setVideoUrl(firstVideo.url_link);
                        setCurrentVideoId(firstVideo.id);
                    }
                }

                const total = khoahocData.baihocs.reduce((acc, baihoc) => {
                    return acc + baihoc.video.reduce((vidAcc, video) => {
                        const [hours, minutes, seconds] = video.thoiluong.split(':').map(Number);
                        return vidAcc + hours * 3600 + minutes * 60 + seconds;
                    }, 0);
                }, 0);

                setTotalDuration(total);
            } catch (err) {
                console.error('Error fetching course details:', err);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (khoahoc && Array.isArray(khoahoc.baihocs)) {
            const baiHocIndex = khoahoc.baihocs.findIndex(baiHoc => baiHoc.ten === chitietkhoahoc.tenbaihoc);
            if (baiHocIndex === -1) {
                console.error('Không tìm thấy bài học phù hợp');
                return;
            }

            const videoIndex = khoahoc.baihocs[baiHocIndex].video.findIndex(video => video.ten === chitietkhoahoc.motavideo);
            if (videoIndex === -1) {
                console.error('Không tìm thấy video phù hợp trong bài học');
                return;
            }

            const tongbaihoc = khoahoc.baihocs.length;
            const tongVideoTrongBaiHoc = khoahoc.baihocs[baiHocIndex].video.length;

            if (baiHocIndex === tongbaihoc - 1 && videoIndex === tongVideoTrongBaiHoc - 1) {
                setConbaihoc(false);
                setConvideo(false);
            } else if (videoIndex === tongVideoTrongBaiHoc - 1) {
                setConbaihoc(true);
                setConvideo(false);
                setBaihoctieptheo(khoahoc.baihocs[baiHocIndex + 1]);
                setVideotieptheo(khoahoc.baihocs[baiHocIndex + 1].video[0]);
            } else {
                setConbaihoc(true);
                setConvideo(true);
                setVideotieptheo(khoahoc.baihocs[baiHocIndex].video[videoIndex + 1]);
                setBaihoctieptheo(khoahoc.baihocs[baiHocIndex]);
            }
        }
    }, [chitietkhoahoc, khoahoc]);

    const onPlayerStateChange = useCallback(async (event) => {
        if (typeof window !== 'undefined' && event.data === window.YT.PlayerState.ENDED) {
            setIsVideoEnded(true);

            if (parsedData && currentVideoId) {
                try {
                    const requestData = {
                        trangthai: 'Đã xem',
                        id_nguoidung: parsedData.id,
                        id_video: currentVideoId,
                    };

                    await Axios.post('https://huuphuoc.id.vn/api/videodahoc', requestData, {
                        referrerPolicy: 'unsafe-url'
                    });

                    setWatchedVideos(prev => ({ ...prev, [currentVideoId]: true }));
                } catch (error) {
                    window.location.reload();
                }
            } else {
                window.location.reload();
            }
        }
    }, [parsedData, currentVideoId]);

    const initializePlayer = useCallback(() => {
        if (isYTReady && videoUrl) {
            const videoId = getYouTubeVideoID(videoUrl);
            if (videoId) {
                playerRef.current = new window.YT.Player('player', {
                    events: {
                        onStateChange: onPlayerStateChange,
                    },
                    videoId: videoId,
                });
            } else {
                console.error('Invalid video URL or ID:', videoUrl);
            }
        }
    }, [isYTReady, videoUrl, onPlayerStateChange]);

    useEffect(() => {
        if (isYTReady && videoUrl) {
            initializePlayer();
        }
    }, [isYTReady, videoUrl, initializePlayer]);

    useEffect(() => {
        const checkVideoWatched = async () => {
            const data = localStorage.getItem('data');
            if (!data) {
                router.push('/page/login');
                return;
            }

            if (!currentVideoId || !khoahoc) {
                return;
            }

            try {
                const parsedUserData = JSON.parse(data);
                const response = await Axios.post(`https://huuphuoc.id.vn/api/kiemtravidedahoc`, {
                    id_nguoidung: parsedUserData.id
                }, {
                    referrerPolicy: 'unsafe-url'
                });
                if (Array.isArray(response.data.data)) {
                    const updatedWatchedVideos = {};
                    khoahoc.baihocs.forEach((lesson) => {
                        lesson.video.forEach((video) => {
                            const isVideoMatched = response.data.data.some((responseVideo) => {
                                return responseVideo.id_video === video.id;
                            });

                            if (isVideoMatched) {
                                updatedWatchedVideos[video.id] = true;
                            }
                        });
                    });
                    setWatchedVideos(updatedWatchedVideos);
                } else {
                    console.error('Error: response.data.data is not an array');
                }
            } catch (err) {
                console.error('Error checking video watched status:', err);
                if (err.message === 'Invalid user data') {
                    router.push('/page/login');
                }
            }
        };

        checkVideoWatched();
    }, [currentVideoId, khoahoc, router]);

    const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleClick = (videoLink, videoId, tenbaihoc, motavideo) => {
        setVideoUrl(videoLink);
        setCurrentVideoId(videoId);
        setIsVideoEnded(false);
        setChitietkhoahoc({
            tenbaihoc,
            motavideo
        });
    };

    const handleComent = async (comment, rating) => {
        try {
            const userData = localStorage.getItem('data');
            if (!userData) {
                router.push('/page/login');
                return;
            }

            const parsedData = JSON.parse(userData);
            if (!parsedData || !parsedData.id) {
                router.push('/page/login');
                return;
            }

            const payload = {
                id_nguoidung: parsedData.id,
                id_khoahoc: id,
                danhgia: rating,
                noidung: comment,
            };

            const response = await Axios.post('https://huuphuoc.id.vn/api/danhgia', payload, {
                referrerPolicy: 'unsafe-url'
            });
            if (response.status === 200) {
                alert('Bình luận thành công!');
                window.location.reload();
            } else {
                alert('Bình luận thất bại.');
            }
        } catch (err) {
            console.error('Error adding comment:', err);
            if (err.message === 'Invalid user data') {
                router.push('/page/login');
            }
        }
    };

    const handleAddCourse = async () => {
        await ThemKhoaHocDaHoc();
    };

    const tongbaiHoc = khoahoc
        ? khoahoc.baihocs.reduce((acc, baihoc) => acc + baihoc.video.length, 0)
        : 'No data';
    const tongBaihOcDaHoc = Object.keys(watchedVideos).filter(video => watchedVideos[video]).length;

    useEffect(() => {
        if (tongbaiHoc !== 'No data' && tongbaiHoc === tongBaihOcDaHoc) {
            handleAddCourse();
        }
    }, [tongbaiHoc, tongBaihOcDaHoc]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : null;
            if (newId !== id) {
                setId(newId);
            }
        }, 1000); // Check every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen mt-60 mb-60">
            <div className="flex flex-col lg:flex-row">
                {showBaiQuiz === false ? (
                    <VideoPlayer
                        videoUrl={videoUrl}
                        isVideoEnded={isVideoEnded}
                        khoahoc={khoahoc}
                        formatDuration={formatDuration}
                        totalDuration={totalDuration}
                        handleComent={handleComent}
                        chitietkhoahoc={chitietkhoahoc}
                        handleClick={handleClick}
                        currentVideoId={currentVideoId}
                        tenbaihoc={chitietkhoahoc.tenbaihoc}
                        motavideo={chitietkhoahoc.motavideo}
                        videotieptheo={videotieptheo}
                        baihoctieptheo={baihoctieptheo}
                        convideo={convideo}
                        conbaihoc={conbaihoc}
                    />
                ) : (
                    <ShowTracNghiemComponent idBaihoc={idBaihoc} idTracNghiem={idTracNghiem} />
                )}
                <BaiHocDeHoc
                    khoahoc={khoahoc}
                    watchedVideos={watchedVideos}
                    handleClick={handleClick}
                    setShowBaiQuiz={setShowBaiQuiz}
                    setIdBaihoc={setIdBaihoc}
                    setIdTracNghiem={setIdTracNghiem}
                />
            </div>
        </div>
    );
}

const VideoPlayer = ({ videoUrl, isVideoEnded, khoahoc, formatDuration, totalDuration, handleComent, chitietkhoahoc, handleClick, currentVideoId, tenbaihoc, motavideo, videotieptheo, baihoctieptheo, convideo, conbaihoc }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [previewVideo, setPreviewVideo] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleVideoHover = (video) => {
        setPreviewVideo(video);
    };
    const handleClickrating = (index) => {
        if (index) {
            setRating(index);
        }
    };

    const previewVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", bounce: 0.4 }
        }
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await handleComent(comment, rating);
            setComment('');
            setRating('');
            toast.success('Bình luận đã được gửi thành công!');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi gửi bình luận');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className="flex-grow lg:pr-8 max-w-[900px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="relative pb-[56.25%] group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <iframe
                    id="player"
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    src={videoUrl ? `https://www.youtube.com/embed/${videoUrl}?enablejsapi=1&showinfo=0&rel=0&modestbranding=1&autohide=1&iv_load_policy=3` : ''}
                    allowFullScreen
                    title="YouTube Video"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />


                <AnimatePresence>
                    {isVideoEnded && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="absolute inset-0 flex items-center justify-center bg-green-200 bg-opacity-75 rounded-lg backdrop-blur-sm"
                        >
                            <motion.div
                                className="text-center"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 360]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1]
                                    }}
                                >
                                    <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
                                </motion.div>
                                <span className="text-xl font-semibold text-green-800"><p>
                                    Video đã xem xong!</p>
                                    <i class="bi bi-arrow-clockwise text-6xl hover:cursor-pointer mt-4" onClick={() => handleClick(videoUrl, currentVideoId, tenbaihoc, motavideo)}>xem lại</i>
                                </span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {khoahoc && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <motion.div
                        className="mt-6 flex items-center justify-between border-b border-gray-300 pb-4"
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.h1
                            className="text-4xl font-bold text-gray-900 hover:text-pink-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* {khoahoc.ten} <span>-</span> {chitietkhoahoc && chitietkhoahoc.tenbaihoc ? chitietkhoahoc.tenbaihoc : 'Loading...'}  <span>:</span>  */}
                            {chitietkhoahoc && chitietkhoahoc.motavideo ? chitietkhoahoc.motavideo : 'Loading...'}
                        </motion.h1>

                        {!convideo && conbaihoc && (
                            <motion.div>
                                {baihoctieptheo && (
                                    <div className="flex justify-center w-[150px]" >
                                        <button onClick={() => handleClick(videotieptheo.url_link, videotieptheo.id, baihoctieptheo.ten, videotieptheo.ten)} className='bg-pink-700 p-3 text-xl rounded-lg text-white hover:bg-pink-700 '
                                            onMouseEnter={() => handleVideoHover(videotieptheo)}
                                            onMouseLeave={() => setPreviewVideo(null)}
                                        >
                                            Bài học tiếp theo <i className="bi bi-skip-forward-fill mx-2"></i>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {convideo && conbaihoc && (
                            <motion.div>
                                {videotieptheo && (
                                    <div className="flex justify-center w-[150px]" >
                                        <button onClick={() => handleClick(videotieptheo.url_link, videotieptheo.id, baihoctieptheo.ten, videotieptheo.ten)} className='bg-pink-700  p-3 text-xl rounded-lg text-white hover:bg-pink-700'
                                            onMouseEnter={() => handleVideoHover(videotieptheo)}
                                            onMouseLeave={() => setPreviewVideo(null)}
                                        >


                                            Video tiếp theo <i className="bi bi-skip-forward-fill mx-2" ></i>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {!convideo && !conbaihoc && (
                            <motion.div>
                                <div>
                                    <p className='text-green-400 text-2xl'>Hết <i class="bi bi-check-lg"></i></p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                    {/* <AnimatePresence>
                        {previewVideo && (
                            <motion.div
                                className="fixed bottom-4 right-80 w-96 bg-black rounded-lg p-2 z-10"
                                variants={previewVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                <iframe
                                    src={previewVideo.url_link ? `https://www.youtube.com/embed/${previewVideo.url_link}?enablejsapi=1&autoplay=1&loop=1` : ''}
                                    className="w-full h-full rounded-lg"
                                    allow="autoplay"
                                    title="YouTube Video"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence> */}
                    <motion.section
                        className="mt-6 space-y-4"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        <AnimatedDisclosure
                            title="Mô tả khóa học"
                            isOpen={showDescription}
                            onToggle={() => setShowDescription(!showDescription)}
                            content={khoahoc.mota}
                        />

                        <AnimatedDisclosure
                            title="Bình luận"
                            isOpen={showComments}
                            onToggle={() => setShowComments(!showComments)}
                            content={
                                <>
                                    <CommentForm
                                        comment={comment}
                                        rating={rating}
                                        isSubmitting={isSubmitting}
                                        onCommentChange={(e) => setComment(e.target.value)}
                                        onRatingChange={(e) => setRating(e.target.value)}
                                        onSubmit={handleCommentSubmit}
                                        handleClickrating={handleClickrating}
                                    />
                                    <CommentList comments={khoahoc.danhgia} />
                                </>
                            }
                        />

                        <CourseInfo
                            instructor={khoahoc.giangvien}
                            category={khoahoc.theloai}
                            subCategory={khoahoc.theloaicon}
                            duration={formatDuration(totalDuration)}
                        />
                    </motion.section>
                </motion.div>
            )}
        </motion.div>
    );
};

const CourseInfo = ({ instructor, category, subCategory, duration }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    const iconVariants = {
        hover: {
            scale: 1.2,
            rotate: 360,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    const infoItems = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            label: "Giảng viên",
            value: instructor
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M19 9l-7 7-7-7" />
                </svg>
            ),
            label: "Thể loại",
            value: category
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
            label: "Chuyên mục",
            value: subCategory
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: "Thời lượng",
            value: duration
        }
    ];

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow duration-300"
        >
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold text-gray-800 mb-4"
            >
                Thông tin khóa học
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {infoItems.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(249, 250, 251, 0.9)",
                        }}
                        className="flex items-center space-x-3 p-3 rounded-lg 
                            backdrop-blur-sm transition-all duration-200
                            hover:shadow-md cursor-pointer"
                    >
                        <motion.div
                            className="flex-shrink-0 text-indigo-500"
                            whileHover="hover"
                        >
                            {item.icon}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <motion.p
                                className="text-2xl text-gray-500"
                                whileHover={{ scale: 1.02 }}
                            >
                                {item.label}
                            </motion.p>
                            <motion.p
                                className="font-medium  text-gray-800"
                                whileHover={{ scale: 1.02 }}
                            >
                                {item.value}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1 group">
        {[...Array(5)].map((_, index) => (
            <motion.div
                key={index}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                }}
                className="relative"
            >
                <svg
                    className={`h-8 w-8 transform transition-all duration-200
                        ${index < rating
                            ? 'drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                            : 'fill-gray-300 group-hover:fill-gray-400'}`}
                    viewBox="0 0 20 20"
                    style={{
                        fill: index < rating
                            ? 'url(#starGradient)'
                            : 'currentColor'
                    }}
                >
                    <defs>
                        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FCD34D" />
                            <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                    </defs>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {index + 1} {index === 0 ? 'Star' : 'Stars'}
                </span>
            </motion.div>
        ))}
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-2 text-2xl font-medium text-gray-600  "
        >
            {rating}/5
        </motion.div>
    </div>
);

const CommentList = ({ comments }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotate: -2
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    if (!comments || comments.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="text-center py-8 px-4  bg-gray-50 rounded-lg mt-4"
            >
                <motion.img
                    src="/empty-comments.svg"
                    alt="No comments"
                    className="w-24 h-24 mx-auto mb-4 opacity-50"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <p className="text-gray-500 font-medium text-xl">Chưa có bình luận nào.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 mt-4"
        >
            {comments.map((comment, index) => (
                <motion.div
                    key={comment.id || index}
                    variants={item}
                    whileHover={{
                        scale: 1.02,
                        rotate: 0,
                        transition: {
                            type: "spring",
                            stiffness: 300
                        }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                    <motion.div
                        className="flex items-center justify-between mb-4"
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                    >
                        <div className="flex items-center space-x-3">
                            <motion.div
                                className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {comment.user?.charAt(0).toUpperCase()}
                            </motion.div>
                            <div>
                                <span className="font-semibold text-gray-800 text-xl">{comment.user}</span>
                                <p className="text-xs text-gray-500">
                                    {comment.date && formatTimeAgo(new Date(comment.date))}
                                </p>
                            </div>
                        </div>
                        <StarRating rating={comment.rating} />
                    </motion.div>
                    <motion.p
                        className="text-gray-700 leading-relaxed text-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {comment.comment}
                    </motion.p>

                </motion.div>
            ))}
        </motion.div>
    );
};

// Helper function to format dates
const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
        năm: 31536000,
        tháng: 2592000,
        tuần: 604800,
        ngày: 86400,
        giờ: 3600,
        phút: 60,
        giây: 1
    };

    for (let [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval > 0) {
            return `${interval} ${unit}${interval > 1 ? '' : ''} trước`;
        }
    }
    return 'Vừa xong';
};
// Helper Components
const AnimatedDisclosure = ({ title, isOpen, onToggle, content }) => (
    <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
        >
            <motion.span
                initial={false}
                animate={{ scale: isOpen ? 1.05 : 1 }}
                className="text-2xl font-medium text-gray-800"
            >
                {title}
            </motion.span>
            <motion.div
                animate={{
                    rotate: isOpen ? 180 : 0,
                    scale: isOpen ? 1.1 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            >
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{
                        height: 0,
                        opacity: 0,
                        scale: 0.95
                    }}
                    animate={{
                        height: "auto",
                        opacity: 1,
                        scale: 1
                    }}
                    exit={{
                        height: 0,
                        opacity: 0,
                        scale: 0.95
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.25 }
                    }}
                    className="overflow-hidden"
                >
                    <div className="px-4 py-3 bg-gray-50">
                        <motion.div
                            initial={{ y: 10 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className='text-2xl'
                        >
                            {content}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const CommentForm = ({ comment, rating, isSubmitting, onCommentChange, onRatingChange, onSubmit, handleClickrating }) => (
    <motion.form
        onSubmit={onSubmit}
        className="mt-4 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <label htmlFor="comment" className="block text-2xl font-medium text-gray-700">
                Điền bình luận
            </label>
            <motion.textarea
                id="comment"
                value={comment}
                onChange={onCommentChange}
                rows="4"
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm 
                    focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-all duration-200 placeholder:text-xl text-2xl
                    hover:border-indigo-300"
                required
                disabled={isSubmitting}
            />
        </motion.div>

        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <label htmlFor="rating" className="block text-2xl font-medium text-gray-700">
                Đánh giá
            </label>
            <motion.div
                id="rating"
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-all duration-200
                hover:border-indigo-300"
                required
                disabled={isSubmitting}
            >
                {[1, 2, 3, 4, 5].map((num, index) => (
                    <i
                        key={num}
                        onClick={() => handleClickrating(num)}
                        className={`bi ${rating >= num ? 'bi-star-fill text-yellow-500' : 'bi-star text-gray-400'} mr-2 cursor-pointer `}
                        style={{ fontSize: '20px' }}
                    ></i>
                ))}
            </motion.div>
        </motion.div>

        <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full inline-flex justify-center items-center px-4 py-3 
                border border-transparent rounded-md shadow-sm text-2xl font-medium text-white 
                ${isSubmitting ? 'bg-indigo-400' : 'bg-pink-700 hover:bg-pink-700'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                transition-all duration-200`}
        >
            <AnimatePresence mode="wait">
                {isSubmitting ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                    >
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Đang gửi...</span>
                    </motion.div>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        Gửi bình luận
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    </motion.form>
);

const BaiHocDeHoc = ({ khoahoc, watchedVideos, handleClick, setShowBaiQuiz, setIdBaihoc, setIdTracNghiem }) => {
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [isMiniplayer, setIsMiniplayer] = useState(false);
    const [previewVideo, setPreviewVideo] = useState(null);
    const [baiTracNghiems, setBaiTracNghiems] = useState({});
    const [quizStatus, setQuizStatus] = useState({}); // New state to store quiz status

    const handleClickVideo = (videoLink, videoId, tenbaihoc, motavideo) => {
        handleClick(videoLink, videoId, tenbaihoc, motavideo);
    };

    const handleClickQuiz = async (IDbaihoc) => {
        try {
            const response = await ShowTracNghiem({
                id_baihoc: IDbaihoc
            });
            setBaiTracNghiems(prev => ({
                ...prev,
                [IDbaihoc]: response
            }));

            // Call checkQuizCompletion and store the status
            const statusResponse = await checkQuizCompletion({ id_baihoc: IDbaihoc });
            setQuizStatus(prev => ({
                ...prev,
                [IDbaihoc]: statusResponse.trangthai
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getTotalProgress = (lessons) => {
        const totalVideos = lessons?.reduce((sum, lesson) => sum + lesson.video.length, 0) || 0;
        const watchedCount = Object.values(watchedVideos).filter(Boolean).length;
        return Math.round((watchedCount / totalVideos) * 100);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'n') handleNextVideo();
            if (e.key === 'p') handlePrevVideo();
            if (e.key === 'm') setIsMiniplayer(prev => !prev);
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Batch selection handling
    const handleBatchSelect = (videoIds) => {
        setSelectedVideos(prev => [...prev, ...videoIds]);
    };

    // Video preview
    const handleVideoHover = (video) => {
        setPreviewVideo(video);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const previewVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", bounce: 0.4 }
        }
    };

    return (
        <motion.div
            className="w-full lg:w-1/3 mt-8 lg:mt-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
                    whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Con đường học tập của tôi</h2>
                        <div className="text-xl font-medium text-gray-500">
                            Tiến triển: {getTotalProgress(khoahoc?.baihocs)}%
                        </div>
                    </div>

                    <div className="space-y-4">
                        {khoahoc && khoahoc.baihocs.map((lesson, index) => (
                            <Disclosure key={lesson.id}>
                                {({ open }) => (
                                    <motion.div
                                        variants={itemVariants}
                                        className="border rounded-lg bg-white shadow-sm transition-all duration-200"
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <h3 className="flow-root">
                                            <Disclosure.Button
                                                className="flex w-full justify-between items-center px-6 py-4 text-left"
                                                onClick={() => handleClickQuiz(lesson.id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-medium text-2xl text-gray-900">{lesson.ten}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl text-gray-500">
                                                        {lesson.video.filter(v => watchedVideos[v.id]).length} / {lesson.video.length} hoàn thành
                                                    </span>
                                                    <motion.div
                                                        animate={{ rotate: open ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                    </motion.div>
                                                </div>
                                            </Disclosure.Button>
                                        </h3>
                                        <AnimatePresence>
                                            {open && (
                                                <Disclosure.Panel
                                                    as={motion.div}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-6 py-4 bg-gray-50"
                                                >
                                                    <div className="space-y-3">
                                                        {lesson.video.map((video) => {
                                                            const isWatched = watchedVideos[video.id] ?? false;
                                                            return (
                                                                <div
                                                                    key={video.id}
                                                                    className="flex items-center p-3 rounded-lg bg-white hover:bg-indigo-50 transition-colors duration-200"
                                                                    onMouseEnter={() => handleVideoHover(video)}
                                                                    onMouseLeave={() => setPreviewVideo(null)}
                                                                    onClick={() => handleClickVideo(video.url_link, video.id, lesson.ten, video.ten)}
                                                                >
                                                                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${isWatched ? 'bg-green-500' : 'bg-gray-200'} transition-colors duration-200`}>
                                                                        {isWatched && <CheckIcon className="h-3 w-3 text-white" />}
                                                                    </div>
                                                                    <div className="ml-3 flex-1">
                                                                        <div className="flex justify-between">
                                                                            <span className={`text-2xl font-semibold ${isWatched ? 'text-gray-500' : 'text-gray-900'}`}>
                                                                                {video.ten}
                                                                            </span>
                                                                            <span className="text-xl text-gray-500">{video.thoiluong}</span>
                                                                        </div>
                                                                        <div className="text-xl text-gray-500">
                                                                            {isWatched ? 'Hoàn thành' : 'Không bắt đầu'}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                        {lesson.id in baiTracNghiems && baiTracNghiems[lesson.id].map((baiTracNghiem, index) => (
                                                            <Disclosure key={index}>
                                                                {({ open }) => (
                                                                    <motion.div
                                                                        variants={itemVariants}
                                                                        className="rounded-lg bg-white shadow-sm transition-all duration-200 text-xl font-bold"
                                                                        whileHover={{ scale: 1.01 }}
                                                                    >
                                                                        <h3 className="flow-root">
                                                                            <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-gray-500">
                                                                                <div className='flex items-center'>
                                                                                    <i className="bi bi-pen-fill mr-2 text-2xl"></i> Bài quiz
                                                                                    {/* Show checkmark if quiz is active */}
                                                                                    {quizStatus[lesson.id] === 'Active' && (
                                                                                        <CheckIcon className="h-5 w-5 text-green-500 ml-2" />
                                                                                    )}
                                                                                </div>
                                                                            </Disclosure.Button>
                                                                        </h3>
                                                                        <AnimatePresence>
                                                                            {open && (
                                                                                <Disclosure.Panel
                                                                                    as={motion.div}
                                                                                    initial={{ height: 0, opacity: 0 }}
                                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                                    exit={{ height: 0, opacity: 0 }}
                                                                                    className="px-6 pb-4"
                                                                                >
                                                                                    {baiTracNghiem.noidung.map((baiTracNghiem1, idx) => (
                                                                                        <div key={idx}>
                                                                                            <p className='text-xl font-normal text-pink-700'>{baiTracNghiem1.tieu_de}</p>
                                                                                            <div>
                                                                                                <p className='text-2xl font-normal text-gray-500 indent-2'>
                                                                                                    {baiTracNghiem1.noidung}
                                                                                                </p>
                                                                                                <button
                                                                                                    onClick={() => {
                                                                                                        setShowBaiQuiz(true);
                                                                                                        setIdBaihoc(baiTracNghiem.id_baihoc);
                                                                                                        setIdTracNghiem(baiTracNghiem1.id_baitracnghiem);
                                                                                                    }}
                                                                                                    className='bg-pink-700 mt-2 p-2 text-2xl text-white font-normal rounded-lg hover:bg-pink-600'
                                                                                                >
                                                                                                    Làm
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </Disclosure.Panel>
                                                                            )}
                                                                        </AnimatePresence>
                                                                    </motion.div>
                                                                )}
                                                            </Disclosure>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                </motion.div>
            </main>

            <AnimatePresence>
                {previewVideo && (
                    <motion.div
                        className="fixed bottom-4 right-80 w-96 bg-black rounded-lg p-2 z-10"
                        variants={previewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <iframe
                            src={previewVideo.url_link ? `https://www.youtube.com/embed/${previewVideo.url_link}?enablejsapi=1&autoplay=1&loop=1` : ''}
                            className="w-full h-full rounded-lg"
                            allow="autoplay"
                            title="YouTube Video"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMiniplayer && (
                    <motion.div
                        className="fixed bottom-4 right-4 w-72 h-40 bg-black rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                    >
                        <iframe
                            id="player"
                            className="w-full h-full rounded-lg shadow-lg"
                            src={selectedVideos[0]?.url_link ? `https://www.youtube.com/embed/${selectedVideos[0].url_link}?enablejsapi=1&autoplay=1` : ''}
                            allowFullScreen
                            title="YouTube Video"
                        />
                        <button
                            className="absolute top-2 right-2 text-white"
                            onClick={() => setIsMiniplayer(false)}
                        >
                            <XIcon className="h-5 w-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ShowTracNghiemComponent = ({ idBaihoc, idTracNghiem }) => {
    const [cauhois, setCauhois] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [checkedAnswers, setCheckedAnswers] = useState({});

    const [feedback, setFeedback] = useState("");
    const [notification, setNotification] = useState("");
    const [showKetQua, setShowKetQua] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!idBaihoc || !idTracNghiem) {
                console.warn("idBaihoc or idTracNghiem is null or undefined");
                return;
            }
            try {
                const url = "https://huuphuoc.id.vn/api/ShowCauHoi";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id_baihoc: idBaihoc, id_baitracnghiem: idTracNghiem }),
                });
                const data = await response.json();

                const parsedQuestions = [];
                data.questions.forEach((q) => {
                    q.cau_hoi.forEach((questionText, index) => {
                        parsedQuestions.push({
                            question: questionText,
                            answers: q.cau_traloi[index].map((ans) => ({
                                text: ans.text,
                                isCorrect: ans.is_correct === 1,
                            })),
                        });
                    });
                });

                setCauhois(parsedQuestions);
                setSelectedAnswers({});
                setCheckedAnswers({});
                setFeedback("");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [idBaihoc, idTracNghiem]);

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answerIndex,
        }));
    };

    const handleCheckAnswer = async () => {
        const question = cauhois[currentQuestionIndex];
        const selectedAnswerIndex = selectedAnswers[currentQuestionIndex];

        if (selectedAnswerIndex === undefined) {
            setNotification("Vui lòng chọn câu trả lời!");
            return;
        }

        if (checkedAnswers[currentQuestionIndex]) {
            setNotification("Bạn đã kiểm tra câu hỏi này!");
            return;
        }

        const isCorrect = question.answers[selectedAnswerIndex].isCorrect;
        setFeedback(isCorrect ? "Đúng rồi! 🎉" : "Sai rồi! Hãy thử lại nhé 💪");

        setCheckedAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: { isChecked: true, isCorrect },
        }));

        // Prepare noidung object
        const noidung = [{
            id_baitracnghiem: idTracNghiem,
            stt: selectedAnswerIndex + 1, // Assuming stt is 1-based index
            thutumang: currentQuestionIndex + 1, // Assuming thutumang is 1-based index
        }];

        try {
            await GuiCauTraLoi({ id_baihoc: idBaihoc, noidung });
            setNotification(isCorrect ? "Đã gửi đáp án đúng." : "Đã gửi đáp án sai.");
        } catch (error) {
            console.error("Lỗi khi gửi đáp án:", error);
            setNotification("Có lỗi xảy ra khi gửi đáp án.");
        }
    };

    const handleNextQuestion = () => {
        setFeedback("");
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleSubmit = () => {
        setShowKetQua(true);
    };

    if (showKetQua) {
        return <KetQuaTracNghiem idBaihoc={idBaihoc} idTracNghiem={idTracNghiem} />;
    }

    return (
        <div className="flex-grow lg:pr-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Bài Trắc Nghiệm</h2>
            <div className="space-y-8">
                {cauhois[currentQuestionIndex] && (
                    <form className="quiz-question shadow-md p-6 rounded-lg border border-gray-200 bg-white">
                        <h3 className="text-3xl font-semibold text-gray-700 mb-4">
                            Câu hỏi {currentQuestionIndex + 1}: {cauhois[currentQuestionIndex].question}
                        </h3>
                        <ul role="group" className="space-y-4">
                            {cauhois[currentQuestionIndex].answers.map((answer, answerIndex) => (
                                <li key={answerIndex} className="quiz-answer">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`answer-${currentQuestionIndex}`}
                                            checked={selectedAnswers[currentQuestionIndex] === answerIndex}
                                            onChange={() => handleAnswerSelect(currentQuestionIndex, answerIndex)}
                                            className="hidden"
                                        />
                                        <span
                                            className={`w-5 h-5 border rounded-full flex justify-center  items-center ${selectedAnswers[currentQuestionIndex] === answerIndex
                                                ? "border-primary"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {selectedAnswers[currentQuestionIndex] === answerIndex && (
                                                <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
                                            )}
                                        </span>
                                        <span className="text-gray-600 text-3xl">{answer.text}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </form>
                )}
            </div>

            {notification && (
                <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white p-4 text-center text-2xl">
                    {notification}
                </div>
            )}

            <div className=" bottom-0 left-0 right-0   p-4 flex justify-between items-center">
                <div className="w-full flex justify-center text-2xl">
                    {feedback && <p className="text-3xl text-gray-800">{feedback}</p>}
                </div>
                {!checkedAnswers[currentQuestionIndex] && (
                    <button
                        type="button"
                        className="px-4 py-2 bg-pink-700 w-60 text-2xl justify-center items-center text-white rounded-md hover:bg-pink-600"
                        onClick={handleCheckAnswer}
                    >
                        Kiểm tra đáp án
                    </button>
                )}
                {checkedAnswers[currentQuestionIndex] && currentQuestionIndex < cauhois.length - 1 && (
                    <button
                        type="button"
                        className="px-4 py-2 bg-primary w-40 text-white rounded-md hover:bg-primary-dark"
                        onClick={handleNextQuestion}
                    >
                        Tiếp tục
                    </button>
                )}
                {currentQuestionIndex === cauhois.length - 1 && checkedAnswers[currentQuestionIndex] && (
                    <button
                        type="button"
                        className="px-4 py-2 w-60 bg-pink-700 text-2xl text-white rounded-md hover:bg-pink-600"
                        onClick={handleSubmit}
                    >
                        Xem kết quả
                    </button>
                )}
            </div>
        </div>
    );
};

export { ShowTracNghiemComponent };