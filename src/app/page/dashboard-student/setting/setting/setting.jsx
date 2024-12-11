"use client";
import React, { useEffect, useState } from 'react';
import { updateUser, ShowUser, UpdatePassWord } from '../../../../../service/User/user';
import { MangXaHoiss, ShowMangXaHoi } from '../../../../../service/MangXaHoi/MangXaHoi';
import Image from 'next/image';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { FaFacebookF, FaSkype, FaLinkedinIn, FaPinterest, FaGithub, FaCheck } from 'react-icons/fa';



const Profile = () => {
  const cloudName = 'dn7s1su66'; // Ensure this is your Cloudinary cloud name
  const uploadPreset = 'my_unsigned_preset'; // Ensure this is your Cloudinary upload preset

  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    dienthoai: '',
    hinh: null,
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
    <div className="profile-form" style={{
      padding: '2rem',
      borderRadius: '16px',
      background: 'white',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
    }}>
      <h3 className='text-black font-bold text-3xl'>Cài đặt thông tin</h3>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        {formData.hinh && (
          <div className="image-preview" style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Image
              width={120}
              height={120}
              src={formData.hinh}
              alt="Profile"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #2563eb',
                fontSize: '1.4rem',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
            />
          </div>
        )}

        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="hinh" style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#64748b',
            fontSize: '1.5rem'
          }}>Hình đại diện</label>
          <input
            type="file"
            id="hinh"
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px dashed #e5e7eb',
              fontSize: '1.4rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          />
        </div>

        {['ten', 'email', 'dienthoai'].map((field) => (
          <div key={field} className="form-group" style={{ position: 'relative' }}>
            <label
              htmlFor={field}
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#64748b',
                fontSize: '1.5rem'
              }}
            >
              {field === 'ten' ? 'Tên' : field === 'dienthoai' ? 'Điện thoại' : 'Email'}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Nhập ${field === 'ten' ? 'tên' : field === 'dienthoai' ? 'điện thoại' : 'email'} của bạn`}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1.4rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
            />
          </div>
        ))}

<button
    type="submit"
    style={{
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        background: 'rgb(190, 24, 93)',  // pink-700
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: '500',
        fontSize: '1.4rem',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(190, 24, 93, 0.2)'
        }
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(190, 24, 93, 0.2)';
    }}
    onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
    }}
>
    Cập nhật thông tin
</button>
      </form>
      <style jsx>{`
      .profile-form {
  animation: fadeIn 0.5s ease-in-out;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.image-preview img:hover {
  transform: scale(1.05);
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  const socialIcons = {
    facebook: { icon: <FaFacebookF />, color: '#1877f2' },
    skype: { icon: <FaSkype />, color: '#00aff0' },
    linkedin: { icon: <FaLinkedinIn />, color: '#0077b5' },
    pinterest: { icon: <FaPinterest />, color: '#e60023' },
    github: { icon: <FaGithub />, color: '#333' }
  };
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
    <div style={{
      padding: '2rem',
      borderRadius: '16px',
      background: 'white',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
    }}>
      <h3 className='text-3xl text-black font-bold'>Mạng xã hội</h3>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }} className='mt-4'>
        {Object.entries(socialIcons).map(([platform, { icon, color }]) => (
          <div key={platform} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            fontSize: '1.4rem',
            transition: 'all 0.3s ease',
            ':hover': {
              borderColor: color,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              width: '140px',
              color: color
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {icon}
              </div>
              <span style={{ fontWeight: '500' }}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                id={platform}
                placeholder={`https://www.${platform}.com/username`}
                value={formData[platform]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    borderColor: color,
                    outline: 'none',
                    boxShadow: `0 0 0 3px ${color}15`
                  }
                }}
              />
              {formData[platform] && (
                <div style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#10b981'
                }}>
                  <FaCheck />
                </div>
              )}
            </div>
          </div>
        ))}

<button
    type="submit"
    style={{
        marginTop: '1rem',
        padding: '1rem 2rem',
        background: 'rgb(190, 24, 93)', // Changed from #32ADE6 to pink-700
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.4rem',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(190, 24, 93, 0.2)';
    }}
    onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
    }}
>
    Cập nhật
</button>
      </form>
      <style jsx>{`@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.social-profile-link-wrapper {
  animation: slideIn 0.5s ease-out;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

input:focus {
  transform: scale(1.01);
}` }</style>
    </div>
  );
};






const Password = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    password: false,
    password_confirmation: false
  });
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      alert('New password and confirmation do not match');
      return;
    }
    try {
      await UpdatePassWord(formData);
      alert('Password has been successfully reset');
    } catch (error) {
      alert('Failed to reset password');
      console.error(error);
    }
  };
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  return (
    <div style={{
      padding: '2rem',
      borderRadius: '16px',
      background: 'white',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
    }}>
      <h3 className='text-3xl font-bold text-black flex gap-2'>
        <FaLock /> Cài đặt mật khẩu
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' ,  fontSize: '1.4rem', }}  className='mt-4'>
        {['old_password', 'password', 'password_confirmation'].map((field) => (
          <div key={field} style={{ position: 'relative' }}>
            <label
              htmlFor={field}
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#64748b',
                fontSize: '1.5rem'
              }}
            >
              {field === 'old_password' ? 'Mật khẩu hiện tại' :
                field === 'password' ? 'Mật khẩu mới' : 'Nhập lại mật khẩu'}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id={field}
                type={showPasswords[field] ? 'text' : 'password'}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  fontSize: '1.4rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  width: '40px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  padding: '0.25rem'
                }}
              >
                {showPasswords[field] ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        ))}

<button
    type="submit"
    style={{
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        background: 'rgb(190, 24, 93)', // Changed to pink-700
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: '500'
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(190, 24, 93, 0.2)';
    }}
    onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
    }}
>
    <FaLock /> Cập nhật mật khẩu
</button>
      </form>
    </div>
  );
};




export { Profile, Password, MangXaHoi };