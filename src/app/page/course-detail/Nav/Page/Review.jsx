import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const MotionDiv = motion.div;

const styles = `
  @keyframes shine {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }

  .star-rating {
    transition: transform 0.2s ease;
  }
  
  .star-rating:hover {
    transform: scale(1.2);
  }

  .progress-bar {
    transition: width 1s ease-in-out;
    position: relative;
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%);
    animation: shine 2s infinite;
  }

  .review-card {
    transition: all 0.3s ease;
  }

  .review-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
  }

  .reaction-button {
    transition: all 0.2s ease;
  }

  .reaction-button:hover {
    transform: scale(1.3);
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StarRating = ({ rating }) => (
  <motion.div
    className="flex"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ staggerChildren: 0.1 }}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.div
        key={star}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {star <= rating ? (
          <FaStar className="text-yellow-400 w-5 h-5" />
        ) : (
          <FaRegStar className="text-gray-300 w-5 h-5" />
        )}
      </motion.div>
    ))}
  </motion.div>
);

const ReactionButton = ({ active, icon: Icon, label, onClick }) => (
  <Tooltip content={label}>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`reaction-button flex items-center gap-2 px-3 py-2 rounded-full
        ${active ? "bg-blue-50" : "bg-gray-50"}
        transition-colors duration-200`}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: active ? [0, 20, -20, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon
          className={`w-5 h-5 ${active ? "text-blue-500" : "text-gray-500"}`}
        />
      </motion.div>
      <span className={`text-sm ${active ? "text-blue-500" : "text-gray-500"}`}>
        {label}
      </span>
    </motion.button>
  </Tooltip>
);

const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex justify-center p-4"
  >
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
        scale: { duration: 1, repeat: Infinity },
      }}
      className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
    />
  </motion.div>
);

export default function Review({ course }) {
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reactions, setReactions] = useState({});

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  console.log(course.danhgia);

  // Filter and sort reviews
  const filteredReviews = course.danhgia
    .filter(
      (review) =>
        filterRating === 0 || parseInt(review.rating, 10) === filterRating
    )
    .sort((a, b) => {
      if (sortBy === "highest")
        return parseInt(b.rating, 10) - parseInt(a.rating, 10);
      if (sortBy === "lowest")
        return parseInt(a.rating, 10) - parseInt(b.rating, 10);
      return new Date(b.date) - new Date(a.date);
    });

  // Handle infinite scroll
  useEffect(() => {
    if (inView && page * 5 < filteredReviews.length) {
      // Prevent loading beyond available reviews
      setLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoading(false);
      }, 1000);
    }
  }, [inView, page, filteredReviews.length]);

  // Handle reactions with optimistic updates
  const handleReaction = (reviewId, type) => {
    setReactions((prev) => ({
      ...prev,
      [reviewId]: {
        ...prev[reviewId],
        [type]: !prev[reviewId]?.[type],
      },
    }));
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const filledStars = Math.floor(parseInt(rating, 10));
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" />
        )
      );
    }
    return stars;
  };

  return (
    <>
      <style>{styles}</style>
      {/* Add filter/sort controls */}
      <div className="flex justify-between mb-4">
        <motion.div className="flex gap-2">
          {[5, 4, 3, 2, 1, 0].map((rating) => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full shadow-sm transition-all duration-200
                ${
                  filterRating === rating
                    ? "bg-blue-500 text-white shadow-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 text-xl"
                }`}
              onClick={() => setFilterRating(rating)}
            >
              {rating === 0 ? (
                <motion.span className="text-xl">All</motion.span>
              ) : (
                <motion.div className="flex items-center gap-1">
                  {rating}
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaStar className="text-yellow-400" />
                  </motion.div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="flex gap-2">
          {["mới nhất", "cao nhất", "thấp nhất"].map((sort) => (
            <motion.button
              key={sort}
              whileTap={{ scale: 0.95 }}
              className={`sort-button px-3 py-1 rounded ${
                sortBy === sort ? "active" : "bg-gray-100"
              } text-xl`}
              onClick={() => setSortBy(sort)}
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Previous rating summary section remains... */}

      {/* Enhanced reviews list */}
      <AnimatePresence>
        <motion.div
          className="grid gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredReviews.slice(0, page * 5).map((review) => (
            <MotionDiv
              key={review.id} // Use unique review.id as key
              className="review-card p-6 bg-white rounded-xl border border-gray-100"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="flex items-start space-x-4 mb-4">
                <Image
                  width={48}
                  height={48}
                  src={review.userImage || "/default-user.png"}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <p className="font-bold text-gray-900">{review.user}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-gray-500 text-lg">1 tuần trước</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {review.comment}
              </p>

              <div className="flex space-x-4">
                <span className="text-2xl">
                  <ReactionButton
                    active={reactions[review.id]?.helpful}
                    icon={FaThumbsUp}
                    label="Hữu ích"
                    onClick={() => handleReaction(review.id, "helpful")}
                  />
                </span>
                <span className="text-2xl">
                  <ReactionButton
                    active={reactions[review.id]?.favorite}
                    icon={FaHeart}
                    label="Yêu thích"
                    onClick={() => handleReaction(review.id, "favorite")}
                  />
                </span>
              </div>
            </MotionDiv>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Loading indicator */}
      {loading && <LoadingSpinner />}

      {/* Intersection observer reference */}
      <div ref={ref} />
    </>
  );
}
