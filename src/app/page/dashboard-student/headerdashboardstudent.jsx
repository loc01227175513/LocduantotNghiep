"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KhoaHocDangHoc, KhoaHocDaHoanThanh } from '../../../service/dashbordStuden/Dashboard-service'
import { DanhSachTheoDoi, BoTheoDoiGiangVien } from '../../../service/Follow/Follow';
import { user } from '../../../service/User/user'
import {
  FaHome, FaUser, FaGraduationCap, FaShoppingBag,
  FaTag, FaHeart, FaCog, FaSignOutAlt
} from 'react-icons/fa';

import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Headerdashboardstudent1 = () => {
  const router = useRouter()
  const [data, setData] = useState({});
  const [KhoaHocDaHoc, setKhoaHocDaHoc] = useState([]);
  const [KhoaHocDaxong, setKhoaHocDaHoanThanh] = useState([]);
  const [NguoiDung, setNguoiDung] = useState({});
  const [TheoDoi, setTheoDoi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingItems, setLoadingItems] = useState({});

  useEffect(() => {
    const loadLocalStorage = () => {
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('data');
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      }
    };

    loadLocalStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);  // Reset error state
      try {
        const [userResponse, coursesResponse, completedResponse, followingResponse] = await Promise.allSettled([
          user(),
          KhoaHocDangHoc(),
          KhoaHocDaHoanThanh(),
          DanhSachTheoDoi()
        ]);
  
        // Check and set data for each response
        if (userResponse.status === 'fulfilled') {
          setNguoiDung(userResponse.value.data);
        }
  
        if (coursesResponse.status === 'fulfilled') {
          setKhoaHocDaHoc(coursesResponse.value);
        } else {
          console.error('Course fetch failed:', coursesResponse.reason);
          setError('Could not load courses');
        }
  
        if (completedResponse.status === 'fulfilled') {
          setKhoaHocDaHoanThanh(completedResponse.value.data);
        }
  
        if (followingResponse.status === 'fulfilled') {
          setTheoDoi(followingResponse.value);
        }
      
      } catch (error) {
        console.error('Fetch data error:', error);
        setError('An error occurred while loading data');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const unfollow = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await BoTheoDoiGiangVien(id);
      if (response.ok) {
        setTheoDoi(prevTheoDoi => prevTheoDoi.filter(item => item.id !== id));
        
        const updatedFollowing = await DanhSachTheoDoi();
        setTheoDoi(updatedFollowing);
        toast.success('Unfollowed successfully!');
      } else {
        throw new Error('Không thể bỏ theo dõi giảng viên');
      }
    } catch (error) {
      setError(error.message);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="col-lg-12">
        <div className="bg-gradient-to-r from-blue-900 to-pink-700 via-pink-700" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="author-profile-image-and-name" style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}>
            <div className="profile-pic" style={{ marginBottom: '25px' }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                animation: 'float 6s ease-in-out infinite'
              }}>
                <Image
                  width={500}
                  height={300}
                  src={NguoiDung.hinh || '/default-avatar.png'}
                  alt="dashboard"
                  style={{
                    borderRadius: '50%',
                    border: '3px solid rgba(255,255,255,0.2)',
                    padding: '5px',
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: '-3px',
                  borderRadius: '50%',
                  padding: '3px',
                  background: 'linear-gradient(45deg, #2196F3, #00BCD4)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}></div>
              </div>
            </div>

            <div className="name-desig">
              <h1 className="title" style={{
                color: 'white',
                fontSize: '28px',
                marginBottom: '20px',
                fontWeight: '600',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>{NguoiDung.ten || 'Tên người dùng'}</h1>

              <div className="course-vedio" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                margin: '0 auto',
                maxWidth: '800px'
              }}>
                {[
                  {
                    icon: "fa-book",
                    text: `${KhoaHocDaHoc.length} Khóa học đã đăng ký`,
                    onClick: null
                  },
                  {
                    icon: "fa-file-certificate",
                    text: `${KhoaHocDaxong.length} Chứng chỉ`,
                    onClick: null
                  },
                  {
                    icon: "fa-file-certificate",
                    text: `${TheoDoi.length} Giảng viên theo dõi`,
                    onClick: () => setShowModal(true)
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="single"
                    onClick={item.onClick}
                    style={{
                      ...infoBoxStyle,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '15px',
                      cursor: item.onClick ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      ':hover': {
                        transform: 'translateY(-5px)',
                        background: 'rgba(255,255,255,0.15)'
                      }
                    }}
                  >
                    <i className={`fa-thin ${item.icon}`} style={{
                      marginRight: '10px',
                      color: 'white',
                      fontSize: '24px'
                    }}></i>
                    <span style={{
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '500'
                    }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {showModal && ReactDOM.createPortal(
              <Modal onClose={() => setShowModal(false)}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#1a1a1a'
                }}>Giảng viên theo dõi</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {isLoading ? (
                  <div className="text-center p-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <ul className="list-unstyled">
                    {TheoDoi.map((item) => (
                      <li
                        className="d-flex align-items-center mb-3 p-3 border rounded"
                        key={item.giangvien.id}
                        style={{
                          backgroundColor: '#f8f9fa',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Link 
                          href={`/page/Profile-insructor?id=${item.giangvien.id}`}
                          className="d-flex align-items-center text-decoration-none flex-grow-1"
                          prefetch={true}
                        >
                          <div className="position-relative" style={{ width: '60px', height: '60px' }}>
                            <Image
                              src={item.giangvien.hinh || '/default-avatar.png'}
                              alt={item.giangvien.ten}
                              className="rounded-circle"
                              fill
                              sizes="60px"
                              style={{ objectFit: 'cover' }}
                              priority={true}
                            />
                          </div>
                          <h3 style={{
                            fontSize: '18px',
                            margin: '0 0 0 15px',
                            color: '#343a40'
                          }}>{item.giangvien.ten}</h3>
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm w-40"
                          onClick={() => unfollow(item.id)}
                          disabled={loadingItems[item.id]}
                          style={{
                            borderRadius: '20px',
                            padding: '8px 16px',
                            minWidth: '20px',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {loadingItems[item.id] ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            <>
                              <i className="bi bi-x-circle me-1"></i> Bỏ theo dõi
                            </>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Modal>,
              document.body
            )}
          </div>
        </div>
        
      </div>



    </>
  )
}

const buttonStyle = (backgroundColor, hoverColor) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#fff',
  backgroundColor: backgroundColor,
  padding: '10px 20px',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s',
  cursor: 'pointer'
});

const infoBoxStyle = {
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#0891b2',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const Modal = ({ onClose, children }) => {
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose} style={closeStyle}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

// Updated styles for a TikTok-like modal
const modalStyle = {
  position: 'fixed',
  zIndex: 1000,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.6)', // Darker overlay for TikTok effect
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalContentStyle = {
  backgroundColor: '#ffffff', // Pure white for a clean look
  padding: '20px',
  borderRadius: '16px', // Rounded corners similar to TikTok
  width: '80%',
  maxWidth: '400px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Soft shadow for depth
  position: 'relative',
  textAlign: 'center' // Center text for simpler appearance
};

const closeStyle = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  position: 'absolute',
  top: '10px',
  right: '15px',
  cursor: 'pointer',
  borderRadius: '50%',
  padding: '0 6px',
  backgroundColor: '#f2f2f2' // Subtle background for the close button
};


const Headerdashboardstudent2 = ({ page }) => {
  const [pagess, setPagess] = useState(page)

  const click = (pages) => {
    setPagess(pages)
  }
  return (
    <>
      <div className="col-lg-3 rts-sticky-column-item  overflow-y-scroll">
        <div className="left-sindebar-dashboard theiaStickySidebar">
          <div className="dashboard-left-single-wrapper">
            <Link
              href={"/page/dashboard-student"}
              className={`single-item ${pagess === 'home' ? 'active' : ''}`}
              onClick={() => click("home")}
            >
              <i className="fa-light fa-house text-2xl" />
              <p>Bảng điều khiển</p>
            </Link>

            <Link
              href={"/page/dashboard-student/myprofile"}
              className={`single-item ${pagess === 'hoso' ? 'active' : ''}`}
              onClick={() => click("hoso")}
            >
              <i className="fa-regular fa-user text-2xl" />
              <p>Hồ sơ của tôi</p>
            </Link>

            <Link
              href={"/page/dashboard-student/khoahocdanghoc"}
              className={`single-item ${pagess === 'khoahoc' ? 'active' : ''}`}
              onClick={() => click("khoahoc")}
            >
              <i className="fa-light fa-graduation-cap text-2xl" />
              <p>Khóa học đang học</p>
            </Link>

            <Link
              href={"/page/dashboard-student/lichsudonhang"}
              className={`single-item ${pagess === 'lichsudonhang' ? 'active' : ''}`}
              onClick={() => click("lichsudonhang")}
            >
              <i className="fa-sharp fa-light fa-bag-shopping text-2xl" />
              <p>Lịch sử đơn hàng</p>
            </Link>
            <Link
              href={"/page/dashboard-student/khuyenmai"}
              className={`single-item ${pagess === 'khuyenmai' ? 'active' : ''}`}
              onClick={() => click("khuyenmai")}
            >
              <i className="fa-sharp fa-light fa-bag-shopping text-2xl" />
              <p>Khuyến mãi</p>
            </Link>
            <Link 
              href={"/page/dashboard-student/YeuThich"} 
              className={`single-item ${pagess === 'quanlykhoahoc' ? 'active' : ''}`}
              onClick={() => click("quanlykhoahoc")}

            >
              <i className="fa-light fa-book text-2xl" />
              <p>Yêu thích</p>
            </Link>

    

            <Link href="/page/dashboard-student/ThongBao"
            className={`single-item ${pagess === 'thongbao' ? 'active' : ''}`}
            onClick={() => click("thongbao")}
            >
              <i className="fa-light fa-megaphone text-2xl" />
              <p>Thông báo</p>
            </Link>

           
          </div>

          <div className="dashboard-left-single-wrapper bbnone mt--40">
            <Link href="/page/dashboard-student/setting" className="single-item">
              <i className="fa-sharp fa-regular fa-gear text-2xl" />
              <p>Cài đặt</p>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export { Headerdashboardstudent1, Headerdashboardstudent2 } 