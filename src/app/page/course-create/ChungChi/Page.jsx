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
    <div className="p-10 bg-gradient-to-r relative from-sky-50/80 to-blue-50/80 rounded-2xl transition-all duration-500 ease-in-out">
      <header className="mb-8">
        <h2 className="text-3xl bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent text-center font-semibold tracking-wide">
          Mẫu chứng chỉ
        </h2>
      </header>

      <section className="tabs max-w-6xl mx-auto">
        <div className="tab-list mb-6 flex justify-center gap-6">
          {["Landscape", "Portrait"].map((tab) => (
            <button
              key={tab}
              className={`tab rounded-xl font-medium transition-all duration-300 flex flex-col items-center justify-center
                w-32 h-24 backdrop-blur-sm
                ${
                  view === tab
                    ? "bg-sky-500/90 text-white scale-105"
                    : "bg-white/60 text-sky-700 hover:bg-sky-400/80 hover:text-white"
                }`}
              onClick={() => handleViewChange(tab)}
            >
              <i className="fa-sharp fa-light fa-pager mb-2 text-xl" />
              <span className="text-xl font-medium">
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

        <section className="actions mt-8 w-[100px] flex justify-end">
        <button
          className="btn px-6 py-3 rounded-xl font-medium transition-all duration-300 
            bg-gradient-to-r from-sky-500 to-blue-500 text-white
            hover:from-sky-600 hover:to-blue-600
            disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePublish}
          disabled={!selectedId}
        >
          Publish
          <i className="fa-light fa-arrow-right ml-2" />
        </button>
      </section>

    </div>
  );
}