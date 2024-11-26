"use client";
import React, { useState, useEffect,useCallback } from "react";
import Axios from "axios";

function Mota() {
  const [motaIds, setMotaIds] = useState([]);
  const [hocSinhInputs, setHocSinhInputs] = useState([""]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const idFromUrl = url.searchParams.get("id");
      setId(idFromUrl);
      console.log("id:", idFromUrl); // Log id once
    }
  }, []);
  console.log("id:", id); // Log id

  const fetchMoTa = useCallback(async () => {
    try {
         const response = await Axios.get(`https://huuphuoc.id.vn/api/motaKhoaHoc/${id}`, {
        referrerPolicy: 'unsafe-url'
      });
      const data = response.data;
      console.log("API response data:", data); // Log API response

      const ids = data.data.flatMap((item, index) => {
        try {
          const parsedMota = JSON.parse(item.muctieu);
          if (Array.isArray(parsedMota)) {
            return parsedMota.map((_, i) => index * 100 + i); // Generate unique ids
          } else {
            console.error("Parsed mota is not an array:", parsedMota);
            return [];
          }
        } catch (e) {
          console.error("Error parsing JSON:", e);
          return [];
        }
      });

      setMotaIds(ids);
      console.log("Fetched motaIds:", ids); // Log fetched ids

      const tenValues = data.data.flatMap((item) => {
        try {
          const parsedMota = JSON.parse(item.muctieu);
          if (Array.isArray(parsedMota)) {
            return parsedMota;
          } else {
            console.error("Parsed mota is not an array:", parsedMota);
            return [];
          }
        } catch (e) {
          console.error("Error parsing JSON:", e);
          return [];
        }
      });

      setHocSinhInputs(tenValues.length > 0 ? tenValues : [""]);
      console.log("Fetched hocSinhInputs:", tenValues); // Log fetched inputs
    } catch (error) {
      console.error("Error fetching course description:", error);
    }
  }, [id, setMotaIds, setHocSinhInputs]);

  useEffect(() => {
    fetchMoTa();
  }, [fetchMoTa]);

  useEffect(() => {
    fetchMoTa();
  }, [id, fetchMoTa]);

  const handleInputChange = (index, setState, state, value) => {
    const newInputs = [...state];
    newInputs[index] = value;
    setState(newInputs);
  };

  const handleAddInput = (state, setState) => {
    if (state.every((input) => input.trim() !== "")) {
      setState([...state, ""]);
    }
  };

  const handleSubmit = async () => {
    const hocSinhValues = hocSinhInputs.filter((input) => input.trim() !== "");

    try {
          await Axios.post("https://huuphuoc.id.vn/api/updateMota", {
        id_khoahoc: id,
        mota: hocSinhValues,
      }, {
        referrerPolicy: 'unsafe-url'
      });
      alert("Mô tả khóa học đã được gửi thành công");
    } catch (error) {
      console.error("Error submitting course description:", error);
    }
  };

  const handleDelete = async (index, state, setState, ids, setIds, id) => {
    const newInputs = [...state];

    if (newInputs.length > 1) {
      const idmota = motaIds[index]; // Use correct idmota from motaIds
      if (idmota === undefined) {
        console.error("idmota is undefined for index:", index);
        console.log("Current motaIds:", motaIds); // Log current motaIds
        console.log("Current hocSinhInputs:", hocSinhInputs); // Log current hocSinhInputs
        return;
      }

      try {
        console.log("Request data:", { idmota: idmota, id_khoahoc: id }); // Log request data
               const response = await Axios.post("https://huuphuoc.id.vn/api/xoamota", {
          idmota: idmota,
          id_khoahoc: id,
        }, {
          referrerPolicy: 'unsafe-url'
        });

        console.log("Delete response:", response);

        newInputs.splice(index, 1);
        setState(newInputs);

        const newIds = [...ids];
        newIds.splice(index, 1);
        setIds(newIds);

        alert("Mô tả đã được xóa thành công");
        window.location.reload(); // Reload the page
      } catch (error) {
        console.error("Error deleting description:", error);
        console.error("Request data:", {
          idmota: idmota,
          id_khoahoc: id,
        });
        alert("Có lỗi xảy ra khi xóa mô tả");
      }
    } else {
      setState([""]);
    }
  };

  return (
    <>
     <div className="max-w-4xl p-8 mx-auto 
  bg-gradient-to-b from-white/95 to-white/90
  backdrop-filter backdrop-blur-xl
  shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)]
  border border-white/20 rounded-2xl
  transform transition-all duration-300">
  <h1 className="mb-6 text-3xl font-bold bg-gradient-to-r from-sky-500 to-sky-400
    bg-clip-text text-transparent">
    Người học dự định
  </h1>
  <p className="mb-8 text-2xl text-gray-700 leading-relaxed">
    Các mô tả sau đây sẽ hiển thị công khai trên Trang đích khóa học của
    bạn và sẽ có tác động trực tiếp đến hiệu suất khóa học của bạn. Các mô
    tả này sẽ giúp người học quyết định xem khóa học của bạn có phù hợp
    với họ không.
  </p>

  <div className="relative space-y-8">
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <label className="block mb-4 text-2xl font-semibold">
        Học sinh sẽ học được gì trong khóa học của bạn?
      </label>
      {hocSinhInputs.map((input, index) => (
        <div
          key={index}
          className="relative mb-4 group animate-[slideIn_0.3s_ease-out]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <input
            type="text"
            className="w-full p-4 text-gray-900 bg-white/90 
              border-2 border-gray-200/80 rounded-xl
              shadow-inner
              focus:border-purple-400 focus:ring-4 
              focus:ring-purple-100/50 
              transition duration-200
              transform hover:scale-[1.01]"
            placeholder="Ví dụ: Đạt được kiến thức cơ bản về lập trình"
            value={input}
            onChange={(e) =>
              handleInputChange(
                index,
                setHocSinhInputs,
                hocSinhInputs,
                e.target.value
              )
            }
          />
          {hoveredIndex === index && (
        <button
        className="absolute right-2 top-1/2 -translate-y-1/2
        w-10 
          p-2 rounded-full
          bg-red-500/90 text-white
          hover:bg-red-600
          transition-all duration-200
          flex items-center justify-center
          hover:scale-110
          group
          animate-[fadeIn_0.2s_ease-out]"
        onClick={() =>
          handleDelete(
            index,
            hocSinhInputs,
            setHocSinhInputs,
            motaIds,
            setMotaIds,
            id
          )
        }
      >
        <svg 
          className="w-5 h-5 transition-transform group-hover:rotate-12" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
          />
        </svg>
      </button>
          )}
        </div>
      ))}
      <div className="mt-6">
      <button
  onClick={() => handleAddInput(hocSinhInputs, setHocSinhInputs)}
  className="group px-6 py-3 font-semibold text-sky-500
    border border-sky-500
    rounded-xl shadow-md 
    flex items-center gap-2"
>
  <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
  Thêm mục tiêu
</button>
      </div>
    </div>
  </div>

  <div className="mt-10">
        <button
      onClick={handleSubmit}
      className="px-8 py-3 font-semibold text-white
        bg-gradient-to-r from-sky-500 to-sky-400
        rounded-xl shadow-md
        border border-sky-500
        hover:shadow-lg hover:from-sky-500 hover:to-blue-400
        active:to-green-800
        flex items-center gap-2"
    >
      <span>Gửi mục tiêu khóa học</span>
      <svg className="w-5 h-5 animate-[bounce_1s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  </div>
</div>
    </>
  );
}

export default Mota;
