"use client";

import React, { useEffect, useState } from "react";
import { showAllTracNghiemNguoiDung, ShowCauHoi } from "@/service/TaoBaiTracNghiem/TaoBaiTracNghiem";
import { ShowTracNghiemComponent } from './page';

export default function KetQuaTracNghiem({ idBaihoc, idTracNghiem }) {
    const [userResults, setUserResults] = useState(null);
    const [quizDetails, setQuizDetails] = useState(null);
    const [showTracNghiem, setShowTracNghiemComponent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Gọi hai API đồng thời
                const [userResultsData, quizDetailsData] = await Promise.all([
                    showAllTracNghiemNguoiDung({ id_baihoc: idBaihoc }),
                    ShowCauHoi(idBaihoc, idTracNghiem),
                ]);

                setUserResults(userResultsData);
                setQuizDetails(quizDetailsData);
            } catch (err) {
                setError(err.message || "Đã xảy ra lỗi không xác định.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idBaihoc, idTracNghiem]);

    console.log(userResults, quizDetails, "userResults, quizDetails");

    if (loading) {
        return <p className="text-center text-xl">Đang tải kết quả...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 text-xl">{error}</p>;
    }

    // Ensure quizDetails and quizDetails.questions are defined
    if (!quizDetails || !Array.isArray(quizDetails.questions)) {
        console.error("Dữ liệu bài trắc nghiệm không khớp:", { quizDetails, idTracNghiem });
        return (
            <div className="text-center text-xl text-red-600">
                Không tìm thấy bài trắc nghiệm có ID: <strong>{idTracNghiem}</strong>.
                <br />
                Vui lòng kiểm tra lại dữ liệu hoặc liên hệ với quản trị viên.
            </div>
        );
    }

    const questions = quizDetails.questions;

    if (!Array.isArray(questions) || questions.length === 0) {
        console.error("Không có câu hỏi trong bài trắc nghiệm:", { quizDetails, idTracNghiem });
        return (
            <div className="text-center text-xl text-red-600">
                Không có câu hỏi trong bài trắc nghiệm.
            </div>
        );
    }

    // Đối chiếu kết quả người dùng với câu hỏi đúng
    // Flatten the userResults to extract all noidung entries
    const userAnswers = userResults
        ? userResults.reduce((acc, result) => acc.concat(result.noidung), []).filter(
            (result) => result.id_baitracnghiem === idTracNghiem
        )
        : [];

    // Handle multiple subquestions within each questionObj
    const allQuestions = questions.flatMap((questionObj) => {
        if (!Array.isArray(questionObj.cau_hoi) || !Array.isArray(questionObj.cau_traloi)) {
            return [];
        }
        return questionObj.cau_hoi.map((cauHoi, idx) => ({
            cau_hoi: cauHoi,
            cau_traloi: questionObj.cau_traloi[idx] || [],
        }));
    });

    const questionResults = allQuestions.map((questionObj, index) => {
        const thutumang = index + 1; // Thứ tự câu hỏi trong bài
        const userAnswerEntry = userAnswers.find((answer) => answer.thutumang === thutumang);
        const userAnswer = userAnswerEntry?.stt;

        // Find the correct answer for this question
        const correctAnswerObj = questionObj.cau_traloi.find((answer) => answer.is_correct === 1);
        const correctAnswer = correctAnswerObj?.stt;

        return {
            question: questionObj.cau_hoi, // Assuming cau_hoi is a string
            userAnswer,
            correctAnswer,
            isCorrect: userAnswer === correctAnswer,
            answers: questionObj.cau_traloi,
        };
    });
    if (showTracNghiem) {
        return (
            <ShowTracNghiemComponent idBaihoc={idBaihoc} idTracNghiem={idTracNghiem} />
        );
    }
    return (
        <div className="flex-grow lg:pr-8">
            <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
                {/* Header Section */}
                <header className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md w-full mb-6">
                    <h1 className="text-xl font-bold">Kết quả bài trắc nghiệm</h1>
                    {/* If tieu_de and mota are available in quizDetails, include them */}
                    {quizDetails.tieu_de && (
                        <p className="text-lg mt-2">Tiêu đề: {quizDetails.tieu_de}</p>
                    )}
                    {quizDetails.mota && (
                        <p className="text-lg mt-2">Mô tả: {quizDetails.mota}</p>
                    )}
                    <p className="text-xl mt-4">
                        Bạn đã trả lời đúng{" "}
                        <span className="font-semibold">
                            {questionResults.filter((result) => result.isCorrect).length}/{questionResults.length}
                        </span>{" "}
                        câu hỏi.
                    </p>
                </header>

                {/* Content Section */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full">
                    <section>
                        {questionResults.map((result, index) => (
                            <div
                                key={index}
                                className={`mb-6 p-4 border rounded ${result.isCorrect ? "border-green-600 bg-green-100" : "border-red-600 bg-red-100"
                                    }`}
                            >
                                <h2 className="font-bold mb-2">
                                    Câu hỏi {index + 1}: {result.question}
                                </h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    {result.answers.map((answer, idx) => (
                                        <li
                                            key={idx}
                                            className={`${answer.stt === result.correctAnswer
                                                    ? "text-green-600 font-bold"
                                                    : answer.stt === result.userAnswer
                                                        ? "text-red-600"
                                                        : ""
                                                }`}
                                        >
                                            {answer.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                </div>

                {/* Footer Section */}
                <footer className="flex justify-between items-center w-full mt-6">
                    <button onClick={() => {
                        window.location.reload();
                    }}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-xl">
                        Tiếp tục
                    </button>
                    <button onClick={() => {
                        setShowTracNghiemComponent(true);
                    }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-xl">
                        Thử làm lại trắc nghiệm
                    </button>
                </footer>
            </div>
        </div>
    );
}