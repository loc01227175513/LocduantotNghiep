"use client";
import React, { useState, useEffect } from 'react';
import { LayThongBao } from "@/service/ThongBao/ThongBao";
import { use } from '@/assets/js/plugins/swiper';
import Link from 'next/link';
const Page = () => {
  const [activeTab, setActiveTab] = useState('student');

  const renderContent = () => {
    const [activeTab, setActiveTab] = useState('student');
    const [ThongBao, setThongBao] = useState([]);
    useEffect(() => {
      LayThongBao().then((res) => {
        setThongBao(res);
      });
    }, []);
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
                {/* Notification 1 */}
                <div data-purpose="notification" className="p-4 bg-white rounded shadow">
                  {ThongBao.map((item) => (
                    <Link href={`/page/course-detail?id=${item.noidung.id}`}>
                      <div key={item.id} className="flex items-start gap-4 mb-4">
                        <div className="shrink-0">
                          <img
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
                              <span className="font-medium text-gray-700">
                                {item.noidung.mota}
                              </span>
                            </span>
                          </a>
                          <div className="text-sm text-gray-500">{item.thoigiangui}</div>
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

              </div>
              {/* Footer */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  data-purpose="mark-all-as-read"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Đánh dấu tất cả là đã đọc
                </button>
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
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <h1 className="text-2xl font-serif font-bold mb-8">Thông báo.</h1>
          <div className="w-full space-y-6" data-module-id="activity-notifications">
            <div className="w-full" data-testid="activity-notifications-container">
              <div className="border-b border-gray-200">
                <div className="flex mb-4" role="tablist" data-purpose="tab-nav-buttons">
                  <section aria-label="Điều hướng tab" className="w-full">
                    <div className="overflow-x-auto px-2" data-purpose="scroll-port" id="scroll-port--13" aria-live="off">
                      <div data-index="1" className="inline-block">
                        <div className="px-2">
                          <button
                            type="button"
                            id="tabs--12-tab-1"
                            aria-selected={activeTab === 'student'}
                            role="tab"
                            className={`
                      px-6 py-3 text-xl font-medium rounded-lg transition-colors
                      ${activeTab === 'student'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                              }
                    `}
                            onClick={() => setActiveTab('student')}
                          >
                            <span className="text-lg">Học viên (5)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="py-4 text-lg">
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