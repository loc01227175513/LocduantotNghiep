"use client";
import React, { useState, useEffect } from "react";
import { user } from "../../../../service/User/user";

export default function Myprofilestudent() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    user()
      .then((data) => {
        setUserData(data.data);
      })
      .catch(() => {
        setError("Failed to fetch user data.");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const userInfo = [
    { label: "NHẬN DẠNG", value: userData.id, icon: "🆔" },
    { label: "Tên", value: userData.ten, icon: "👤" },
    { label: "E-mail", value: userData.email, icon: "📧" },
    { label: "Số điện thoại", value: userData.dienthoai, icon: "📱" },
    { label: "Profile Picture", value: userData.hinh, icon: "🖼️" },
    { label: "Vai trò", value: userData.vaitro, icon: "👑" },
    { label: "Được tạo ra tại", value: userData.created_at, icon: "🕒" },
    { label: "Cập nhật tại", value: userData.updated_at, icon: "🔄" },
  ];

  return (
    <div className="overflow-y-scroll col-lg-9 rts-sticky-column-item h-lvh">
      <div className="min-h-screen p-6 bg-white">
        <h5 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Hồ sơ của tôi
        </h5>
        
        <div className="grid gap-6 md:grid-cols-2">
          {userInfo.map((item, index) => (
            <div 
              key={index} 
              className="rounded-lg border border-gray-200 hover:border-gray-300 
                transform transition-all duration-300 hover:scale-105
                bg-white shadow-md hover:shadow-xl"
            >
              {item.label !== "Profile Picture" && (
                <div className="p-4 rounded-t-lg bg-gray-50
                  flex items-center border-b border-gray-200">
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <span className="font-semibold text-gray-700">
                    {item.label}
                  </span>
                </div>
              )}
              {item.label === "Profile Picture" ? (
                <div className="p-4 flex justify-center">
                  <img
                    src={item.value}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-4 border-gray-200
                      hover:border-gray-300 transition-all duration-300"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-b-lg">
                  <p className="text-gray-600 break-words">{item.value}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}