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



const Headerdashboardstudent1 = () => {
  const router = useRouter()
  const [data, setData] = useState({});
  const [KhoaHocDaHoc, setKhoaHocDaHoc] = useState([]);
  const [KhoaHocDaxong, setKhoaHocDaHoanThanh] = useState([]);
  const [NguoiDung, setNguoiDung] = useState({});
  const [TheoDoi, setTheoDoi] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('data');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await user();
        setNguoiDung(response3.data);
      } catch (error) {
        console.log('Failed to fetch user data');
      }

      try {
        const response = await KhoaHocDangHoc();
        setKhoaHocDaHoc(response);
      } catch (error) {
        console.log('Failed to fetch ongoing courses');
      }

      try {
        const response2 = await KhoaHocDaHoanThanh();
        setKhoaHocDaHoanThanh(response2.data);
      } catch (error) {
        console.log('Failed to fetch completed courses');
      }

      try {
        const response4 = await DanhSachTheoDoi();
        setTheoDoi(response4);
      } catch (error) {
        console.log('Failed to fetch following list');
      }
    };

    fetchData();
  }, []);
  console.log(TheoDoi)
  const unfollow = async (id) => {
    try {
      const response = await BoTheoDoiGiangVien(id);
      if (!response.ok) {
        throw new Error('Failed to unfollow lecturer');
      }
      console.log('Successfully unfollowed lecturer');
      window.location.href = window.location.href;
    } catch (error) {
      console.error(error);
    }
  }


  return (

    <div className="col-lg-12">
      <div className="dashboard-banner-area-start bg_image student-dashboard" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {/* {data.vaitro != 0 ? (
          <div className="rating-area-banner-dashboard"
            style={{
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            <a href="/page/lecturer-dashboard"
              className="create-btn"
              style={{
                ...buttonStyle('#4CAF50', '#45a049'),
                padding: '12px 24px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transform: 'translateY(0)',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }
              }}>
              <i className="fa-regular fa-circle-plus"
                style={{
                  marginRight: '12px',
                  fontSize: '1.1em',
                  transition: 'transform 0.3s ease'
                }}></i>
              Giảng viên
            </a>
          </div>
        ) : (
          <div
            className="rating-area-banner-dashboard"
            style={{
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e4eff7 100%)',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease'
            }}
          >
            <a
              href="/page/become-instructor"
              className="create-btn"
              style={{
                ...buttonStyle('#2196F3', '#1976D2'),
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(33, 150, 243, 0.3)',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(33, 150, 243, 0.4)'
                }
              }}
            >
              <i
                className="fa-regular fa-circle-plus"
                style={{
                  marginRight: '12px',
                  fontSize: '18px'
                }}
              />
              Tạo tài khoản giảng viên
            </a>
          </div>
        )} */}
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
              <ul className="list-unstyled">
                {TheoDoi.map((item) => (
                  <li
                    className="d-flex align-items-center mb-3 p-3 border rounded"
                    key={item.giangvien.id}
                    style={{
                      backgroundColor: '#f8f9fa',
                      transition: 'all 0.3s ease',
                      ':hover': {
                        backgroundColor: '#f1f3f5',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <Link href={`/page/Profile-insructor?id=${item.giangvien.id}`}
                      className="d-flex align-items-center text-decoration-none flex-grow-1">
                      <Image
                        width={500}
                        height={300}
                        src={item.giangvien.hinh}
                        alt={item.giangvien.ten}
                        className="rounded-circle me-3"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          border: '2px solid #e9ecef'
                        }}
                      />
                      <h3 style={{
                        fontSize: '18px',
                        margin: 0,
                        color: '#343a40'
                      }}>{item.giangvien.ten}</h3>
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm w-40"
                      onClick={() => unfollow(item.id)}
                      style={{
                        borderRadius: '20px',
                        padding: '8px 16px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="bi bi-x-circle me-1"></i> Unfollow
                    </button>
                  </li>
                ))}
              </ul>
            </Modal>,
            document.body
          )}
        </div>
      </div>
      
    </div>



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
              <i className="fa-light fa-house" />
              <p>Bảng điều khiển</p>
            </Link>

            <Link
              href={"/page/dashboard-student/myprofile"}
              className={`single-item ${pagess === 'hoso' ? 'active' : ''}`}
              onClick={() => click("hoso")}
            >
              <i className="fa-regular fa-user" />
              <p>Hồ sơ của tôi</p>
            </Link>

            <Link
              href={"/page/dashboard-student/khoahocdanghoc"}
              className={`single-item ${pagess === 'khoahoc' ? 'active' : ''}`}
              onClick={() => click("khoahoc")}
            >
              <i className="fa-light fa-graduation-cap" />
              <p>Khóa học đang học</p>
            </Link>

            <Link
              href={"/page/dashboard-student/lichsudonhang"}
              className={`single-item ${pagess === 'lichsudonhang' ? 'active' : ''}`}
              onClick={() => click("lichsudonhang")}
            >
              <i className="fa-sharp fa-light fa-bag-shopping" />
              <p>Lịch sử đơn hàng</p>
            </Link>
            <Link
              href={"/page/dashboard-student/khuyenmai"}
              className={`single-item ${pagess === 'khuyenmai' ? 'active' : ''}`}
              onClick={() => click("khuyenmai")}
            >
              <i className="fa-sharp fa-light fa-bag-shopping" />
              <p>Khuyến mãi</p>
            </Link>
            <Link 
              href={"/page/dashboard-student/YeuThich"} 
              className={`single-item ${pagess === 'quanlykhoahoc' ? 'active' : ''}`}
              onClick={() => click("quanlykhoahoc")}

            >
              <i className="fa-light fa-book" />
              <p>Yêu thích</p>
            </Link>

    

            <Link href="announcement.html"
            className={`single-item ${pagess === 'thongbao' ? 'active' : ''}`}
            onClick={() => click("thongbao")}
            >
              <i className="fa-solid fa-megaphone" />
              <p>Thông báo</p>
            </Link>

           
          </div>

          <div className="dashboard-left-single-wrapper bbnone mt--40">
            <h4 className="title mb--5">User</h4>
            <Link href="/page/dashboard-student/setting" className="single-item">
              <i className="fa-sharp fa-regular fa-gear" />
              <p>Cài đặt</p>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export { Headerdashboardstudent1, Headerdashboardstudent2 } 