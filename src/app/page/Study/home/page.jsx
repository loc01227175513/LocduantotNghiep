"use client";
import React, { useState, useEffect, useRef ,useCallback} from 'react';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';

import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import { ThemKhoaHocDaHoc } from "../../../../service/course/course.service"
import Axios, { all } from 'axios';

export default function Page() {
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

    const playerRef = useRef(null);

    let parsedData = null;
    if (typeof window !== 'undefined' && window.localStorage) {
        const userData = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('data') : null;
        parsedData = JSON.parse(userData);
    }
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                             const response = await Axios.get(`https://huuphuoc.id.vn/api/Khoahocchitiet/${id}`, {
                  referrerPolicy: 'unsafe-url'
                });
                const khoahocData = response.data.khoahoc;
                setKhoahoc(khoahocData);

                if (khoahocData.baihocs.length > 0) {
                    const firstVideo = khoahocData.baihocs[0].video[0];
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
                    console.log('Request Data:', requestData);
    
                                      const response = await Axios.post('https://huuphuoc.id.vn/api/videodahoc', requestData, {
                      referrerPolicy: 'unsafe-url'
                    });
                    console.log("Video đã học", response);
    
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
    }, [parsedData, currentVideoId, setWatchedVideos, setIsVideoEnded]);



    const initializePlayer = useCallback(() => {
        if (typeof window !== 'undefined' && window.YT) {
            playerRef.current = new window.YT.Player('player', {
                events: {
                    onStateChange: onPlayerStateChange,
                },
                videoId: videoUrl.split('/').pop(),
            });
        } else if (typeof window !== 'undefined') {
            window.onYouTubeIframeAPIReady = () => {
                playerRef.current = new window.YT.Player('player', {
                    events: {
                        onStateChange: onPlayerStateChange,
                    },
                    videoId: videoUrl.split('/').pop(),
                });
            };
        }
    }, [videoUrl, onPlayerStateChange]);
    
    useEffect(() => {
        if (videoUrl) {
            initializePlayer();
        }
    }, [videoUrl, initializePlayer]);








    useEffect(() => {
        const checkVideoWatched = async () => {
            if (!currentVideoId || !khoahoc) {
                console.log('currentVideoId or khoahoc is not defined');
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
                            console.log('Checking video:', response.data.data);

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
    }, [currentVideoId, khoahoc, watchedVideos]);

    const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleClick = (videoLink, videoId) => {
        setVideoUrl(videoLink);
        setCurrentVideoId(videoId);
        setIsVideoEnded(false);
    };

    const handleComent = async (comment, rating) => {
        try {
            const userData = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('data') : null;
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
                if (typeof window !== 'undefined') {
                    window.location.reload();
                }
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

   const tongbaiHoc=  khoahoc ? khoahoc.baihocs.length : 'No data';
   const tongBaihOcDaHoc = Object.keys(watchedVideos).length;
    if(tongbaiHoc===tongBaihOcDaHoc){
        handleAddCourse();
    }
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen mt-60 mb-60">
            <div className="flex flex-col lg:flex-row">
                <div className="flex-grow lg:pr-8">
                    <div className="relative pb-[56.25%]">
                        <iframe
                            id="player"
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                            src={videoUrl ? `https://www.youtube.com/embed/${videoUrl}?enablejsapi=1` : ''}
                            allowFullScreen
                            title="YouTube Video"
                        />
                        {isVideoEnded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-200 bg-opacity-75 rounded-lg">
                                <span className="text-xl font-semibold text-green-800">Video đã xem xong!</span>
                            </div>
                        )}
                    </div>

                    {khoahoc && (
                        <>
                            <div className="mt-6 flex items-center justify-between border-b border-gray-300 pb-4">
                                <h1 className="text-4xl font-bold text-gray-900">{khoahoc.ten}</h1>
                                <p className="text-2xl font-semibold text-indigo-600">${khoahoc.gia}</p>
                            </div>
                            <section aria-labelledby="course-description" className="mt-6">
                                <Disclosure>
                                    <DisclosureButton className="w-full flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50">
                                        <span className="text-lg font-medium text-gray-800">Mô tả khóa học</span>
                                        <PlusIcon aria-hidden="true" className="h-5 w-5 text-gray-500 group-data-[open]:hidden" />
                                        <MinusIcon aria-hidden="true" className="h-5 w-5 text-gray-500 group-data-[open]:block hidden" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 px-4 py-2 bg-gray-50 rounded-lg shadow-inner">
                                        <p className="text-gray-700">{khoahoc.mota}</p>
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure as="div" className="mt-4">
                                    <DisclosureButton className="w-full flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50">
                                        <span className="text-lg font-medium text-gray-800">Bình luận</span>
                                        <PlusIcon aria-hidden="true" className="h-5 w-5 text-gray-500 group-data-[open]:hidden" />
                                        <MinusIcon aria-hidden="true" className="h-5 w-5 text-gray-500 group-data-[open]:block hidden" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 px-4 py-2 bg-gray-50 rounded-lg shadow-inner">
                                        {khoahoc.danhgia && khoahoc.danhgia.map((review) => (
                                            <div key={review.id} className="mb-4 p-4 bg-white rounded-lg shadow">
                                                <div className="flex items-center mb-2">
                                                    <p className="text-lg font-semibold text-yellow-500 mr-2">{review.rating} ★</p>
                                                    <p className="text-sm text-gray-500">by {review.user}</p>
                                                </div>
                                                <p className="text-gray-700">{review.comment}</p>
                                            </div>
                                        ))}
                                        <form
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                const comment = e.target.comment.value;
                                                const rating = e.target.rating.value;
                                                await handleComent(comment, rating);
                                            }}
                                            className="mt-4 space-y-4"
                                        >
                                            <div>
                                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                                    Comment
                                                </label>
                                                <textarea
                                                    id="comment"
                                                    name="comment"
                                                    rows="4"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                                    Rating
                                                </label>
                                                <select
                                                    id="rating"
                                                    name="rating"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                                    required
                                                >
                                                    <option value="">Select a rating</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </DisclosurePanel>
                                </Disclosure>
                                <div className="mt-6 space-y-2">
                                    <p className="text-lg font-medium text-gray-800">Instructor: <span className="font-normal text-gray-600">{khoahoc.giangvien}</span></p>
                                    <p className="text-lg font-medium text-gray-800">Category: <span className="font-normal text-gray-600">{khoahoc.theloai}</span></p>
                                    <p className="text-lg font-medium text-gray-800">Sub-category: <span className="font-normal text-gray-600">{khoahoc.theloaicon}</span></p>
                                    <p className="text-lg font-medium text-gray-800">Thời lượng: <span className="font-normal text-gray-600">{formatDuration(totalDuration)}</span></p>
                                </div>
                            </section>
                        </>
                    )}
                </div>
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900">Lessons</h2>
                            <div className="space-y-4">
                                {khoahoc && khoahoc.baihocs.map((lesson) => (
                                    <Disclosure key={lesson.id} as="div" className="border rounded-lg bg-white shadow">
                                        <h3 className="flow-root">
                                            <DisclosureButton className="flex w-full justify-between items-center px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-t-lg">
                                                <span className="font-medium">{lesson.ten}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 text-gray-500 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 text-gray-500 group-data-[open]:block hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="px-4 py-2">
                                            <div className="space-y-2">
                                                {lesson.video.map((video) => {
                                                    // Kiểm tra xem video đã được xem hay chưa
                                                    const isWatched = watchedVideos[video.id] ?? false;

                                                    return (
                                                        <div key={video.id} className="flex items-center">
                                                            <button
                                                                id={`check-${video.id}`}
                                                                aria-pressed={isWatched}  // Thiết lập trạng thái của nút theo `isWatched`
                                                                className={`h-4 w-4 border-2 rounded ${isWatched ? 'bg-blue-600 border-blue-600' : 'bg-indigo-600 border-indigo-600'} flex items-center justify-center`}
                                                                style={{ zIndex: 10, position: 'relative' }}
                                                            >
                                                                {/* Biểu tượng "đã xem" hoặc "chưa xem" */}
                                                                {isWatched ? '✔' : ''}
                                                            </button>
                                                            <div
                                                                className="flex justify-between items-center cursor-pointer ml-2 w-full px-2 py-1 rounded hover:bg-gray-100"
                                                                onClick={() => handleClick(video.url_link, video.id)}
                                                            >
                                                                <span className="text-sm text-gray-700">{video.ten}</span>
                                                                <span className="text-sm text-gray-500">{video.thoiluong}</span>
                                                            </div>
                                                            <span className="ml-2 text-sm font-medium">
                                                                {isWatched ? 'Đã xem' : 'Chưa xem'}
                                                            </span>
                                                        </div>
                                                       
                                                    );
                                                })}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                               
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
