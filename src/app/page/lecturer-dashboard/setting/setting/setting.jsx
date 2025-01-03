"use client";
import React, { useEffect, useState } from 'react';
import { updateUser, ShowUser, UpdatePassWord } from '../../../../../service/Lecture/accout';
import { MangXaHoiss, ShowMangXaHoi } from '../../../../../service/MangXaHoi/MangXaHoi';

import Image from 'next/image';



const Profile = () => {
  const cloudName = 'dn7s1su66'; // Ensure this is your Cloudinary cloud name
  const uploadPreset = 'my_unsigned_preset'; // Ensure this is your Cloudinary upload preset

  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    dienthoai: '',
    hinh: null,
    tieusu: ''
  });
  const [imageSelected, setImageSelected] = useState(null);

  const uploadImage = async () => {
    const imageFormData = new FormData();
    imageFormData.append("file", imageSelected);
    imageFormData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: imageFormData,
      });
      const data = await response.json();
      setFormData(prevFormData => ({
        ...prevFormData,
        hinh: data.secure_url
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await ShowUser();
      // console.log(userData); 
      setFormData({
        ten: userData.data.ten || '',
        email: userData.data.email || '',
        dienthoai: userData.data.dienthoai || '',
        hinh: userData.data.hinh || null,
        tieusu: userData.data.tieusu || ''
      });
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = async (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setImageSelected(files[0]);
      await uploadImage();
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      alert('Thông tin đã được cập nhật thành công');
    } catch (error) {
      alert('Cập nhật thông tin thất bại');
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h3 className="profile-title text-[16px]">Thông tin của bạn</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="ten " className="text-[14px]">Họ tên</label>
              <input type="text" id="ten" className='text-[16px] placeholder:text-[15px]' value={formData.ten} onChange={handleChange} style={{ fontSize: '16px' }} />
            </div>
            <div className="form-group">
              <div className="image-upload-section  flex flex-row gap-4">
     
                  <div className="image-preview rounded-lg">
                    {formData.hinh ? (
                      <Image
                        width={100}
                        height={100}
                        src={formData.hinh}
                        alt="Profile"
                        className="preview-image "
                      />
                    ) : (
                      <div className="placeholder-image">
                        <span>Upload Image</span>
                      </div>
                    )}
                  </div>
          
                  <div className="upload-controls">
                    <label htmlFor="hinh" className="bg-white text-[14px] border-1 border-pink-700 hover:bg-pink-300 text-pink-800 font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 inline-block">
                      Chọn hình ảnh
                      <input type="file" id="hinh" onChange={handleChange} hidden />
                    </label>
                  </div>
            


              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="dienthoai" className="text-[14px]">Số điện thoại</label>
              <input type="text" id="dienthoai" className="text-[16px] placeholder:text-[15px]" value={formData.dienthoai} onChange={handleChange} style={{ fontSize: '16px' }} />

            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-[14px]">Email</label>
              <input type="email" id="email" className="text-[16px] placeholder:text-[15px]" value={formData.email} onChange={handleChange} style={{ fontSize: '16px' }} />
            </div>

            <div className="form-group full-width">
              <label htmlFor="tieusu" className="text-[14px]">Tiểu sử</label>
              <textarea id="tieusu" className="text-[16px] placeholder:text-[15px]" value={formData.tieusu} onChange={handleChange} rows="4" style={{ fontSize: '16px' }} />
            </div>

          </div>



          <button type="submit" className="w-full py-3 px-6 rounded-lg bg-pink-700 hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center">
            <p className="text-white text-xl font-semibold">Lưu</p>
          </button>
        </form>
      </div>

      <style jsx>{`
        .profile-container {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .profile-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .profile-title {
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2rem;
          text-align: center;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #4a5568;
          font-weight: 500;
        }

        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.2s;
          font-size: 1rem;
        }

        input:focus, textarea:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          outline: none;
        }

        .image-upload-section {
          margin: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .image-preview {
          width: 200px;
          height: 100px;
      
          overflow: hidden;
          background: #f7fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #e2e8f0;
        }

        .preview-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .placeholder-image {
          color: #a0aec0;
          font-size: 1rem;
        }

        .upload-button {
          background: #4299e1;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-button:hover {
          background: #3182ce;
          transform: translateY(-1px);
        }

       

       
      `}</style>
    </div>
  );
};


const MangXaHoi = () => {
  const [ShowMangXaHoi1, setMangXaHoi] = useState({ facebook: '', skype: '', linkedin: '', pinterest: '', github: '' });

  useEffect(() => {
    ShowMangXaHoi()
      .then((data) => {
        const transformedData = data.data.reduce((acc, item) => {
          acc[item.nentang] = item.url;
          return acc;
        }, {});
        setMangXaHoi(transformedData);
      })
      .catch((error) => {
        console.error('Failed to fetch social profile data:', error);
      });
  }, []);

  const [formData, setFormData] = useState({
    facebook: '',
    skype: '',
    linkedin: '',
    pinterest: '',
    github: ''
  });

  useEffect(() => {
    if (ShowMangXaHoi1) {
      setFormData({
        facebook: ShowMangXaHoi1.facebook || '',
        skype: ShowMangXaHoi1.skype || '',
        linkedin: ShowMangXaHoi1.linkedin || '',
        pinterest: ShowMangXaHoi1.pinterest || '',
        github: ShowMangXaHoi1.github || ''
      });
    }
  }, [ShowMangXaHoi1]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const platforms = ['facebook', 'skype', 'linkedin', 'pinterest', 'github'];
      const updatePromises = platforms
        .filter(platform => formData[platform])  // Filter out empty URLs
        .map(platform => MangXaHoiss({
          nentang: platform,
          url: formData[platform]
        }));

      // Update social profile data on form submission
      await Promise.all(updatePromises);
      alert('Social profile links have been successfully updated');
    } catch (error) {
      alert('Failed to update social profile links');
      console.error(error);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="social-profiles-container">
        <div className="social-profile-card">
          <h3 className="profile-title text-[20px]">Link mạng xã hội</h3>

          <form onSubmit={handleSubmit} className="social-form">
            {[
              { id: 'facebook', icon: 'fa-facebook-f', label: 'Facebook', placeholder: 'facebook.com/username' },
              { id: 'skype', icon: 'fa-skype', label: 'Skype', placeholder: 'skype.com/username' },
              { id: 'linkedin', icon: 'fa-linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
              { id: 'pinterest', icon: 'fa-pinterest', label: 'Pinterest', placeholder: 'pinterest.com/username' },
              { id: 'github', icon: 'fa-github', label: 'Github', placeholder: 'github.com/username' }
            ].map(platform => (
              <div className="profile-input-group" key={platform.id}>
                <div className="platform-info text-[16px]">
                  <div className="platform-icon">
                    <i className={`fa-brands ${platform.icon}`} />
                  </div>
                  <span className="platform-label">{platform.label}</span>
                </div>
                <input
                  type="url"
                  id={platform.id}
                  className="social-input placeholder:text-[14px] text-[14px]"
                  style={{ fontSize: '14px' }}
                  placeholder={`https://${platform.placeholder}`}
                  onChange={handleChange}
                  value={formData[platform.id]}

                />
              </div>
            ))}

            <button type="submit" className="w-full py-3 px-6 rounded-lg bg-pink-700 hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center gap-2">
              <i className="fas fa-save text-white text-[14px]"></i>
              <span className="text-white text-xl font-semibold">Lưu</span>
            </button>
          </form>
        </div>
      </div>
    </>

  );
};

// Add this CSS to your stylesheet
const styles = `
.social-profiles-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.social-profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.profile-title {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.social-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-input-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.profile-input-group:hover {
  background: #f8f9fa;
  transform: translateX(5px);
}

.platform-info {
  display: flex;
  align-items: center;
  min-width: 150px;
  gap: 1rem;
}

.platform-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f0f2f5;
  color: #4a5568;
}

.platform-label {
  font-weight: 500;
  color: #4a5568;
}

.social-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.social-input:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  outline: none;
}

.submit-button {
  margin-top: 1rem;
  padding: 1rem 2rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:hover {
  background: #3182ce;
  transform: translateY(-2px);
}

.submit-button i {
  font-size: 1.1rem;
}`;







const Password = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    password: false,
    password_confirmation: false
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error('Mật khẩu mới và xác nhận không khớp');
      return;
    }
    try {
      await UpdatePassWord(formData);
      toast.success('Đổi mật khẩu thành công');
    } catch (error) {
      toast.error('Đổi mật khẩu thất bại');
      console.error(error);
    }
  };

  const getFieldLabel = (field) => {
    switch (field) {
      case 'old_password':
        return 'Mật khẩu cũ';
      case 'password':
        return 'Mật khẩu mới';
      case 'password_confirmation':
        return 'Xác nhận mật khẩu';
      default:
        return field;
    }
  };

  return (
    <div className="password-change-container">
      <form onSubmit={handleSubmit} className="password-form">
        <h2 className='text-[20px] font-medium'>Đổi mật khẩu</h2>
        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group  ">
            <label htmlFor={field} className='text-[16px]'>
              {getFieldLabel(field)}
            </label>
            <div className="password-input-wrapper">
              <input
                id={field}
                type={showPasswords[field] ? "text" : "password"}
                placeholder={`Nhập ${getFieldLabel(field).toLowerCase()}`}
                value={formData[field]}
                onChange={handleChange}
                required
                className="password-input placeholder:text-xl"
              />
              <button
                type="button"
                className="toggle-password w-5 h-20"
                onClick={() => togglePasswordVisibility(field)}
              >
                {showPasswords[field] ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
        ))}
        <button type="submit" className="w-full py-3 px-6 rounded-lg bg-pink-700 hover:bg-pink-600 flex items-center justify-center">
          <p className='text-[14px] text-white'>Đổi mật khẩu</p>
        </button>
      </form>

      <style jsx>{`
        .password-change-container {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background: white;
        }

        .password-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .password-input:focus {
          border-color: #f472b6;
          outline: none;
          box-shadow: 0 0 0 2px rgba(244, 114, 182, 0.25);
        }

        .toggle-password {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
        }

        label {
          color: #555;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};




export { Profile, Password, MangXaHoi };