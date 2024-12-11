"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sortable from 'sortablejs';
import { TaoBaiTracNghiem, ShowTracNghiem, TaoCauHoi, XoaCauHoi, XoaPhanTracNghiem, ShowCauHoi } from "@/service/TaoBaiTracNghiem/TaoBaiTracNghiem"
import Image from "next/image";







const RenderQuizItems = ({ quizItems, subItemsLength ,handleExpandLesson}) => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questions, setQuestions] = useState([{ title: '', answers: [{ text: '', is_correct: 0 }] }]);
  const [BaihocidNe, setBaihocidNe] = useState(null);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState({});
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  const handleAddQuestion = async () => {
    const validQuestions = questions.filter(q => q.title.trim() && q.answers.some(a => a.text.trim()));
    const hasCorrectAnswer = questions.some(q => q.answers.some(a => a.is_correct === 1));

    if (!hasCorrectAnswer) {
      alert('Please select at least one correct answer.');
      return;
    }

    if (validQuestions.length > 0) {
      try {
        for (const question of validQuestions) {
          await TaoCauHoi({
            id_baihoc: BaihocidNe,
            id_baitracnghiem: currentQuizId,
            cau_hoi: question.title,
            cau_traloi: question.answers,
          });
        }
        setIsQuestionModalOpen(false);
        setQuestions([{ title: '', answers: [{ text: '', is_correct: 0 }] }]);
      } catch (error) {
        console.error('Error adding question:', error);
      }
    } else {
      console.warn('Title or answer is empty');
    }
  };

  const openModal = (baihocId, quizId) => {
    setBaihocidNe(baihocId);
    setCurrentQuizId(quizId);
    setIsQuestionModalOpen(true);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddMoreFields = () => {
    setQuestions([...questions, { title: '', answers: [{ text: '', is_correct: 0 }] }]);
  };

  const handleRemoveField = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push({ text: '', is_correct: 0 });
    setQuestions(newQuestions);
  };

  const handleRemoveAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.splice(aIndex, 1);
    setQuestions(newQuestions);
    handleExpandLesson(BaihocidNe);
  };

  const handleCorrectAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.map((a, index) => ({
      ...a,
      is_correct: index === aIndex ? 1 : 0
    }));
    setQuestions(newQuestions);
  };

  const handleDeleteQuizItem = async (id_baihoc, id_baitracnghiem) => {
    try {
      await XoaPhanTracNghiem({
        id_baihoc: id_baihoc,
        id_baitracnghiem: id_baitracnghiem,
      });
      handleExpandLesson(id_baihoc);
    } catch (error) {
      handleExpandLesson(id_baihoc);
      console.error('Error deleting quiz item:', error);
    }
  };

  const toggleShowQuestions = async (quizId, BaihocidNe) => {
    if (!BaihocidNe) {
      console.error('BaihocidNe is null');
      return;
    }

    if (quizQuestions[quizId]) {
      setQuizQuestions(prev => ({ ...prev, [quizId]: null }));
      setShowQuestionsModal(false);
    } else {
      try {
        const questions = await ShowCauHoi(BaihocidNe, quizId);
        const additionalInfo = { BaihocidNe, quizId }; // Add any additional information here
        setQuizQuestions(prev => ({ ...prev, [quizId]: questions }));
        setCurrentQuestions({ questions: questions.questions, ...additionalInfo });
        setShowQuestionsModal(true);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
  };

  const handleDeleteQuestion = async (BaihocidNe, quizId, hoiIndex) => {
    try {
      await XoaCauHoi({ BaihocidNe, quizId, hoiIndex });
      setShowQuestionsModal(false);
      handleExpandLesson(BaihocidNe);
    } catch (error) {
      handleExpandLesson(BaihocidNe);
    }
  };

  return (
    <>
      {quizItems.map((quiz, quizIndex) => (
        <Draggable
          key={`quiz-${quiz.id}`}
          draggableId={`quiz-${quiz.id}`}
          index={quizIndex + subItemsLength}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              data-id={quiz.id}
            >
              {quiz.noidung && quiz.noidung.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className="flex items-center mt-2 justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200"
                >
                  <span className="text-gray-700 font-medium text-[14px]">
                    {itemIndex + 1}. Quiz: {item.tieu_de}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 text-[14px] w-60  text-black bg-slate-100 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => toggleShowQuestions(item.id_baitracnghiem, quiz.id_baihoc)}
                    >
                      {quizQuestions[item.id_baitracnghiem] ? 'Ẩn câu hỏi' : 'Hiện câu hỏi'}
                    </button>
                    <button
                      className="px-3 py-1 text-[14px] w-60 text-black bg-slate-100 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => openModal(quiz.id_baihoc, item.id_baitracnghiem)}
                    >
                      Thêm câu hỏi
                    </button>

                    <button
                      className="px-3 py-1 text-[14px] w-36 text-red-600 bg-slate-100 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => handleDeleteQuizItem(quiz.id_baihoc, item.id_baitracnghiem)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
              {quizQuestions[quiz.id] && (
                <div className="mt-2">
                  {quizQuestions[quiz.id].questions.map((question, qIndex) => (
                    <div key={qIndex} className="p-2 border border-gray-300 rounded mb-2 bg-gray-100">
                      <div className="font-medium text-gray-800">{qIndex + 1}. {question.cau_hoi}</div>
                      <div className="text-gray-600">
                        {question.cau_traloi.map((answer, aIndex) => (
                          <div key={aIndex} className="ml-4">
                            {aIndex + 1}. {answer.text} {answer.is_correct === 1 ? '(Đúng)' : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Draggable>
      ))}
      {isQuestionModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
          <div className="p-5 bg-white rounded-lg relative w-[500px]">
            <button
              onClick={() => setIsQuestionModalOpen(false)}
              className="absolute top-0 right-2  text-[30px] w-10 h-10 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="mb-4 text-[16px]  text-black">Nhập câu hỏi trắc nghiệm mới</h2>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-6">
                <div className="font-medium text-[14px]  text-gray-700 mb-2">Câu hỏi số {qIndex + 1}</div>
                <input
                  type="text"
                  value={question.title}
                  onChange={(e) => handleQuestionChange(qIndex, 'title', e.target.value)}
                  className="w-full p-2 text-[14px] placeholder:text-[14px] border border-black"
                  placeholder={`Nhập câu hỏi số ${qIndex + 1}`}
                />
                {question.answers.map((answer, aIndex) => (
                  <div key={aIndex} className="mt-2">
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value)}
                      className="w-full p-2 text-[14px] placeholder:text-[14px] border  border-black"
                      placeholder={`Nhập câu trả lời số ${aIndex + 1}`}
                    />
                     <button
                      onClick={() => handleCorrectAnswer(qIndex, aIndex)}
                      className={`px-4 py-1 mt-2 text-[13px] rounded-lg ${answer.is_correct === 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                      {answer.is_correct === 1 ? 'Đáp án đúng' : 'Chọn đáp án đúng'}
                    </button>
                    <button
                      onClick={() => handleRemoveAnswer(qIndex, aIndex)}
                      className="px-4 py-1 mt-2 text-[13px] text-red-600   rounded-lg"
                    >
                      Xóa câu trả lời
                    </button>
                   
                  </div>
                ))}
                <button
                  onClick={() => handleAddAnswer(qIndex)}
                  className="px-4 py-2 mt-4 text-[14px] text-pink-700 border-[1px] border-solid border-pink-700 rounded-lg"
                >
                  + Thêm câu trả lời
                </button>
                {qIndex < questions.length - 1 && (
                  <div className="border-b text-[14px] border-gray-300 mt-4"></div>
                )}
              </div>
            ))}
            <hr className="mt-4 border-gray-300" />
            <button
              onClick={() => handleAddMoreFields()}
              className="px-4 py-2 mb-5 mt-4 text-white bg-pink-700 text-[14px] rounded-lg"
            >
              + Thêm câu hỏi
            </button>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-2 mr-2 text-[14px] bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAddQuestion}
                className="p-2 text-[14px] text-white bg-pink-700 rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      {showQuestionsModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
          <div className="p-5 bg-white rounded-lg relative w-[80%] h-[80%]">
            <button
              onClick={() => setShowQuestionsModal(false)}
              className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-[24px] text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-full shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              &times;
            </button>
            <h2 className="mb-4 text-[14px]  text-black">Danh sách câu hỏi</h2>
            <div className="overflow-y-auto h-full">
              {currentQuestions.questions.map((question, qIndex) => (
                <div key={qIndex} className="p-2 border text-[14px] border-gray-300 rounded mb-4 bg-gray-100">
                  {Array.isArray(question.cau_hoi) && question.cau_hoi.map((hoi, hoiIndex) => (
                    <div key={hoiIndex} className="mb-4">
                      <div className="flex justify-between items-center font-medium text-gray-800 mb-2 text-[14px]">
                        {qIndex + 1}.{hoiIndex + 1} {hoi}
                        <button
                          onClick={() => handleDeleteQuestion(currentQuestions.BaihocidNe, currentQuestions.quizId, hoiIndex)}
                          className="px-3 py-1 text-[14px] w-20 text-red-600 bg-slate-200 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                      <div className="text-gray-600 text-[14px] ml-4">
                        {Array.isArray(question.cau_traloi) && question.cau_traloi[hoiIndex] && question.cau_traloi[hoiIndex].map((answer, aIndex) => (
                          <div key={answer.stt} className="ml-2 text-[14px]">
                            {aIndex + 1}. {answer.text} {answer.is_correct === 1 ? '(Đúng)' : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const DanhSachURL = ({ urls, onClose, handleDeleteUrl }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 350, y: 10 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Get window dimensions
    const maxX = window.innerWidth - containerRef.current.offsetWidth;
    const maxY = window.innerHeight - containerRef.current.offsetHeight;

    // Constrain position within window bounds
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: constrainedX, y: constrainedY });
  }, [isDragging, dragOffset]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL đã được sao chép!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Không thể sao chép đường dẫn. Vui lòng thử lại.');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed bg-white shadow-lg rounded-lg p-6 z-50 w-[300px] cursor-${isDragging ? 'grabbing' : 'grab'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[14px] font-semibold">Danh sách URL</h2>
        <button
          onClick={onClose}
          className="text-black text-[14px] w-20 hover:text-red-700 transition-colors"
        >
          Đóng
        </button>
      </div>
      {urls.length === 0 ? (
        <p className="text-gray-500">Không có URL nào.</p>
      ) : (
        urls.map(({ url, title }, index) => (
          <div key={index} className="mb-3 p-2 bg-gray-100 rounded-lg shadow-sm">
            <div className="font-medium text-gray-800 text-[14px]">{title}</div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-[14px]"
            >
              {url}
            </a>
            <div className="flex justify-between mt-2 text-[14px]">
              <button
                onClick={() => copyToClipboard(url)}
                className="text-black bg-slate-200 p-1 rounded-md m-1 hover:text-pink-700 transition-colors"
              >
                Sao chép URL
              </button>
              <button
                onClick={() => handleDeleteUrl(url)}
                className="text-black bg-slate-200 p-1 rounded-md m-1  hover:text-red-700 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const LayvideoKhoaHoc = () => {
  const API_KEY = "AIzaSyBp5InFSDElAVnQ2uNGZQV7Ws-AXH2c6N8"; // Ensure you've added this to your .env.local file
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedVideoId, setCopiedVideoId] = useState(null);
  const [trolai, setTrolai] = useState(false);
  const [showUrlList, setShowUrlList] = useState(false);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    // Load URLs from localStorage on component mount
    const storedUrls = JSON.parse(localStorage.getItem('videoUrls')) || [];
    setUrls(storedUrls);
  }, []);
  if (trolai) {
    return (
      <BaiHoc />
    )
  }

  const searchYouTube = async () => {
    if (!query.trim()) {
      alert('Vui lòng nhập nội dung tìm kiếm!');
      return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}&maxResults=10`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setError('Đã xảy ra lỗi khi tìm kiếm video. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, videoId, title) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedVideoId(videoId);

      // Add the copied URL and title to localStorage
      const updatedUrls = [...urls, { url: text, title }];
      setUrls(updatedUrls);
      localStorage.setItem('videoUrls', JSON.stringify(updatedUrls));

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedVideoId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Không thể sao chép đường dẫn. Vui lòng thử lại.');
    }
  };
  const handleDeleteUrl = (urlToDelete) => {
    const updatedUrls = urls.filter(urlObj => urlObj.url !== urlToDelete);
    setUrls(updatedUrls);
    localStorage.setItem('videoUrls', JSON.stringify(updatedUrls));
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full mx-auto">
      <h2 className="text-[16px] font-semibold mb-4 text-center">Tìm kiếm Video Khoá Học</h2>
      <button
        type="button"
        onClick={() => setTrolai(true)}
        className="bg-slate-200 w-52 mb-10 text-[14px] text-gray-700 py-2 px-4 rounded-md transition-colors duration-300"
      >
        Trở lại
      </button>
      <button
        type="button"
        onClick={() => setShowUrlList(!showUrlList)}
        className="bg-pink-600 hover:bg-pink-700 text-[14px] w-72 mb-2 ml-2 text-white py-2 px-4 rounded-md transition-colors duration-300"
      >
        {showUrlList ? 'Ẩn Danh Sách URL' : 'Hiện Danh Sách URL'}
      </button>
      {showUrlList && <DanhSachURL urls={urls} onClose={() => setShowUrlList(false)} handleDeleteUrl={handleDeleteUrl} />}
      <div className="search-container flex items-center space-x-2 mb-6 text-[14px] placeholder:text-[14px] rounded-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập nội dung tìm kiếm"
          className="flex-grow p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              searchYouTube();
            }
          }}
        />
        <button
          onClick={searchYouTube}
          className={`bg-pink-600 hover:bg-pink-700 w-60 text-[14px] text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
        </button>
      </div>
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}
      <div className="video-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 && !loading && !error ? (
          <p className="text-center text-gray-500 col-span-full">Không có video nào được hiển thị.</p>
        ) : (
          videos.map((video) => (
            <div key={video.id.videoId} className="video bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                <Image width={100} height={50}
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </a>
              <h3 className="text-lg font-semibold mb-2">{video.snippet.title}</h3>
              <p className="text-gray-600 mb-4">{video.snippet.channelTitle}</p>
              <button
                onClick={() => copyToClipboard(`https://www.youtube.com/watch?v=${video.id.videoId}`, video.id.videoId, video.snippet.title)}
                className="text-pink-600 hover:underline font-medium focus:outline-none"
              >
                {copiedVideoId === video.id.videoId ? 'Đã sao chép!' : 'Sao chép link video'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};






//tao noi dung bai hoc
const NoiDungBaiHoc = ({
  items,
  setItems,
  setIsSubModalOpen,
  setCurrentItemId,
  handleRemoveItem,
  handleRemoveSubItem,
  currentSubItemId,
  currentItemId,
  id,
  setIsModalOpen,
  handleAddItem,
  newItemName,
  setNewItemName,
  isModalOpen,
  handleAddSubItem,
  isSubModalOpen,
  newSubItemName,
  setNewSubItemName,
  handleExpandLesson,
  isContentModalOpen,
  setIsContentModalOpen,
  newContentUrl,
  setNewContentUrl,
  handleAddContent,
  extractVideoId,
  setCurrentSubItemId,
  handleMoveSubItem,
  updateSubItemOrder,
  updateSubItemParent,
  setExpandedLessons,
  setQuestionData,
  questionData,
  expandedLessons, // Receive expandedLessons as a prop
}) => {
  const onDragEnd = (result) => {
    const { source, destination, type } = result;




    if (!destination) return;

    if (type === 'lesson') {
      const reorderedItems = Array.from(items);
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);
      setItems(reorderedItems);
      updateLessonOrder(reorderedItems);
      return;
    }

    if (type === 'subItem') {
      const sourceLessonIndex = items.findIndex(item => item.id.toString() === source.droppableId);
      const destinationLessonIndex = items.findIndex(item => item.id.toString() === destination.droppableId);

      if (sourceLessonIndex === -1 || destinationLessonIndex === -1) {
        console.error('Invalid droppableId');
        return;
      }

      const sourceSubItems = Array.from(items[sourceLessonIndex].subItems);
      const [movedSubItem] = sourceSubItems.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceSubItems.splice(destination.index, 0, movedSubItem);
        const updatedItems = Array.from(items);
        updatedItems[sourceLessonIndex].subItems = sourceSubItems;
        setItems(updatedItems);

        updateSubItemOrder(source.droppableId, null);
      } else {
        const destinationSubItems = Array.from(items[destinationLessonIndex].subItems);
        destinationSubItems.splice(destination.index, 0, movedSubItem);
        const updatedItems = Array.from(items);
        updatedItems[sourceLessonIndex].subItems = sourceSubItems;
        updatedItems[destinationLessonIndex].subItems = destinationSubItems;
        setItems(updatedItems);
        handleExpandLesson(destination.droppableId);
        updateSubItemOrder(source.droppableId, null);
        updateSubItemOrder(destination.droppableId, null);
        updateSubItemParent(movedSubItem.id, destination.droppableId);
      }
    }
  };

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionDescription, setNewQuestionDescription] = useState('');
  const [showUrlList, setShowUrlList] = useState(false);
  const [urls, setUrls] = useState([]);
  const [layVideoKhoaHoc, setLayvideoKhoaHoc] = useState(false);

  const handleAddQuestion = useCallback(async (itemId) => {
    if (newQuestionTitle && newQuestionDescription && newQuestionTitle.trim() && newQuestionDescription.trim()) {
      try {
        await TaoBaiTracNghiem({
          id_baihoc: itemId,
          tieu_de: newQuestionTitle,
          mo_ta: newQuestionDescription,
        });
        handleExpandLesson(itemId);
        setIsQuestionModalOpen(false);
      } catch (error) {
        setIsQuestionModalOpen(false);
        handleExpandLesson(itemId);
      }
    } else {
      handleExpandLesson(itemId);
      setIsQuestionModalOpen(false);
    }
  }, [newQuestionTitle, newQuestionDescription, handleExpandLesson]);

  useEffect(() => {
    // Load URLs from localStorage on component mount
    const storedUrls = JSON.parse(localStorage.getItem('videoUrls')) || [];
    setUrls(storedUrls);
  }, []);

  // Render the LayvideoKhoaHoc component conditionally
  if (layVideoKhoaHoc) {
    return <LayvideoKhoaHoc />;
  }
  const handleDeleteUrl = (urlToDelete) => {
    const updatedUrls = urls.filter(urlObj => urlObj.url !== urlToDelete);
    setUrls(updatedUrls);
    localStorage.setItem('videoUrls', JSON.stringify(updatedUrls));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setLayvideoKhoaHoc(true)}
          className="bg-pink-600 hover:bg-pink-700 w-[178px] text-white  py-2.5 px-6 rounded-md  transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 text-[14px]"
        >
          <i className="fas fa-video"></i>
          Lấy video khoá học
        </button>
        <button
          type="button"
          onClick={() => setShowUrlList(!showUrlList)}
          className="border border-pink-600 text-pink-700 hover:bg-pink-500 hover:text-white w-[178px]  py-2.5 px-6 rounded-md transition-colors duration-300 text-[14px]"
        >
          {showUrlList ? 'Ẩn Danh Sách URL' : 'Hiện Danh Sách URL'}
        </button>
      </div>
      {showUrlList && <DanhSachURL urls={urls} onClose={() => setShowUrlList(false)} handleDeleteUrl={handleDeleteUrl} />}
      <Droppable droppableId="lessons" type="lesson">
        {(provided) => (
          <div
            id="hs-nested-sortable"
            className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.length === 0 ? (
              <div className="p-4 text-gray-500 text-center border-2 border-dashed border-gray-200 rounded-lg">
                No lessons available. Click &quot;Thêm Phần&quot; to add your first lesson.
              </div>
            ) : (
              items.map((item, index) =>
                item && item.name && (
                  <Draggable key={`lesson-${item.id}`} draggableId={`lesson-${item.id}`} index={index}>
                    {(provided) => (
                      <div
                        className="mb-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className="flex items-center justify-between p-4 bg-gradient-to-r  from-gray-100 to-gray-100"
                          {...provided.dragHandleProps}
                        >
                          <span className="font-thin text-black text-[16px]">{item.name}</span>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleExpandLesson(item.id)}
                              className="px-3 py-1.5 text-[14px]   w-40 text-black bg-white rounded-md hover:bg-pink-400 transition-colors"
                            >
                              Mở rộng
                            </button>
                            <button
                              onClick={() => {
                                setIsSubModalOpen(true);
                                setCurrentItemId(item.id);
                              }}
                              className="px-3 py-1.5 text-[14px] w-60  text-black bg-white rounded-md hover:bg-pink-50 transition-colors"
                            >
                              + Thêm video
                            </button>


                            <button
                              onClick={() => {
                                setIsQuestionModalOpen(true);
                                setCurrentItemId(item.id);
                              }}
                              className="px-3 py-1.5 w-60  text-[14px]  text-black bg-white rounded-md hover:bg-green-50 transition-colors"
                            >
                              + Thêm trắc nghiệm
                            </button>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="px-3 py-1.5 text-[14px]  w-40 text-black bg-white rounded-md hover:bg-red-400 transition-colors"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>

                        {expandedLessons[item.id] && (
                          <Droppable droppableId={`${item.id}`} type="subItem">
                            {(provided) => (
                              <div
                                className="p-4 space-y-3"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                data-parent-id={item.id}
                              >
                                {item.subItems.map((subItem, subIndex) =>
                                  subItem && subItem.name && (
                                    <Draggable key={`subItem-${subItem.id}`} draggableId={`subItem-${subItem.id}`} index={subIndex}>
                                      {(provided) => (
                                        <div
                                          className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          data-id={subItem.id}
                                        >
                                          <span className="text-gray-700 font-medium text-[14px]">{subItem.name}</span>
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={() => {
                                                setIsContentModalOpen(true);
                                                setCurrentSubItemId(subItem.id);
                                              }}
                                              className="px-3 py-1 w-40 text-[12px] text-black  bg-slate-100 rounded-md hover:bg-gray-100 transition-colors"
                                            >
                                              Nội Dung
                                            </button>
                                            <button
                                              onClick={() => handleRemoveSubItem(item.id, subItem.id)}
                                              className="px-3 py-1 w-40  text-[14px] text-red-700 bg-slate-100 rounded-md hover:bg-gray-100 transition-colors"
                                            >
                                              Xóa
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                                <RenderQuizItems quizItems={questionData[item.id]} subItemsLength={item.subItems.length} handleExpandLesson={handleExpandLesson} />
                              </div>
                            )}
                          </Droppable>
                        )}
                      </div>
                    )}
                  </Draggable>
                )
              )
            )}
            {provided.placeholder}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 mt-6 text-[14px] text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-md font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
            >
              + Thêm Phần Mới
            </button>
            {isModalOpen && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
                <div className="p-5 bg-white rounded-lg  w-[500px]">
                  <h2 className="mb-4 text-[14px]  text-black">Nhập tên phần mới</h2>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full  p-2 text-[14px] placeholder:text-[14px] bg-red-500 border border-black"
                    placeholder="Tên phần"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 mr-2 bg-gray-300 rounded text-[14px]"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleAddItem}
                      className="p-2 text-white bg-pink-500 rounded text-[14px]"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isSubModalOpen && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
                <div className="p-5 bg-white rounded-lg w-[500px]">
                  <h2 className="mb-4 text-[14px]  text-black">Nhập tên video mới</h2>
                  <input
                    type="text"
                    value={newSubItemName}
                    onChange={(e) => setNewSubItemName(e.target.value)}
                    className="w-full p-2 text-[14px] placeholder:text-[14px] bg-red-500 border border-black"
                    placeholder="Tên video"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsSubModalOpen(false)}
                      className="p-2 mr-2 bg-gray-300 rounded text-[14px]"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddSubItem(currentItemId)}
                      className="p-2 text-[14px] text-white bg-pink-500 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isContentModalOpen && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
                <div className="p-5 bg-white rounded-lg w-[500px]">
                  <h2 className="mb-4 text-[14px] text-black">Nhập URL nội dung mới</h2>
                  <input
                    type="text"
                    value={newContentUrl}
                    onChange={(e) => setNewContentUrl(e.target.value)}
                    className="w-full p-2 mt-2 bg-red-500 border border-black placeholder:text-[14px] text-[14px]"
                    placeholder="URL"
                  />
                  {newContentUrl && (
                    <iframe
                      id="youtube-player"
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${extractVideoId(newContentUrl)}?enablejsapi=1`}
                      title="YouTube Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}

                  <div className="flex justify-end mt-4 text-[14px]">
                    <button
                      onClick={() => setIsContentModalOpen(false)}
                      className="p-2 mr-2 bg-gray-300 rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddContent(currentSubItemId)}
                      className="p-2 text-white bg-pink-500 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isQuestionModalOpen && (
              <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 modal">
                <div className="p-5 bg-white rounded-lg w-[500px]">
                  <h2 className="mb-4 text-[14px]  text-black">Nhập câu hỏi trắc nghiệm mới</h2>
                  <input
                    type="text"
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                    className="w-full p-2 text-[14px] placeholder:text-[14px] bg-red-500 border text-xl "
                    placeholder="Tiêu đề"
                  />
                  <textarea
                    value={newQuestionDescription}
                    onChange={(e) => setNewQuestionDescription(e.target.value)}
                    className="w-full p-2 mt-2 border text-[14px] placeholder:text-[14px] "
                    placeholder="Mô tả"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsQuestionModalOpen(false)}
                      className="p-2 mr-2 bg-gray-300 rounded text-[14px]"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleAddQuestion(currentItemId)}
                      className="p-2 text-[14px] text-white bg-pink-500 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};


//Xu ly du lieu bai hoc
const BaiHoc = () => {
  const [id, setId] = useState(null);
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newSubItemName, setNewSubItemName] = useState("");
  const [newContentUrl, setNewContentUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentSubItemId, setCurrentSubItemId] = useState(null);
  const [expandedLessonId, setExpandedLessonId] = useState(null);
  const [duration, setDuration] = useState(null);
  const [highestId, setHighestId] = useState(0);
  const [questionData, setQuestionData] = useState({});
  const [expandedLessons, setExpandedLessons] = useState({});

  //lay id khoa hoc
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const idFromUrl = url.searchParams.get("id");
      setId(idFromUrl);
      // console.log("id:", idFromUrl);
    }
  }, []);

  //lay danh sach bai hoc
  useEffect(() => {
    const fetchLessons = async () => {
      if (id) {
        try {
          const response = await Axios.post(
            "https://huuphuoc.id.vn/api/showBaiHoc",
            { id_khoahoc: id },
            { referrerPolicy: 'unsafe-url' }
          );

          const lessons = response.data.data.map((lesson) => ({
            id: lesson.id,
            name: lesson.ten,
            subItems: lesson.subItems || [],
          }));
          setItems(lessons);

          const maxId = lessons.reduce(
            (max, lesson) => (lesson.id > max ? lesson.id : max),
            0
          );
          setHighestId(maxId);
        } catch (error) {
          console.log(error);
        } 
      }
    };

    fetchLessons();
  }, [id]);
  const fetchSubItems = useCallback(async (id_baihoc) => {
    try {
      const response = await Axios.post(
        "https://huuphuoc.id.vn/api/ShowSubBaiHoc",
        {
          id_baihoc: id_baihoc,
        },
        {
          referrerPolicy: 'unsafe-url'
        }
      );

      const subItems = response.data.data.map((subItem) => ({
        id: subItem.id,
        name: subItem.ten,
      }));

      setItems(
        items.map((item) => {
          if (item && item.id === id_baihoc) {
            return {
              ...item,
              subItems: subItems,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error fetching sub items:", error);
    }
  }, [items]);
  const handleExpandLesson = useCallback(async (itemId) => {
    const data = await ShowTracNghiem({ id_baihoc: itemId });
    setQuestionData((prevData) => ({
      ...prevData,
      [itemId]: data,
    }));
    setExpandedLessons((prevExpandedLessons) => ({
      ...prevExpandedLessons,
      [itemId]: true,
    }));
    setExpandedLessonId(itemId);
    fetchSubItems(itemId);
  }, [fetchSubItems, setExpandedLessonId]);
  //cap nhat thu tu bai hoc
  const updateLessonOrder = useCallback(async (reorderedItems) => {
    try {
      const lessons = reorderedItems
        .filter((item) => item && item.id)
        .map((item, index) => ({
          id_baihoc: item.id,
          id_khoahoc: id,
          order: index + 1,
        }));

      // console.log("Dữ liệu gửi lên:", { baihocs: lessons, id_khoahoc: id });  

      await Axios.post(
        "https://huuphuoc.id.vn/api/keoThaBaiHoc",
        { baihocs: lessons },
        { referrerPolicy: 'unsafe-url' }
      );
      handleExpandLesson(id);
      // console.log("Cập nhật thứ tự thành công!");
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else {
        console.error("Error updating lesson order:", error);
      }
    }
  }, [id, handleExpandLesson]);
  //cap nhat thu tu sub item
  const updateSubItemOrder = useCallback(async (parentId, container) => {
    try {
      const subItems = items.find(item => item.id.toString() === parentId.toString()).subItems;

      const orderedSubItems = subItems.map((subItem, index) => ({
        id_video: subItem.id,
        order: index + 1,
        id_baihoc: parentId,
      }));

      // console.log("Prepared Payload:", { videos: orderedSubItems });

      await Axios.post(
        "https://huuphuoc.id.vn/api/sapXepThuTuVideo",
        { videos: orderedSubItems },
        { referrerPolicy: 'unsafe-url' }
      );
      handleExpandLesson(parentId);
      // console.log("Update successful!");
    } catch (error) {
      if (error.response) {
        handleExpandLesson(parentId);
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      } else if (error.request) {
        handleExpandLesson(parentId);
        console.error("No response received:", error.request);
      } else {
        handleExpandLesson(parentId);
        console.error("Request setup error:", error.message);
      }
    }
  }, [items, handleExpandLesson]);
  //cap nhat sub item sau khi di chuyen
  const updateSubItemParent = useCallback(async (subItemId, newParentId) => {
    try {
      // console.log("Starting updateSubItemParent");
      // console.log("subItemId:", subItemId);
      // console.log("newParentId:", newParentId);
      handleExpandLesson(newParentId);
      await Axios.post(
        "https://huuphuoc.id.vn/api/diChuyenVideo",
        { video_id: subItemId, new_baihoc_id: newParentId },
        { referrerPolicy: 'unsafe-url' }
      );
      handleExpandLesson(newParentId);
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) => {
          if (item.id === newParentId) {
            const parentItem = prevItems.find((i) =>
              i.subItems.some((sub) => sub.id === subItemId)
            );
            const movedSubItem = parentItem.subItems.find(
              (sub) => sub.id === subItemId
            );
            handleExpandLesson(newParentId);
            return { ...item, subItems: [...item.subItems, movedSubItem] };
          } else if (item.subItems.some((sub) => sub.id === subItemId)) {
            handleExpandLesson(newParentId);
            return { ...item, subItems: item.subItems.filter((sub) => sub.id !== subItemId) };
          }
          return item;
        });
        handleExpandLesson(newParentId);
        // console.log("Updated items:", updatedItems);
        return updatedItems;
      });

      const container = document.querySelector(`[data-parent-id="${newParentId}"]`);
      if (container) {
        await updateSubItemOrder(newParentId, container);
      } else {
        handleExpandLesson(newParentId);
        console.error("Container not found for parentId:", newParentId);
      }
      handleExpandLesson(newParentId);
      // console.log("Sub item đã được di chuyển thành công");
    } catch (error) {
      handleExpandLesson(newParentId);
      console.error("Error moving sub item:", error);
    }
  }, [updateSubItemOrder, handleExpandLesson]);

  const handleMoveSubItem = (subItemId, sourceParentId, targetParentId) => {
    setItems(prevItems => {
      const sourceItem = prevItems.find(item => item.id === sourceParentId);
      const targetItem = prevItems.find(item => item.id === targetParentId);

      if (!sourceItem || !targetItem) {
        console.error('Source or target item not found');
        return prevItems;
      }

      const subItem = sourceItem.subItems.find(sub => sub.id === subItemId);
      if (!subItem) {
        console.error('Sub item not found in source');
        return prevItems;
      }

      const updatedSourceSubItems = sourceItem.subItems.filter(sub => sub.id !== subItemId);
      const updatedTargetSubItems = [...targetItem.subItems, subItem];

      return prevItems.map(item => {
        if (item.id === sourceParentId) {
          return { ...item, subItems: updatedSourceSubItems };
        }
        if (item.id === targetParentId) {
          return { ...item, subItems: updatedTargetSubItems };
        }
        return item;

      });
    });
  };
 
  //di chuyen sub item
  const moveSubItem = useCallback(async (subItemId, sourceParentId, targetParentId, container) => {
    try {
      await Axios.post(
        "https://huuphuoc.id.vn/api/diChuyenVideo",
        { video_id: subItemId, new_baihoc_id: targetParentId },
        { referrerPolicy: 'unsafe-url' }
      );

      setItems(prevItems => {
        const sourceItem = prevItems.find(item => item.id === sourceParentId);
        const targetItem = prevItems.find(item => item.id === targetParentId);

        if (!sourceItem || !targetItem) {
          console.error('Source or target item not found');
          return prevItems;
        }

        const subItem = sourceItem.subItems.find(sub => sub.id === subItemId);

        if (!subItem) {
          console.error('Sub item not found in source');
          return prevItems;
        }

        const updatedSourceSubItems = sourceItem.subItems.filter(sub => sub.id !== subItemId);
        const updatedTargetSubItems = [...targetItem.subItems, subItem];

        return prevItems.map(item => {
          if (item.id === sourceParentId) {
            return { ...item, subItems: updatedSourceSubItems };
          }
          if (item.id === targetParentId) {
            return { ...item, subItems: updatedTargetSubItems };
          }
          return item;
        });
      });
      handleExpandLesson(targetParentId);
      await updateSubItemOrder(targetParentId, container);

      // console.log("Sub item moved successfully");
    } catch (error) {
      console.error("Error moving sub item:", error);
    }
  }, [updateSubItemOrder, handleExpandLesson]);
  //drag and drop
  useEffect(() => {
    const sortables = document.querySelectorAll(".nested-sortable");
    const sortableInstances = [];

    sortables.forEach((sortable) => {
      const instance = new Sortable(sortable, {
        group: "nested",
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onEnd: async (event) => {
          const oldParentId = parseInt(event.from.dataset.parentId);
          const newParentId = parseInt(event.to.dataset.parentId);
          const subItemId = parseInt(event.item.dataset.id);

          if (oldParentId !== newParentId) {
            try {
              await moveSubItem(subItemId, oldParentId, newParentId, event.to);
            } catch (error) {
              console.error("Error moving sub-item:", error);
            }
          } else {
            try {
              handleExpandLesson(newParentId);
              await updateSubItemOrder(newParentId, event.to);
            } catch (error) {
              console.error("Error updating sub-item order:", error);
            }
          }
        },
      });
      sortableInstances.push(instance);
    });

    const mainElement = document.getElementById("hs-nested-sortable");
    if (mainElement) {
      const mainSortable = new Sortable(mainElement, {
        animation: 150,
        onEnd: async (event) => {
          const reorderedItems = [...items];
          const [movedItem] = reorderedItems.splice(event.oldIndex, 1);
          reorderedItems.splice(event.newIndex, 0, movedItem);
          setItems(reorderedItems);

          try {
            handleExpandLesson(id);
            await updateLessonOrder(reorderedItems);
          } catch (error) {
            handleExpandLesson(id);
            console.error("Error updating lesson order:", error);
          }
        },
      });
      handleExpandLesson(id);
      sortableInstances.push(mainSortable);
    }

    return () => {
      handleExpandLesson(id);
      sortableInstances.forEach((instance) => instance.destroy());
    };
  }, [items, updateLessonOrder, updateSubItemOrder, moveSubItem, handleExpandLesson, id]);
  //xoa sub item
  const handleRemoveSubItem = useCallback(async (itemId, subItemId) => {
    try {
      const response = await Axios.post(
        "https://huuphuoc.id.vn/api/Xoasub",
        { id_video: subItemId },
        { referrerPolicy: 'unsafe-url' }
      );

      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                subItems: item.subItems.filter((sub) => sub.id !== subItemId),
              };
            }
            return item;
          })
        );
        handleExpandLesson(oldParentId);

        // console.log("Sub-item đã được xóa thành công"); 
      } else {
        handleExpandLesson(oldParentId);
        console.error("Failed to delete sub-item:", response.statusText);
      }
    } catch (error) {
      handleExpandLesson(oldParentId);
      console.error("Error deleting sub-item:", error);
    }
  }, [setItems, handleExpandLesson]);
  //xoa bai hoc
  const handleRemoveItem = useCallback(async (itemId) => {
    if (!itemId) return;

    const itemToRemove = items.find((item) => item && item.id === itemId);

    if (itemToRemove && itemToRemove.subItems.length > 0) {
      alert("Vui lòng xóa các mục con trước khi xóa mục chính.");
      return;
    }

    try {
      const response = await Axios.post(
        "https://huuphuoc.id.vn/api/xoabaihoc",
        { id_baihoc: itemId },
        { referrerPolicy: 'unsafe-url' }
      );

      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.filter((item) =>
            
            item && item.id !== itemId

          )
        );
        handleExpandLesson(id);
        // console.log("Bài học đã được xóa thành công");
      } else {
        handleExpandLesson(id);
        console.error("Failed to delete lesson:", response.statusText);
      }
    } catch (error) {
      handleExpandLesson(id);
      console.error("Error deleting lesson:", error);
    }
  }, [items, handleExpandLesson, id]);
  //them bai hoc
  const addLessonToCourse = useCallback(async (lessonName) => {
    if (id) {
      try {
        await Axios.post(
          "https://huuphuoc.id.vn/api/themBaiHoc",
          {
            id_khoahoc: id,
            ten: lessonName,
          },
          {
            referrerPolicy: 'unsafe-url'
          }
        );
      } catch (error) { 
        handleExpandLesson(id);
        console.error("Error adding lesson:", error);
      }
    }
  }, [id, handleExpandLesson]);



  const handleAddItem = useCallback(async () => {
    if (newItemName.trim()) {
      try {
        const newId = highestId + 1;
        await addLessonToCourse(newItemName, newId);
        setItems([
          ...items.filter((item) => item !== null),
          { id: newId, name: newItemName, subItems: [] },
        ]);
        setNewItemName("");
        setIsModalOpen(false);
        setHighestId(newId);

        if (items.filter((item) => item !== null).length === 0) {
          window.location.reload();
        }
      } catch (error) {
        window.location.reload();
      }
    }
  }, [items, newItemName, highestId, addLessonToCourse]);

  const handleAddSubItem = useCallback(async (itemId) => {
    if (newSubItemName.trim()) {
      try {
        const response = await Axios.post(
          "https://huuphuoc.id.vn/api/themSubBaiHoc",
          {
            ten: newSubItemName,
            id_baihoc: itemId,
          },
          {
            referrerPolicy: 'unsafe-url'
          }
        );

        const newSubItem = response.data.data;
        setItems(
          items.map((item) => {
            if (item && item.id === itemId) {
              return {
                ...item,
                subItems: [
                  ...item.subItems,
                  { id: newSubItem.id, name: newSubItem.ten, order: item.subItems.length + 1 },
                ],
              };
            }
            handleExpandLesson(itemId);
            return item;
          })
        );
        handleExpandLesson(itemId);
        setNewSubItemName("");
        setIsSubModalOpen(false);
      } catch (error) {
        handleExpandLesson(itemId);
        console.error("Error adding sub item:", error);
      }
    }
  }, [items, newSubItemName, handleExpandLesson]);


  //show sub item









  //Thêm video vào sub item
  const handleAddContent = useCallback(async (subItemId) => {
    if (newContentUrl.trim()) {
      const videoId = extractVideoId(newContentUrl);
      if (videoId) {
        try {
          // console.log("Extracted videoId:", videoId); 
          const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBoFccofvQSQ5Y0l29SdeRD7hka5lL9-fk`;
          // console.log("API URL:", apiUrl);
          const response = await Axios.get(apiUrl);
          const isoDuration = response.data.items[0].contentDetails.duration;
          const durationInSeconds = parseISO8601Duration(isoDuration);
          const durationInHHMMSS = convertSecondsToHHMMSS(durationInSeconds);
          setDuration(durationInHHMMSS);

          const payload = {
            id_video: subItemId,
            thoiluong: durationInHHMMSS,
            url: videoId,
          };

          // console.log("Payload:", payload);

          await Axios.post("https://huuphuoc.id.vn/api/taonoidungsub", payload, {
            referrerPolicy: 'unsafe-url'
          });
          // console.log(`Adding content to sub-item ID ${subItemId}`);
          setNewContentUrl("");
          setIsContentModalOpen(false);
        } catch (error) {
          if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Error request:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
          console.error("Error config:", error.config);
        }
      } else {
        console.error("Invalid YouTube URL:", newContentUrl);
      }
    } else {
      console.error("Content URL is invalid");
    }
  }, [newContentUrl]);

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };



  const parseISO8601Duration = (isoDuration) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = regex.exec(isoDuration);

    const hours = parseInt(matches[1] || 0, 10);
    const minutes = parseInt(matches[2] || 0, 10);
    const seconds = parseInt(matches[3] || 0, 10);

    return hours * 3600 + minutes * 60 + seconds;
  };

  const convertSecondsToHHMMSS = (seconds) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${remainingSeconds}`;
  };



  return (

    <>
      <NoiDungBaiHoc
        items={items}
        setItems={setItems}
        setIsSubModalOpen={setIsSubModalOpen}
        setCurrentItemId={setCurrentItemId}
        handleRemoveItem={handleRemoveItem}
        handleRemoveSubItem={handleRemoveSubItem}
        currentSubItemId={currentSubItemId}
        currentItemId={currentItemId}
        id={id}
        setIsModalOpen={setIsModalOpen}
        handleAddItem={handleAddItem}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        isModalOpen={isModalOpen}
        handleAddSubItem={handleAddSubItem}
        isSubModalOpen={isSubModalOpen}
        newSubItemName={newSubItemName}
        setNewSubItemName={setNewSubItemName}
        handleExpandLesson={handleExpandLesson}
        isContentModalOpen={isContentModalOpen}
        setIsContentModalOpen={setIsContentModalOpen}
        newContentUrl={newContentUrl}
        setNewContentUrl={setNewContentUrl}
        handleAddContent={handleAddContent}
        extractVideoId={extractVideoId}
        setCurrentSubItemId={setCurrentSubItemId}
        handleMoveSubItem={handleMoveSubItem}
        updateSubItemOrder={updateSubItemOrder}
        updateSubItemParent={updateSubItemParent}
        setExpandedLessons={setExpandedLessons}
        setQuestionData={setQuestionData}
        questionData={questionData}
        expandedLessons={expandedLessons} // Pass expandedLessons as a prop
      />
    </>
  );
};

export default BaiHoc;