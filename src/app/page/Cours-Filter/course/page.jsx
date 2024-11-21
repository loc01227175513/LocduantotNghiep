"use client";
import React, { useState, useEffect } from 'react';
import { Grid, List } from './course';
import { Allcoursesss } from '../../../../service/course/course.service';

export default function Page() {
  const searchKeyword = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('search') : '';

  const [view, setView] = useState('grid');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchKeyword || '');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const IdTheLoai = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '';

  // Sort state
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    Allcoursesss()
      .then((data) => {
        setCourses(data.data);
        setFilteredCourses(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by IdTheLoai
    if (IdTheLoai) {
      const parsedId = parseInt(IdTheLoai, 10);
      if (!isNaN(parsedId)) {
        filtered = filtered.filter(course => course.id_theloai === parsedId);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.ten.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) =>
        selectedCategories.includes(course.chude)
      );
    }

    // Filter by selected authors
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((course) =>
        selectedAuthors.includes(course.giangvien)
      );
    }

    // Filter by selected prices
    if (selectedPrices.length > 0) {
      filtered = filtered.filter((course) => {
        if (selectedPrices.includes('Miễn phí') && course.gia === 0) {
          return true;
        }
        if (selectedPrices.includes('Trả') && course.gia > 0) {
          return true;
        }
        return false;
      });
    }

    // Sort courses
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'Popularity':
            return b.dangky - a.dangky;
          case 'Price':
            return a.gia - b.gia;
          case 'Stars':
            const avgA = averageRating(a.danhgia);
            const avgB = averageRating(b.danhgia);
            return avgB - avgA;
          case 'Newest':
            return new Date(b.created_at) - new Date(a.created_at);
          case 'Oldest':
            return new Date(a.created_at) - new Date(b.created_at);
          default:
            return 0;
        }
      });
    }

    setFilteredCourses(filtered);
  }, [
    courses,
    searchTerm,
    selectedCategories,
    selectedAuthors,
    selectedPrices,
    sortBy,
    IdTheLoai,
  ]);

  const averageRating = (danhgia) => {
    if (!danhgia || danhgia.length === 0) return 0;
    const sum = danhgia.reduce((acc, curr) => acc + parseFloat(curr.danhgia), 0);
    return sum / danhgia.length;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (setter) => (e) => {
    const { value, checked } = e.target;
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const renderContent = () => {
    switch (view) {
      case 'grid':
        return <Grid courses={filteredCourses} />;
      case 'list':
        return <List courses={filteredCourses} />;
      default:
        return <Grid courses={filteredCourses} />;
    }
  };

  return (
    <div>
      <div className="rts-course-default-area rts-section-gap">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3">
              {/* course-filter-area start */}
              <div className="rts-course-filter-area">
                {/* Search Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">
                    <i className="fas fa-search" /> Tìm kiếm
                  </h6>
                  <div className="search-filter filter-body">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="Search Course..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <i className="fa-light fa-magnifying-glass" />
                    </div>
                  </div>
                </div>
                {/* Category Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">
                    <i className="fas fa-layer-group" /> Loại
                  </h6>
                  <div className="checkbox-filter filter-body">
                    <div className="checkbox-wrapper">
                      {Array.from(new Set(courses.map((course) => course.chude))).map(
                        (category, index) => (
                          <div className="single-checkbox-filter" key={index}>
                            <div className="check-box">
                              <input
                                type="checkbox"
                                id={`category-${index}`}
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={handleCheckboxChange(setSelectedCategories)}
                              />
                              <label htmlFor={`category-${index}`}>{category}</label>
                              <br />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {/* Author Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">
                    <i className="fas fa-chalkboard-teacher" /> Tác giả
                  </h6>
                  <div className="checkbox-filter filter-body">
                    <div className="checkbox-wrapper">
                      {Array.from(new Set(courses.map((course) => course.giangvien))).map(
                        (author, index) => (
                          <div className="single-checkbox-filter" key={index}>
                            <div className="check-box">
                              <input
                                type="checkbox"
                                id={`author-${index}`}
                                value={author}
                                checked={selectedAuthors.includes(author)}
                                onChange={handleCheckboxChange(setSelectedAuthors)}
                              />
                              <label htmlFor={`author-${index}`}>{author}</label>
                              <br />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {/* Price Filter */}
                <div className="single-filter-left-wrapper">
                  <h6 className="title">
                    <i className="fas fa-tags" /> Giá
                  </h6>
                  <div className="checkbox-filter filter-body last">
                    <div className="checkbox-wrapper">
                      {['Miễn phí', 'Trả'].map((price, index) => (
                        <div className="single-checkbox-filter" key={index}>
                          <div className="check-box">
                            <input
                              type="checkbox"
                              id={`price-${index}`}
                              value={price}
                              checked={selectedPrices.includes(price)}
                              onChange={handleCheckboxChange(setSelectedPrices)}
                            />
                            <label htmlFor={`price-${index}`}>{price}</label>
                            <br />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Clear All Filters */}
                <button
                  className="rts-btn btn-border"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setSelectedAuthors([]);
                    setSelectedPrices([]);
                    setSortBy('');
                  }}
                >
                  <i className="fa-regular fa-x" /> Xóa tất cả các bộ lọc
                </button>
              </div>
              {/* course-filter-area end */}
            </div>
            <div className="col-lg-9">
              {/* filter top-area  */}
              <div className="filter-small-top-full">
                <div className="left-filter">
                  <span>Sắp xếp theo</span>
                  <select
                    className="nice-select"
                    name="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="">Mặc định</option>
                    <option value="Popularity">Sự phổ biến</option>
                    <option value="Price">Giá</option>
                    <option value="Stars">Sao</option>
                    <option value="Newest">Mới nhất</option>
                    <option value="Oldest">Lâu đời nhất</option>
                  </select>
                </div>
                <div className="right-filter">
                  <span>
                    Hiển thị {filteredCourses.length} của {courses.length} kết quả
                  </span>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setView('grid')}
                        className={`nav-link ${view === 'grid' ? 'active' : ''}`}
                        id="home-tab"
                        type="button"
                        role="tab"
                      >
                        <i className="fa-light fa-grid-2" />
                        <span>Grid</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setView('list')}
                        className={`nav-link ${view === 'list' ? 'active' : ''}`}
                        id="profile-tab"
                        type="button"
                        role="tab"
                      >
                        <i className="fa-light fa-list" />
                        <span>Danh sách</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      
  .single-filter-left-wrapper .title i {
    margin-right: 0.75rem;
    font-size: 1.2rem;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: pulse 2s infinite;
  }

  /* Update title JSX to include icons */
  <h6 className="title">
    <i className="fas fa-search" /> Tìm kiếm
  </h6>

  <h6 className="title">
    <i className="fas fa-layer-group" /> Loại
  </h6>

  <h6 className="title">
    <i className="fas fa-chalkboard-teacher" /> Tác giả
  </h6>

  <h6 className="title">
    <i className="fas fa-tags" /> Giá
  </h6>

  /* Enhanced checkbox icons */
  .check-box input[type="checkbox"] {
    position: relative;
    appearance: none;
  }

  .check-box input[type="checkbox"]:checked::before {
    content: '\f00c';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.7rem;
  }

  /* Enhanced sort icon */
  .nice-select::after {
    content: '\f0dc';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
  }

  /* Enhanced view toggle icons */
  .nav-link i {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  .nav-link:hover i {
    transform: scale(1.1);
  }

  .nav-link.active i {
    animation: bounceIn 0.3s ease-out;
  }

  /* Clear filters button icon */
  .rts-btn.btn-border i {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }

  .rts-btn.btn-border:hover i {
    transform: rotate(90deg);
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }

  @keyframes bounceIn {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  .rts-course-filter-area {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  .single-filter-left-wrapper {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
  }

  .input-wrapper {
    position: relative;
  }

  .input-wrapper input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 2.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .input-wrapper input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    outline: none;
  }

  .input-wrapper i {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }

  .checkbox-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .check-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .check-box input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 4px;
    border: 2px solid #cbd5e1;
    transition: all 0.2s ease;
  }

  .check-box input[type="checkbox"]:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }

  .check-box label {
    color: #475569;
    font-size: 0.95rem;
    cursor: pointer;
  }

  .rts-btn.btn-border {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    color: #64748b;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .rts-btn.btn-border:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  .filter-small-top-full {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    margin-bottom: 2rem;
  }

  .nice-select {
    padding: 0.5rem 2rem 0.5rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    color: #475569;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .nice-select:hover {
    border-color: #cbd5e1;
  }

  .nav-tabs {
    border: none;
    display: flex;
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: #64748b;
    transition: all 0.3s ease;
  }

  .nav-link.active {
    background: #3b82f6;
    color: white;
  }

  .nav-link:not(.active):hover {
    background: #f1f5f9;
    color: #3b82f6;
  }

  .nav-link i {
    margin-right: 0.5rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .rts-course-filter-area {
    animation: fadeIn 0.4s ease-out forwards;
  }
`}</style>
    </div>
  );
}