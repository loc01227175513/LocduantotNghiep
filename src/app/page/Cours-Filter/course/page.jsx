"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Grid, List } from './course';
import { Allcoursesss } from '../../../../service/course/course.service';
import { combineReducers } from 'redux';

// Ensure that combineReducers is passed a valid object
const rootReducer = combineReducers({
  // your reducers here, e.g.:
  // exampleReducer: exampleReducer,
});

export default function Page() {
  const searchKeyword = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('search') : '';
  const IdTheLoai = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : '';
  const Chude = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('chude') : '';
  const [view, setView] = useState('grid');
  const [courses, setCourses] = useState([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchKeyword || '');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  // Add state for selected subjects
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  // console.log(courses, "courses");
  // Sort state
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    Allcoursesss()
      .then((data) => {
        setCourses(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Move averageRating function above filteredCourses
  const averageRating = (danhgia) => {
    if (!danhgia || danhgia.length === 0) return 0;
    const sum = danhgia.reduce((acc, curr) => acc + parseFloat(curr.danhgia), 0);
    return sum / danhgia.length;
  };

  const filteredCourses = useMemo(() => {
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

    // Filter by Chude from URL if it exists
    if (Chude) {
      filtered = filtered.filter((course) => course.id_chude.toString() === Chude);
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

    return filtered;
  }, [courses, searchTerm, selectedCategories, selectedAuthors, selectedPrices, sortBy, IdTheLoai, Chude]);

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
    <div className="rts-course-default-area rts-section-gap">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-3">
            {/* course-filter-area start */}
            <div className="rts-course-filter-area">
              {/* Search Filter */}
              <div className="single-filter-left-wrapper">
                <h6 className="title text-[14px]">
                  <i className="fas fa-search" /> Tìm kiếm
                </h6>
                <div className="search-filter filter-body">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Khóa học tìm kiếm..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="text-xl"
                    />
                    <i className="fa-light fa-magnifying-glass" />
                  </div>
                </div>
              </div>
              {/* Category Filter */}
              <div className="single-filter-left-wrapper">
                <h6 className="title">
                  <i className="fas fa-layer-group " /> Chủ đề
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
                            <label htmlFor={`category-${index}`} className="text-xl">
                              {category}
                            </label>
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
                  <div className="checkbox-wrapper ">
                    {Array.from(new Set(courses.map((course) => course.giangvien))).map(
                      (author, index) => (
                        <div className="single-checkbox-filter" key={index}>
                          <div className="check-box ">
                            <input
                              type="checkbox"
                              id={`author-${index}`}
                              value={author}
                              checked={selectedAuthors.includes(author)}
                              onChange={handleCheckboxChange(setSelectedAuthors)}
                            />
                            <label htmlFor={`author-${index}`} className="text-xl">
                              {author}
                            </label>
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
                          <label htmlFor={`price-${index}`} className="text-xl">
                            {price}
                          </label>
                          <br />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Subject Filter */}
              {/* <div className="single-filter-left-wrapper">
                <h6 className="title">
                  <i className="fas fa-book" /> Chủ đề
                </h6>
                <div className="checkbox-filter filter-body">
                  <div className="checkbox-wrapper">
                    {Array.from(new Set(courses.map((course) => course.chude))).map(
                      (subject, index) => (
                        <div className="single-checkbox-filter" key={index}>
                          <div className="check-box">
                            <input
                              type="checkbox"
                              id={`subject-${index}`}
                              value={subject}
                              checked={selectedSubjects.includes(subject)}
                              onChange={handleCheckboxChange(setSelectedSubjects)}
                            />
                            <label htmlFor={`subject-${index}`} className="text-xl">
                              {subject}
                            </label>
                            <br />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div> */}
              {/* Clear All Filters */}
              <button
                className="rts-btn btn-border"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategories([]);
                  setSelectedAuthors([]);
                  setSelectedPrices([]);
                  setSelectedSubjects([]);
                  setSortBy('');
                }}
              >
                Xóa tất cả các bộ lọc
              </button>
            </div>
            {/* course-filter-area end */}
          </div>
          <div className="col-lg-9">
            {/* filter top-area  */}
            <div className="filter-small-top-full">
              <div className="left-filter text-[14px]">
                <span>Sắp xếp theo</span>
                <select
                  className="nice-select text-[14px] text-left"
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
                <span className='text-[14px]'>
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
                      <i className="fa-light fa-grid-2 text-[14px]" />
                      <span className='mx-2 text-[14px]'>Lưới</span>
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
                      <i className="fa-light fa-list text-[14px]" />
                      <span className='mx-2 text-[14px]'>Danh sách</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-20">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}