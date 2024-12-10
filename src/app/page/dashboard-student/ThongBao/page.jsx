"use client";
import React, { useState, useEffect } from 'react';
import { LayThongBao } from "@/service/ThongBao/ThongBao";
import { use } from '@/assets/js/plugins/swiper';
import Link from 'next/link';
import Img from 'next/image';
import { FaBell } from 'react-icons/fa';

const Page = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [ThongBao, setThongBao] = useState([]);
    useEffect(() => {
      LayThongBao().then((res) => {
        setThongBao(res);
      });
    }, []);
    
  const renderContent = () => {
  
    console.log(ThongBao, "ssss");

    switch (activeTab) {
      case 'student':
        return (
          <div
            id="tabs--12-content-1"
            role="tabpanel"
            className="tab-content active"
            tabIndex="0"
            data-purpose="tab-container"
            aria-labelledby="tabs--12-tab-1"
          >
            <div data-testid="notification-tab-pane-student" data-purpose="notification-tab-pane">
              <div className="space-y-4">
                {ThongBao.length > 0 ? (
                  <div data-purpose="notification" className="p-4 bg-white rounded shadow">
                    {ThongBao.map((item) => (
                      <Link key={item.id} href={`/page/course-detail?id=${item.noidung.id}`}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="shrink-0">
                            <Img
                              width="64"
                              height="64"
                              src={item.noidung.hinh}
                              alt=""
                              className="w-16 h-16 rounded-full"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1">
                            <a
                              data-purpose="notification-message"
                              href={`/course/learn-php-for-beginners-n/learn/#announcements/${item.noidung.id}/`}
                              className="text-lg font-semibold text-blue-600 hover:underline"
                            >
                              <span>
                                {item.giangvien.ten} đã thực hiện một thông báo:{' '}
                                <span className="font-medium text-[14px] text-gray-700">
                                  {item.noidung.mota}
                                </span>
                              </span>
                            </a>
                            <div className="text-[12px] text-gray-500">{item.thoigiangui}</div>
                          </div>
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="p-2 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
                              aria-label="Đánh dấu là đã đọc"
                              tabIndex="0"
                            >
                              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-white rounded shadow">
                    <FaBell className="text-gray-400 text-5xl mb-4" />
                    <p className="text-gray-500 text-xl">Không có thông báo nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="col-lg-9 rts-sticky-column-item overflow-y-scroll ịadkljas">
      <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
        <div className=" px-6 py-8">
          <h1 className="text-[20px]   font-bold mb-8">Thông báo</h1>
          <div className="w-full space-y-6" data-module-id="activity-notifications">
            <div className="w-full" data-testid="activity-notifications-container">
              <div className="border-b border-gray-200">
                <div className="py-4 text-[16px] ">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;