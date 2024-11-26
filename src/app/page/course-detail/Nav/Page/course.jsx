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
      <div className="container mt-4 rounded-lg ">
        <div className="py-4 shadow-lg border  relative border-gray-200 rounded-xl bg-gradient-to-r from-blue-50 to-white ">
          <h1 className="text-3xl font-medium mb-3 ">
            <strong className="text-black">Nội dung khóa học</strong>
          </h1>
          <p className="text-3xl text-gray-600">
            <span className="badge bg-blue-500 text-white font-medium mr-2 pulse-badge inline-block">
              {course.baihocs.length} Bài giảng
            </span>
            <span className="badge bg-[#ff6b6b] text-white font-medium pulse-badge inline-block">
              {totalHours} giờ {totalMinutes} phút
            </span>
          </p>
          <div className="flex flex-wrap absolute right-0 bottom-16 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>

            <span className=" font-medium text-2xl px-2">Thông tin bài học</span>
          </div>

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
                            <span className="text-2xl">{index + 1}</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-2xl font-bold">{baihoc.ten}</p>
                            <p className="text-2xl text-gray-600 mt-1 flex items-center">
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