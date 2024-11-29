"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';

import { PlusIcon, MinusIcon, XIcon } from '@heroicons/react/solid';
import { ChevronDownIcon, CheckIcon,CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion,AnimatePresence } from 'framer-motion';
import { ThemKhoaHocDaHoc } from "../../../../service/course/course.service";

import Axios from 'axios';
import Link from 'next/link';
// import { Link } from 'react-feather';


export default function Page() {
    const [isYTReady, setIsYTReady] = useState(false);  
    let id = null;
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id');
    }
    const [khoahoc, setKhoahoc] = useState(null);
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [watchedVideos, setWatchedVideos] = useState({});
    const [chitietkhoahoc,setChitietkhoahoc] = useState({})
    const [videotieptheo,setVideotieptheo] = useState({});
    const [baihoctieptheo,setBaihoctieptheo] = useState({});
    const [conbaihoc,setConbaihoc] = useState(true);
    const [convideo,setConvideo] = useState(true);

    const playerRef = useRef(null);

    let parsedData = null;
    if (typeof window !== 'undefined' && window.localStorage) {
        const userData = localStorage.getItem('data');
        parsedData = JSON.parse(userData);
    }

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.onload = () => {
            window.onYouTubeIframeAPIReady = () => {
                setIsYTReady(true);
            };
        };
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }, []);

    const getYouTubeVideoID = (url) => {
        try {
            // Check if URL is absolute
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        } catch (e) {
            // If URL constructor fails, assume url is a video ID
            console.error('Invalid URL:', url, 'Assuming it is a video ID.');
            return url;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`https://huuphuoc.id.vn/api/Khoahocchitiet/${id}`, {
                    referrerPolicy: 'unsafe-url'
                });
                const khoahocData = response.data.khoahoc;
                setKhoahoc(khoahocData);
                // console.log(khoahocData);
                

                if (khoahocData.baihocs.length > 0) {
                    const firstVideo = khoahocData.baihocs[0].video[0];
                    const firstBaifhoc = khoahocData.baihocs[0];
                    if (firstBaifhoc && firstBaifhoc.video.length > 0) {
                        const firstVideo = firstBaifhoc.video[0];
                        const tenbaihoc = firstBaifhoc.ten;
                        const motavideo = firstVideo.ten;
                        // console.log(tenbaihoc,motavideo);
                        
            
                        if (tenbaihoc && motavideo) {
                            setChitietkhoahoc(prevState => ({
                                ...prevState,
                                tenbaihoc: tenbaihoc,
                                motavideo: motavideo
                            }));
                            // console.log(chitietkhoahoc.tenbaihoc);
                            
                        }
                    }
                    if (firstVideo) {
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

        fetchData();
    }, [id]);

    // useEffect(() =>{
    //     console.log(" bai hoc tiep theo " );
    //     console.log(baihoctieptheo);
    //     console.log(conbaihoc);
        
    //     console.log("video tiep theo ");
    //     console.log(videotieptheo);
    //     console.log(convideo);
        
        
        
        
    // },[baihoctieptheo,videotieptheo])
    useEffect(() => {
        // console.log(chitietkhoahoc.tenbaihoc);
        if (khoahoc && Array.isArray(khoahoc.baihocs)) {
            // console.log(khoahoc.baihocs); 
        
            const baiHocIndex = khoahoc.baihocs.findIndex(baiHoc => baiHoc.ten === chitietkhoahoc.tenbaihoc);
            if (baiHocIndex === -1) {
                console.error('Không tìm thấy bài học phù hợp');
                return;
            }
            // console.log('Vị trí của bài học:', baiHocIndex);
        
            const videoIndex = khoahoc.baihocs[baiHocIndex].video.findIndex(video => video.ten === chitietkhoahoc.motavideo);
            if (videoIndex === -1) {
                console.error('Không tìm thấy video phù hợp trong bài học');
                return;
            }
            // console.log('Vị trí video:', videoIndex);
        
            const tongbaihoc = khoahoc.baihocs.length;
            // console.log('Tổng số bài học:', tongbaihoc);
        
            const tongVideoTrongBaiHoc = khoahoc.baihocs[baiHocIndex].video.length;
            // console.log('Tổng số video trong bài học hiện tại:', tongVideoTrongBaiHoc);
        
            if (baiHocIndex === tongbaihoc - 1 && videoIndex === tongVideoTrongBaiHoc - 1) {
                // console.log('Hết toàn bộ khóa học');
                setConbaihoc(false);
                setConvideo(false);
            } else if (videoIndex === tongVideoTrongBaiHoc - 1) {
                // console.log('Hết video trong bài học, chuyển sang bài học tiếp theo');
                setConbaihoc(true);
                setConvideo(false);
                setBaihoctieptheo(khoahoc.baihocs[baiHocIndex + 1]);
                setVideotieptheo(khoahoc.baihocs[baiHocIndex + 1].video[0]);

            } else {
                // console.log('Chuyển sang video tiếp theo trong bài học hiện tại');
                setConbaihoc(true);
                setConvideo(true);
                setVideotieptheo(khoahoc.baihocs[baiHocIndex].video[videoIndex + 1]);
                setBaihoctieptheo(khoahoc.baihocs[baiHocIndex]);

            }
        } else {
            // console.log('Không có bài học trong khoahoc hoặc baihocs không phải là mảng');
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
                    // console.log('Request Data:', requestData);

                    const response = await Axios.post('https://huuphuoc.id.vn/api/videodahoc', requestData, {
                        referrerPolicy: 'unsafe-url'
                    });
                    // console.log("Video đã học", response);

                    setWatchedVideos(prev => ({ ...prev, [currentVideoId]: true }));
                } catch (error) {
                    if (error.response) {
                        console.error('Error response:', error.response.data);
                        console.error('Error status:', error.response.status);
                        console.error('Error headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Error request:', error.request);
                    } else {
                        console.error('Error message:', error.message);
                    }
                    console.error('Error config:', error.config);
                }
            } else {
                console.error('Missing parsedData or currentVideoId');
            }
        }
    }, [parsedData, currentVideoId]);

    const initializePlayer = useCallback(() => {
        if (isYTReady && videoUrl) {
            // console.log('Initializing YouTube Player with URL:', videoUrl);
            const videoId = getYouTubeVideoID(videoUrl);
            // console.log('Extracted Video ID:', videoId);
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
            if (!currentVideoId || !khoahoc) {
                // console.log('currentVideoId or khoahoc is not defined');
                return;
            }

            try {
                const response = await Axios.get(`https://huuphuoc.id.vn/api/kiemtravidedahoc`, {
                    referrerPolicy: 'unsafe-url'
                });
                if (Array.isArray(response.data.data)) {
                    const updatedWatchedVideos = { ...watchedVideos };
                    khoahoc.baihocs.forEach((lesson) => {
                        lesson.video.forEach((video) => {
                            // console.log('Checking video:', video.id);

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
            }
        };

        checkVideoWatched();
    }, [currentVideoId, khoahoc,watchedVideos]);

    const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleClick = (videoLink, videoId,tenbaihoc,motavideo) => {
        setVideoUrl(videoLink);
        setCurrentVideoId(videoId);
        setIsVideoEnded(false);
        setChitietkhoahoc(prevState => ({
            ...prevState,
            tenbaihoc,
            motavideo
        }));
        // console.log(videoLink, videoId,tenbaihoc,motavideo);
        
                
    };

    const handleComent = async (comment, rating) => {
        try {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (!parsedData) {
                alert('User not found. Please log in.');
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
            if (err.response && err.response.status === 409) {
                alert('Course is already in the cart.');
            } else {
                console.error('Error adding course to cart:', err.response ? err.response.data : err.message);
                alert('Failed to add course to cart.');
            }
        }
    };

    const handleAddCourse = async () => {
        await ThemKhoaHocDaHoc();
    };

    // Sửa lại cách tính tổng số video
    const tongbaiHoc = khoahoc
        ? khoahoc.baihocs.reduce((acc, baihoc) => acc + baihoc.video.length, 0)
        : 'No data';
    const tongBaihOcDaHoc = Object.keys(watchedVideos).filter(video => watchedVideos[video]).length;

    useEffect(() => {
        if (tongbaiHoc !== 'No data' && tongbaiHoc === tongBaihOcDaHoc) {
            handleAddCourse();
        }
    }, [tongbaiHoc, tongBaihOcDaHoc]);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen mt-60 mb-60">
            <div className="flex flex-col lg:flex-row">
                {/* //video player */}
                <VideoPlayer videoUrl={videoUrl} isVideoEnded={isVideoEnded} khoahoc={khoahoc} formatDuration={formatDuration} totalDuration={totalDuration}  handleComent={handleComent} chitietkhoahoc={chitietkhoahoc} handleClick={handleClick} currentVideoId={currentVideoId} tenbaihoc={chitietkhoahoc.tenbaihoc} motavideo={chitietkhoahoc.motavideo} videotieptheo={videotieptheo} baihoctieptheo={baihoctieptheo} convideo={convideo} conbaihoc={conbaihoc}/>
                {/* //khoahoc */}
                <BaiHocDeHoc khoahoc={khoahoc} watchedVideos={watchedVideos} handleClick={handleClick} />
            </div>
        </div>
    );
}



const VideoPlayer = ({ videoUrl, isVideoEnded, khoahoc, formatDuration, totalDuration ,handleComent ,chitietkhoahoc,handleClick,currentVideoId,tenbaihoc,motavideo,videotieptheo,baihoctieptheo,convideo,conbaihoc}) => {
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
            // console.log(index);
            
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
            className="flex-grow lg:pr-8"
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
                    src={videoUrl ? `https://www.youtube.com/embed/${videoUrl}?enablejsapi=1` : ''}
                    allowFullScreen
                    title="YouTube Video"
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
                                <i class="bi bi-arrow-clockwise text-6xl hover:cursor-pointer mt-4" onClick={()=>handleClick(videoUrl,currentVideoId,tenbaihoc,motavideo)}>xem lại</i>
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
                        {/* tên bài học */}
                        <motion.h1 
                            className="text-4xl font-bold text-gray-900 hover:text-pink-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            {khoahoc.ten} <span>-</span> {chitietkhoahoc && chitietkhoahoc.tenbaihoc ? chitietkhoahoc.tenbaihoc : 'Loading...'} <span>:</span> {chitietkhoahoc && chitietkhoahoc.motavideo ? chitietkhoahoc.motavideo : 'Loading...'}





                        </motion.h1>
                       
                        {/* <motion.p 
                            className="text-2xl font-semibold text-indigo-600"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            ${khoahoc.gia}
                        </motion.p> */}

                        {!convideo && conbaihoc && (
                            <motion.div>
                                {baihoctieptheo &&(
                                    <div>
                                        <button onClick={() => handleClick(videotieptheo.url_link,videotieptheo.id,baihoctieptheo.ten,videotieptheo.ten)} className='bg-[#ff6b6b] p-3 text-xl rounded-lg text-white hover:bg-pink-700 '
                                            
                                            onMouseEnter={() => handleVideoHover(videotieptheo)}
                                            onMouseLeave={() => setPreviewVideo(null)}
                                            >

                                        bài học tiếp theo : {baihoctieptheo.ten}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {convideo && conbaihoc && (
                            <motion.div>
                                {videotieptheo &&(
                                    <div>
                                        <button onClick={() => handleClick(videotieptheo.url_link,videotieptheo.id,baihoctieptheo.ten,videotieptheo.ten)} className='bg-[#ff6b6b] p-3 text-xl rounded-lg text-white hover:bg-pink-700'
                                            
                                            
                                            onMouseEnter={() => handleVideoHover(videotieptheo)}
                                            onMouseLeave={() => setPreviewVideo(null)}
                                            >
                                            video tiếp theo : {videotieptheo.ten} 
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {!convideo && !conbaihoc &&(
                            <motion.div>
                                <div>
                                    <p className='text-green-400 text-2xl'>Hết <i class="bi bi-check-lg"></i></p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
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
                    className={`h-6 w-6 transform transition-all duration-200
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
            className="ml-2 text-sm font-medium text-gray-600"
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
                className="text-center py-8 px-4 bg-gray-50 rounded-lg mt-4"
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
                <p className="text-gray-500 font-medium">Chưa có bình luận nào.</p>
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
                                <span className="font-semibold text-gray-800">{comment.user}</span>
                                <p className="text-xs text-gray-500">
                                    {comment.date && formatTimeAgo(new Date(comment.date))}
                                </p>
                            </div>
                        </div>
                        <StarRating rating={comment.rating} />
                    </motion.div>
                    <motion.p 
                        className="text-gray-700 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {comment.comment}
                    </motion.p>
                    <motion.div 
                        className="mt-4 flex items-center space-x-4 text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>Hữu ích</span>
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span>Trả lời</span>
                        </motion.button>
                    </motion.div>
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
                            className='text-xl'
                        >
                            {content}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);



const CommentForm = ({ comment, rating, isSubmitting, onCommentChange, onRatingChange, onSubmit ,handleClickrating}) => (

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
            <label htmlFor="comment" className="block text-xl font-medium text-gray-700">
                Điền bình luận
            </label>
            <motion.textarea
                id="comment"
                value={comment}
                onChange={onCommentChange}
                rows="4"
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm 
                    focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-all duration-200
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
            <label htmlFor="rating" className="block text-xl font-medium text-gray-700">
                Đánh giá
            </label>
            {/* <motion.div
                id="rating"
                value={rating}
                onChange={onRatingChange}
                whileFocus={{ scale: 1.01 }}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm 
                    focus:border-indigo-500 focus:ring-indigo-500 p-2 transition-all duration-200
                    hover:border-indigo-300"
                required
                disabled={isSubmitting}
            >
                
                {[1, 2, 3, 4, 5].map(num => (
                    // <option key={num} value={num}>{num} sao</option>
                     <i key={num}  value={num} class="bi bi-star text-yellow-400 mr-2"></i>
                ))}
            </motion.div> */}
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
                    className={`bi ${rating >= num ? 'bi-star-fill text-yellow-500' : 'bi-star text-gray-400'} mr-2 cursor-pointer`}
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
                ${isSubmitting ? 'bg-indigo-400' : 'bg-[#ff6b6b] hover:bg-pink-700'}
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
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
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
    

















const BaiHocDeHoc = ({ khoahoc, watchedVideos, handleClick }) => {
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [isMiniplayer, setIsMiniplayer] = useState(false);
    const [previewVideo, setPreviewVideo] = useState(null);

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
                                            <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-medium text-gray-900">{lesson.ten}</span>
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
                                                                    onClick={() => handleClick(video.url_link, video.id,lesson.ten,video.ten)}
                                                                >
                                                                    <div className={`
                                                                        h-5 w-5 rounded-full flex items-center justify-center
                                                                        ${isWatched ? 'bg-green-500' : 'bg-gray-200'}
                                                                        transition-colors duration-200
                                                                    `}>
                                                                        {isWatched && <CheckIcon className="h-3 w-3 text-white" />}
                                                                    </div>
                                                                    <div className="ml-3 flex-1">
                                                                        <div className="flex justify-between">
                                                                            <span className={`text-xl font-semibold ${isWatched ? 'text-gray-500' : 'text-gray-900'}`}>
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
                                                        {/* <Link href={'/'} className=''> */}


{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                        <Disclosure >
                                {({ open }) => (
                                    <motion.div
                                        variants={itemVariants}
                                        className=" rounded-lg bg-white shadow-sm transition-all duration-200 text-xl font-bold"
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <h3 className="flow-root">
                                            <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-gray-500 ">
                                               <div className=''>
                                               <i class="bi bi-pen-fill mr-2 text-xl"></i> bài quiz 
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
                                                    <div>
                                                        <p className='text-xl font-normal text-[#ff6b6b]'>bài quiz số 1</p>
                                                        <div>
                                                            <p className='text-xl font-normal text-gray-500 indent-2'> sau bài quiz này bạn sẽ akjshd áh ákjh ákha skhas k áhid kjshd </p>
                                                            <button className='bg-[#ff6b6b] mt-2 p-2 text-xl text-white font-normal rounded-lg hover:bg-pink-600'>Làm</button>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </Disclosure>



















{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                                            
                                                        {/* </Link> */}
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
