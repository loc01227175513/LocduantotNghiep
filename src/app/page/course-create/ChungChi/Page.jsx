import React, { useState, useEffect } from "react";
import { Landscape, Portrait } from "./ChungChi";
import { ChungChi, ChonChungChi } from "../../../../service/ChungChi/ChungChi";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const [view, setView] = useState("Landscape");
  const [chungchi, setChungChi] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    ChungChi().then((data) => {
      setChungChi(data.data);
      console.log("chungchi", data);
    });
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    toast.info(`Certificate with ID ${id} has been selected.`, {
      title: "Certificate Selected",
      autoClose: 3000,
    });
  };
  console.log("selectedId", selectedId);

  const handlePublish = () => {
    if (selectedId) {
      const id = selectedId;
      ChonChungChi(id)
        .then((data) => {
          console.log("data", data);
          toast.success("The certificate has been published successfully.", {
            title: "Certificate Published",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error("Error publishing certificate", error);
          toast.error("There was an error publishing the certificate.", {
            title: "Publish Failed",
            autoClose: 3000,
          });
        });
    } else {
      toast.warn("Please select a certificate before publishing.", {
        title: "No Certificate Selected",
        autoClose: 3000,
      });
      console.log("No ID selected");
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
    toast.success(`Switched to ${newView.toLowerCase()} view.`, {
      title: `${newView} View`,
      autoClose: 2000,
    });
  };

  const handlePreview = () => {
    toast.info("Previewing the selected certificate.", {
      title: "Preview",
      autoClose: 2000,
    });

  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow-2xl transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2">
      <h2 className="text-4xl mb-6 bg-gradient-to-r from-[#32ADE6] to-[#28b99c] bg-clip-text text-transparent text-center tracking-tight font-extrabold">
        Certificate Template
      </h2>

      <div className="tabs">
        <div className="tab-list mb-4 flex justify-center">
          <button
            className={`tab mx-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              view === "Landscape"
                ? "bg-[#32ADE6] text-white transform scale-105 shadow-lg"
                : "text-[#32ADE6] hover:bg-[#28b99c] hover:text-white"
            }`}
            onClick={() => handleViewChange("Landscape")}
          >
            <i className="fa-sharp fa-light fa-pager p-2" /> Landscape
          </button>
          <button
            className={`tab mx-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              view === "Portrait"
                ? "bg-[#32ADE6] text-white transform scale-105 shadow-lg"
                : "text-[#32ADE6] hover:bg-[#28b99c] hover:text-white"
            }`}
            onClick={() => handleViewChange("Portrait")}
          >
            <i className="fa-sharp fa-light fa-pager p-2" /> Portrait
          </button>
        </div>

        <div className="tab-panels">
          <div className={`tab-panel ${view === "Landscape" ? "block" : "hidden"}`}>
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:transform hover:-translate-y-4">
              {view === "Landscape" && <Landscape chungchi={chungchi} onSelect={handleSelect} />}
            </div>
          </div>
          <div className={`tab-panel ${view === "Portrait" ? "block" : "hidden"}`}>
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:transform hover:-translate-y-4">
              {view === "Portrait" && <Portrait chungchi={chungchi} onSelect={handleSelect} />}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-6">
        <button
          className="btn-lg bg-gradient-to-r from-[#32ADE6] to-[#28b99c] text-white px-6 py-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-[#28b99c] hover:to-[#32ADE6] hover:transform hover:-translate-y-2 shadow-lg"
          onClick={handlePreview}
        >
          <i className="fa-light fa-eye p-2" />
          Preview
        </button>
        <button
          className="btn-lg border-2 border-[#32ADE6] text-[#32ADE6] px-6 py-3 rounded-lg transition-all duration-200 hover:bg-[#32ADE6] hover:text-white hover:transform hover:-translate-y-2 shadow-lg"
          onClick={handlePublish}
        >
          Publish <i className="fa-light fa-arrow-right p-2" />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}