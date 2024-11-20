import React from "react";
import { Spinner, Box, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react";
import { Circle, HStack, Badge, Icon } from '@chakra-ui/react'
import { ChevronDownIcon, TimeIcon } from "@chakra-ui/icons";
import { FaVideo } from 'react-icons/fa'

// Utility function to parse time and convert it to a readable format
const parseDuration = (duration) => {
  const parts = duration.split(":");
  if (parts.length === 3) {
    // HH:mm:ss
    return {
      hours: parseInt(parts[0]),
      minutes: parseInt(parts[1]),
      seconds: parseInt(parts[2]),
    };
  } else if (parts.length === 2) {
    // mm:ss
    return {
      hours: 0,
      minutes: parseInt(parts[0]),
      seconds: parseInt(parts[1]),
    };
  }
  return { hours: 0, minutes: 0, seconds: 0 };
};

// Function to calculate total duration
const calculateTotalDuration = (videos) => {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  videos.forEach((video) => {
    const duration = parseDuration(video.thoiluong);
    totalHours += duration.hours;
    totalMinutes += duration.minutes;
    totalSeconds += duration.seconds;
  });

  // Convert seconds to minutes
  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds %= 60;

  // Convert minutes to hours
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes %= 60;

  return { totalHours, totalMinutes };
};
const styles = `
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes softPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }

  .animated-gradient-text {
    background: linear-gradient(270deg, #3182ce, #319795, #3182ce);
    background-size: 200% auto;
    animation: gradientText 3s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .pulse-badge {
    animation: softPulse 2s ease-in-out infinite;
  }
      @keyframes rotateIcon {
    from { transform: rotate(0deg); }
    to { transform: rotate(180deg); }
  }

  .chevron-icon {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .chevron-icon.expanded {
    transform: rotate(180deg);
  }
`;

export default function Course({ course, formattedTotalTime }) {
  const { totalHours, totalMinutes } = calculateTotalDuration(course.baihocs.flatMap(baihoc => baihoc.video));

  return (
    <>
      <style>{styles}</style>
      <div className="container mt-4 max-w-3xl mx-auto">
        <div className="p-6 shadow-lg border border-gray-200 rounded-xl bg-gradient-to-r from-blue-50 to-white hover:scale-105 transition-all duration-300">
          <h1 className="text-3xl font-extrabold mb-3 animated-gradient-text">
            Nội dung khóa học
          </h1>
          <p className="text-lg text-gray-600">
            <span className="badge bg-blue-500 text-white font-medium mr-2 pulse-badge inline-block">
              {course.baihocs.length} Bài giảng
            </span>
            <span className="badge bg-teal-500 text-white font-medium pulse-badge inline-block">
              {totalHours} giờ {totalMinutes} phút
            </span>
          </p>
        </div>

        <div className="mt-6">
          <Accordion allowToggle>
            {course.baihocs.map((baihoc, index) => (
              <AccordionItem
                key={index}
                border="none"
                mb={4}
              >
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      className="w-full text-left bg-white shadow-md rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 p-4"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-500 rounded-full">
                            <span className="text-sm">{index + 1}</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-lg font-bold">{baihoc.ten}</p>
                            <p className="text-sm text-gray-600 mt-1 flex items-center">
                              <FaVideo className="mr-2" />
                              {baihoc.video.length} Bài giảng • {calculateTotalDuration(baihoc.video).totalHours} giờ {calculateTotalDuration(baihoc.video).totalMinutes} phút
                            </p>
                          </div>
                        </div>
                        <ChevronDownIcon
                          className={`text-2xl chevron-icon ${isExpanded ? 'expanded' : ''}`}
                          transition="transform 0.3s ease"
                        />
                      </div>
                    </AccordionButton>

                    <AccordionPanel pb={4}>
                      <div className="flex flex-col space-y-3">
                        {baihoc.video.map((item, videoIndex) => (
                          <div
                            key={videoIndex}
                            className="p-4 rounded-md bg-white shadow-sm flex justify-between items-center hover:bg-blue-50 hover:translate-x-2 transition-all duration-200"
                          >
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-500 rounded-full">
                                <span className="text-xs">{videoIndex + 1}</span>
                              </div>
                              <p className="ml-4 font-medium">{item.ten}</p>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <TimeIcon className="mr-2" />
                              <p>{parseDuration(item.thoiluong).hours} giờ {parseDuration(item.thoiluong).minutes} phút</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}