"use client";
import React from "react";
import Image from "next/image";

const ImageComponent = ({ type, chungchi, onSelect }) => {
  if (!Array.isArray(chungchi)) return null;

  const handleSelect = (id) => {
    onSelect(id);
  };

  return (
    <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chungchi
          .filter((item) => item.loai === type.toLowerCase())
          .map((item, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:scale-105"
              style={{ "--index": index }}
            >
              <div className="relative group">
                <input
                  type="radio"
                  id={`${type}-${index}`}
                  name="radio-group"
                  onChange={() => handleSelect(item.id)}
                  className="hidden peer"
                />
                <label
                  htmlFor={`${type}-${index}`}
                  className="block cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl transition-all duration-300">
                    <Image
                      src={item.giaychungnhan}
                      alt="Certificate Image"
                      width={300}
                      height={400}
                      className={`w-full object-cover transition-all duration-300 
                        peer-checked:ring-4 peer-checked:ring-blue-500/50
                        group-hover:brightness-95`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Selection Indicator */}
                    <div className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 
                                  opacity-0 peer-checked:opacity-100 transition-all duration-300 
                                  flex items-center justify-center transform scale-0 peer-checked:scale-100`}>
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <p className="text-xl font-medium text-gray-800">Click to select</p>
                      </div>
                    </div>

                    {/* Glowing Border Effect */}
                    <div className={`absolute inset-0 border-2 border-transparent peer-checked:border-blue-500/50 
                                  peer-checked:glow group-hover:border-white/30 rounded-xl transition-all duration-300`} />
                  </div>
                </label>
              </div>
            </div>
          ))}
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        .grid > div {
          animation: slideIn 0.3s ease-out forwards;
          animation-delay: calc(var(--index) * 0.1s);
        }

        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }

        .peer:checked + label::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: rgba(59, 130, 246, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 0.6s linear;
        }
      `}</style>
    </div>
  );
};

const Landscape = (props) => <ImageComponent type="Landscape" {...props} />;
const Portrait = (props) => <ImageComponent type="Portrait" {...props} />;

export { Landscape, Portrait };