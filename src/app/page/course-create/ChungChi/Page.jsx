// Page.jsx
import React, { useState, useEffect } from "react";
import { Landscape, Portrait } from "./ChungChi";
import { ChungChi, ChonChungChi } from "../../../../service/ChungChi/ChungChi";

export default function Page() {
  const [view, setView] = useState("Landscape");
  const [chungchi, setChungChi] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [toggle, setToggle] = useState(false); // Added toggle state

  useEffect(() => {
    ChungChi().then((data) => {
      setChungChi(data.data);
      console.log("chungchi", data);
    });
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    console.log("selectedId", id);
  };

  const handlePublish = () => {
    if (selectedId) {
      ChonChungChi(selectedId)
        .then((data) => {
          console.log("data", data);
        })
        .catch((error) => {
          console.error("Error publishing certificate", error);
        });
    } else {
      console.log("No ID selected");
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="p-10 bg-gradient-to-r relative   from-sky-50/80 to-blue-50/80 rounded-2xl transition-all duration-500 ease-in-out">
      <header className="mb-8">
        <h2 className="text-[18px] font-bold  text-gray-700 bg-300% animate-shimmer text-center">
          Mẫu chứng chỉ
        </h2>
      </header>

      <section className="tabs   mx-auto">
        <div className="tab-list  mb-6 flex justify-center gap-6">
          {["Landscape", "Portrait"].map((tab) => (
            <button
              key={tab}
              className={`tab flex flex-row w-60  rounded-xl py-3  transition-all duration-300  items-center justify-center
                 backdrop-blur-sm
                ${
                  view === tab
                    ? "bg-pink-500/90 text-white scale-105"
                    : "bg-white/60 text-pink-700 hover:bg-pink-400/80 hover:text-white"
                }`}
              onClick={() => handleViewChange(tab)}
            >
              <i className="fa-sharp fa-light fa-pager mr-3  text-xl" />
              <span className="text-[14px] ">
                {tab === "Landscape" ? "Phong cảnh" : "Chân dung"}
              </span>
            </button>
          ))}
        </div>
      
        <div className="tab-panels">
          <div className={`tab-panel ${view === "Landscape" ? "block" : "hidden"}`}>
            <div className="bg-white/90 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
              <Landscape chungchi={chungchi} onSelect={handleSelect} />
            </div>
          </div>
          <div className={`tab-panel ${view === "Portrait" ? "block" : "hidden"}`}>
            <div className="bg-white/90 p-6 rounded-xl transition-all duration-300 hover:shadow-md">
              <Portrait chungchi={chungchi} onSelect={handleSelect} />
            </div>
          </div>
        </div>
      </section>
<div className="flex justify-end">
        <section className="actions mt-8 w-[100px] ">
        <button
          className="btn px-6   py-3 rounded-xl font-medium transition-all duration-300 
            bg-gradient-to-r from-pink-500 to-pink-500 text-white
            hover:from-pink-600 hover:to-pink-600
            disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePublish}
          disabled={!selectedId}
        >
          Xuất bản
          <i className="fa-light fa-arrow-right ml-2" />
        </button>
      </section>
</div>
    </div>
  );
}