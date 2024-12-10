'use client'

import React, { useState, useEffect } from "react"
import { user } from "../../../../service/User/user"
import { FaUserCircle } from "react-icons/fa"

export default function MyProfileStudent() {
  const [userData, setUserData] = useState(null)

  const calculateMinutesDifference = (date) => {
    const now = new Date()
    const pastDate = new Date(date)
    const diffInMs = now.getTime() - pastDate.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

    if (diffInMinutes > 10080) {
      return date.split("T")[0]
    } else if (diffInMinutes > 1440) {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`
    } else if (diffInMinutes >= 60) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`
    } else {
      return `${diffInMinutes} phút trước`
    }
  }

  useEffect(() => {
    user().then((data) => {
      setUserData(data.data)
    })
  }, [])

  if (!userData) {
    return (
      <div className="col-lg-9 overflow-y-scroll font-sans">
        <div className="pt-8">
          <div className="flex flex-col items-center justify-center">
            <FaUserCircle className="text-gray-300 text-9xl mb-4" />
            <div className="text-gray-500 text-xl">Đang tải thông tin...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="col-lg-9 overflow-y-scroll font-sans">
      <div className="pt-8">
        <h2 className="text-[20px]   font-semibold text-gray-800 mb-4">Hồ sơ của tôi</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <ProfileItem label="Ngày đăng ký" value={calculateMinutesDifference(userData.created_at)} />
            <ProfileItem label="Tên người dùng" value={userData.ten} />
            <ProfileItem label="E-mail" value={userData.email} />
            <ProfileItem label="Số điện thoại" value={userData.dienthoai || "Chưa có"} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-200 py-2">
      <span className="text-gray-600 text-[14px]">{label}:</span>
      <span className="text-gray-800 text-[14px] font-medium">{value}</span>
    </div>
  )
}

