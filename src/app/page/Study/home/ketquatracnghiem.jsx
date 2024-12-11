"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
    showAllTracNghiemNguoiDung,
    ShowCauHoi,
    HoanThanhTracNghiem,
    ShowTracNghiem,
} from "@/service/TaoBaiTracNghiem/TaoBaiTracNghiem";
import { ShowTracNghiemComponent } from "./page";

export default function KetQuaTracNghiem({ idBaihoc, idTracNghiem }) {
    const [userResults, setUserResults] = useState([]);
    const [quizDetails, setQuizDetails] = useState(null);
    const [showTracNghiem, setShowTracNghiem] = useState(false);
    const [dapAnNguoiDung, setDapAnNguoiDung] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [checkToanBocauhoi, setCheckToanBocauhoi] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [userResultsData, quizDetailsData] = await Promise.all([
                    showAllTracNghiemNguoiDung({ id_baihoc: idBaihoc }),
                    ShowCauHoi(idBaihoc, idTracNghiem),
                ]);
                const ketQuaNguoiDung = userResultsData.map((item) => item.noidung);
                setDapAnNguoiDung(ketQuaNguoiDung);
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

    useEffect(() => {
        const fetchCheckToanBocauhoi = async () => {
            try {
                const response = await ShowTracNghiem({ id_baihoc: idBaihoc });
                const noidung = response.map((item) => item.noidung);
                setCheckToanBocauhoi(noidung);
            } catch (err) {
                console.error("Error fetching CheckToanBocauhoi:", err);
            }
        };

        fetchCheckToanBocauhoi();
    }, [idBaihoc]);

    useEffect(() => {
        if (checkToanBocauhoi.length > 0 && dapAnNguoiDung.length > 0) {
            const flatCheckToanBocauhoi = checkToanBocauhoi.flat();
            const flatDapAnNguoiDung = dapAnNguoiDung.flat();

            if (flatCheckToanBocauhoi.length === 0) {
                // console.log("Không có dữ liệu trong checkToanBocauhoi"); 
                return;
            }

            const allIdBaiTracNghiem = flatCheckToanBocauhoi.map((item) => item.id_baitracnghiem);

            const CheckIdBaiTracNghiem = flatDapAnNguoiDung.every((item) => {
                if (item.id_baitracnghiem !== undefined && item.id_baitracnghiem !== null) {
                    return allIdBaiTracNghiem.includes(item.id_baitracnghiem);
                } else {
                    console.error("Undefined or null id_baitracnghiem for item:", item);
                    return false;
                }
            }) && allIdBaiTracNghiem.every(id => flatDapAnNguoiDung.some(item => item.id_baitracnghiem === id));

            if (CheckIdBaiTracNghiem) {
                const TongSoDapAnDung = [];
                flatCheckToanBocauhoi.forEach((baiTracNghiem) => {
                    const correctAnswers = baiTracNghiem.cau_traloi
                        .flat()
                        .filter((item) => item.is_correct === 1 || item.is_correct === true)
                        .map((item) => item.stt);
                    TongSoDapAnDung.push(...correctAnswers);
                });

                const sodapanDung = TongSoDapAnDung.length;
                const SocaudapandungUser = flatDapAnNguoiDung.map((item) => item.stt);

                function arraysEqual(a, b) {
                    if (a.length !== b.length) return false;
                    const sortedA = [...a].sort();
                    const sortedB = [...b].sort();
                    for (let i = 0; i < sortedA.length; i++) {
                        if (sortedA[i] !== sortedB[i]) return false;
                    }
                    return true;
                }

                const check = arraysEqual(TongSoDapAnDung, SocaudapandungUser);
                if (check) {
                    HoanThanhTracNghiem({ id_baihoc: idBaihoc });
                    // console.log("Bài trắc nghiệm đã hoàn thành đúng."); 
                } else {
                    // console.log("Chưa hoàn thành trắc nghiệm.");
                }
            } else {
                // console.log("ID bài trắc nghiệm không khớp.");
            }
        }
    }, [checkToanBocauhoi, dapAnNguoiDung, idBaihoc]);

    const questionResults = useMemo(() => {
        if (!quizDetails || !Array.isArray(quizDetails.questions)) return [];

        const { questions } = quizDetails;
        const userAnswers = userResults
            .reduce((acc, result) => acc.concat(result.noidung), [])
            .filter((result) => result.id_baitracnghiem === idTracNghiem);

        const allQuestions = questions.flatMap((questionObj) => {
            if (!Array.isArray(questionObj.cau_hoi) || !Array.isArray(questionObj.cau_traloi)) {
                return [];
            }
            return questionObj.cau_hoi.map((cauHoi, idx) => ({
                cau_hoi: cauHoi,
                cau_traloi: questionObj.cau_traloi[idx] || [],
            }));
        });

        return allQuestions.map((questionObj, index) => {
            const thutumang = index + 1;
            const userAnswerEntry = userAnswers.find(
                (answer) => answer.thutumang === thutumang
            );
            const userAnswer = userAnswerEntry?.stt;

            const correctAnswerObj = questionObj.cau_traloi.find(
                (answer) => answer.is_correct === 1
            );
            const correctAnswer = correctAnswerObj?.stt;

            return {
                question: questionObj.cau_hoi,
                userAnswer,
                correctAnswer,
                isCorrect: userAnswer === correctAnswer,
                answers: questionObj.cau_traloi,
            };
        });
    }, [quizDetails, userResults, idTracNghiem]);

    if (loading) {
        return <p className="text-center text-xl">Đang tải kết quả...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-600 text-xl">{error}</p>
        );
    }

    if (!quizDetails || !Array.isArray(quizDetails.questions)) {
        console.error("Dữ liệu bài trắc nghiệm không khớp:", {
            quizDetails,
            idTracNghiem,
        });
        return (
            <div className="text-center text-xl text-red-600">
                Không tìm thấy bài trắc nghiệm có ID: <strong>{idTracNghiem}</strong>.
                <br />
                Vui lòng kiểm tra lại dữ liệu hoặc liên hệ với quản trị viên.
            </div>
        );
    }

    if (showTracNghiem) {
        return (
            <ShowTracNghiemComponent
                idBaihoc={idBaihoc}
                idTracNghiem={idTracNghiem}
            />
        );
    }

    return (
        <div className="flex-grow lg:pr-8">
            <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
                <header className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md w-full mb-6">
                    <h1 className="text-3xl font-bold">Kết quả bài trắc nghiệm</h1>
                    {quizDetails.tieu_de && (
                        <p className="text-2xl mt-2">Tiêu đề: {quizDetails.tieu_de}</p>
                    )}
                    {quizDetails.mota && (
                        <p className="text-2xl mt-2">Mô tả: {quizDetails.mota}</p>
                    )}
                    <p className="text-2xl mt-4">
                        Bạn đã trả lời đúng{" "}
                        <span className="font-semibold">
                            {questionResults.filter((result) => result.isCorrect).length}/
                            {questionResults.length}
                        </span>{" "}
                        câu hỏi.
                    </p>
                </header>

                <div className="bg-white shadow-md rounded-lg p-6 w-full">
                    <section>
                        {questionResults.map((result, index) => (
                            <div
                                key={index}
                                className={`mb-6 p-4 border rounded ${result.isCorrect
                                        ? "border-green-600 bg-green-100"
                                        : "border-red-600 bg-red-100"
                                    }`}
                            >
                                <h2 className="font-bold mb-2 text-3xl">
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
                                                } text-2xl`}
                                        >
                                            {answer.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                </div>

                <footer className="flex justify-between items-center w-full mt-6">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-2xl hover:bg-gray-300"
                    >
                        Tiếp tục
                    </button>
                    <button
                        onClick={() => setShowTracNghiem(true)}
                        className="bg-pink-700 text-white px-4 py-2 rounded text-2xl hover:bg-pink-600"
                    >
                        Thử làm lại trắc nghiệm
                    </button>
                </footer>
            </div>
        </div>
    );
}