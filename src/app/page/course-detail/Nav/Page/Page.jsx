"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mota from './Mota';
import Instructor from './Instructor';
import Review from './Review';
import Course from './course';
import NhanTin from './Nhantin';

const MotionDiv = motion.div;

const menuVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const pageVariants = {
  enter: direction => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: direction => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function Page({ course, formattedTotalTime }) {
  const [page, setPage] = useState('mota');
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (newPage) => {
    const currentIndex = menuItems.findIndex(item => item.value === page);
    const newIndex = menuItems.findIndex(item => item.value === newPage);
    setDirection(currentIndex < newIndex ? 1 : -1);
    setIsLoading(true);
    setPage(newPage);
    setTimeout(() => setIsLoading(false), 300);
  };

  const menuItems = [
    { label: 'Thông tin khóa học', value: 'mota' },
    { label: 'Nội dung khóa học', value: 'course' },
    { label: 'Người hướng dẫn', value: 'instructor' },
    { label: 'Đánh giá', value: 'review' },
    { label: 'Nhắn tin', value: 'nhan-tin' }
  ];

  const LoadingSpinner = () => (
    <motion.div 
      className="flex justify-center items-center h-48"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  const renderContent = (course) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (page) {
      case 'review': return <Review course={course} />;
      case 'instructor': return <Instructor course={course} />;
      case 'course': return <Course course={course} formattedTotalTime={formattedTotalTime} />;
      case 'mota': return <Mota course={course} />;
      case 'nhan-tin': return <NhanTin course={course} />;
      default: return <Mota course={course} />;
    }
  };

  return (
    <div className="shadow-lg border border-gray-200 p-4 rounded-md bg-white text-black">
      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        className="w-full pb-12"
      >
        <div className="flex border-b">
          {menuItems.map(({ label, value }) => (
            <motion.button
              key={value}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 8px rgb(59, 130, 246)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 text-center py-3 relative ${
                page === value
                  ? 'bg-blue-500 text-white font-medium'
                  : 'text-gray-700 hover:bg-blue-50'
              } transition-all duration-200 ease-in-out rounded-md mx-1`}
              onClick={() => handlePageChange(value)}
            >
              {label}
              {page === value && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait" custom={direction}>
        <MotionDiv
          key={page}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="overflow-hidden"
        >
          {renderContent(course)}
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
}