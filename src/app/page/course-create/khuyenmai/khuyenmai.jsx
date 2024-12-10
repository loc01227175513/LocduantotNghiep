
"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Button,
  extendTheme,
  ChakraProvider,
  Input,
  Select,
  VStack,
  HStack,
  Divider,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  Circle,
  Icon
} from '@chakra-ui/react';
import {
  BiCheck,
  BiCalendar,
  BiGift,
  BiTime,
  BiUser,
  BiTrendingUp
} from 'react-icons/bi';
import { motion } from 'framer-motion';
import { TatCaKhuyenMai, AddKhuyenMaiKhoaHoc } from "../../../../service/khuyenmai/khuyenmai";
import { ToastContainer, toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
const MotionBox = motion(Box);

const theme = extendTheme({
  colors: {
    primary: '#87CEEB', // Sky Blue
  },
});

const initializeLocalStorage = () => {
  const existingData = localStorage.getItem('data');
  if (!existingData) {
    const defaultData = {
      giangvien: {
        id: 1,
        name: 'Default Giangvien',
      },
    };
    localStorage.setItem('data', JSON.stringify(defaultData));
  }

  const existingDataForm = localStorage.getItem('dataForm');
  if (!existingDataForm) {
    const defaultDataForm = {
      id_magiamgia: null,
    };
    localStorage.setItem('dataForm', JSON.stringify(defaultDataForm));
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4
    }
  },
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  tap: {
    scale: 0.95
  }
};

const iconAnimations = {
  gift: {
    initial: { rotate: -15, y: 0 },
    animate: {
      rotate: [15, -15],
      y: [-2, 2],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  user: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  time: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
};

const CouponForm = () => {
  const [data, setData] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountFilter, setDiscountFilter] = useState('');
  const [userCountFilter, setUserCountFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [bestPromotionFilter, setBestPromotionFilter] = useState(false);

  useEffect(() => {
    initializeLocalStorage();
    const fetchData = async () => {
      try {
        const response = await TatCaKhuyenMai();
        setData(response);
      } catch (error) {
        toast.error('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (couponId) => {
    setSelectedCoupon(prev => (prev === couponId ? null : couponId));
  };

  const handlePublicClick = async () => {
    if (selectedCoupon) {
      try {
        const dataForm = JSON.parse(localStorage.getItem('dataForm')) || {};
        dataForm.id_magiamgia = selectedCoupon;
        localStorage.setItem('dataForm', JSON.stringify(dataForm));

        await AddKhuyenMaiKhoaHoc(selectedCoupon);
        toast.success('Coupon ID sent successfully!');
      } catch (error) {
        toast.error('Error sending coupon ID.');
      }
    } else {
      toast.info('No coupon selected.');
    }
  };

  const filteredData = data.filter(coupon => {
    const isBestPromotion = bestPromotionFilter ? coupon.giamgia >= 50 : true;
    return (
      (discountFilter === '' || coupon.giamgia >= discountFilter) &&
      (userCountFilter === '' || coupon.luotsudung >= userCountFilter) &&
      (dateFilter === '' ||
        (new Date(coupon.ngaybatdau) <= new Date(dateFilter) &&
          new Date(coupon.ngayketthuc) >= new Date(dateFilter))) &&
      isBestPromotion
    );
  });

  return (
    <ChakraProvider theme={theme}>
      <Container
        maxW="full"
        minH="100vh"
        py={12}
        bg="gray.50"
        position="relative"
        overflowY="auto"
       
      >
        <Heading
          as="h2"
        
          mb={8}
          color="gray.700"
          textAlign="center"
         style={{fontSize: "18px", color: "gray.700", textAlign: "center"}}
       
        >
          Mã Giảm Giá Khóa Học
        </Heading>
        <Box mb={8} px={6} bg="gray.100" p={6} rounded="xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            <Select
              className="text-[14px]"
              placeholder="Lọc theo % giảm giá"
              variant="filled"
              bg="white"
              _hover={{ bg: "gray.50" }}
              style={{
                padding: "5px 0 ",
                color: "black",
                fontSize: "14px",
                height: "40px",
                paddingLeft: "10px",
              }}
            >
              <option value="">All</option>
              <option value="10">10% or more</option>
              <option value="20">20% or more</option>
              <option value="30">30% or more</option>
            </Select>
            <Select
              placeholder="Filter by user count"
              value={userCountFilter}
              onChange={(e) => setUserCountFilter(e.target.value)}
              mb={4}
              bg="white"
              _hover={{ bg: "gray.50" }}
              style={{
                padding: "5px 0 ",
                color: "black",
                fontSize: "14px",
                height: "40px",
                paddingLeft: "10px",
              }}
            >
              <option value="">All</option>
              <option value="100">100 or more</option>
              <option value="200">200 or more</option>
              <option value="300">300 or more</option>
            </Select>
            <Input
              type="date"
              placeholder="Filter by date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              mb={4}
              bg="white"
              _hover={{ bg: "gray.50" }}
              style={{
                padding: "5px 0 ",
                color: "black",
                fontSize: "14px",
                height: "40px",
                padding: "0 10px",
              }}
            />
            <Checkbox
              isChecked={bestPromotionFilter}
              onChange={(e) => setBestPromotionFilter(e.target.checked)}
              mb={4}
              style={{
                padding: "5px 0 ",
                color: "black",
                fontSize: "16px",
                height: "40px",
                paddingLeft: "10px",


              }}
            >
              <span className="text-[14px]"> Chỉ hiển thị khuyến mãi tốt nhất (&gt;= 50%)</span>
            </Checkbox>
          </SimpleGrid>
        </Box>

        <AnimatePresence>
          <SimpleGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={8}
            px={6}
            
          >
            {filteredData.map((coupon) => (
              <MotionBox
                key={coupon.id}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                bg="white"
                boxShadow="md"
                border="1px solid"
                borderColor="pink.500"
                rounded="2xl"
                p={6}
                position="relative"
                onClick={() => handleCardClick(coupon.id)}
                cursor="pointer"
      

                transition={{
                  layout: { duration: 0.3 },
                  opacity: { duration: 0.2 }
                }}
              >
                {selectedCoupon === coupon.id && (
                  <Circle
                    as={motion.div}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }
                    }}
                    size="44px"
                    bg="primary"
                    color="white"
                    position="absolute"
                    top={-3}
                    right={-3}
                    shadow="md"
                  >
                    <Icon
                      as={BiCheck}
                      w={7}
                      h={7}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  </Circle>
                )}

                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <HStack>
                      <Icon
                        as={motion.div}
                        initial={iconAnimations.gift.initial}
                        animate={iconAnimations.gift.animate}
                        whileHover={{ scale: 1.2 }}
                        color="primary"
                      >
                        <BiGift size="24px" />
                      </Icon>
                      <Badge
                        colorScheme={coupon.giamgia >= 50 ? "purple" : "primary"}
                        fontSize="2xl"
                        px={3}
                        py={1}
                        rounded="lg"
                      >
                        -{coupon.giamgia}%
                      </Badge>
                    </HStack>
                    <Text fontSize="2xl" color="gray.500">{coupon.maso}</Text>
                  </HStack>

                  <Divider />

                  <VStack spacing={3} align="stretch">
                    <Stat>
                      <HStack spacing={4} align="center">
                        <HStack>
                          <Icon
                            as={motion.div}
                            initial={iconAnimations.user.initial}
                            animate={iconAnimations.user.animate}
                            whileHover={{ scale: 1.3 }}
                            color="primary"
                          >
                            <BiUser size="20px" />
                          </Icon>
                          <Text>Lượt sử dụng:</Text>
                        </HStack>

                        <HStack>
                          <Icon
                            as={motion.div}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            color="primary"
                          >
                            <BiTrendingUp size="16px" />
                          </Icon>
                          <Text color="pink.700"> {coupon.luotsudung} / {coupon.sudunghientai}</Text>
                        </HStack>
                      </HStack>
                    </Stat>

                    <HStack spacing={2}>
                      <Icon
                        as={motion.div}
                        initial={iconAnimations.time.initial}
                        animate={iconAnimations.time.animate}
                        whileHover={{ scale: 1.2, rotate: 0 }}
                        color="primary"
                      >
                        <BiTime size="20px" />
                      </Icon>
                      <Text fontSize="xl">{coupon.ngaybatdau} - {coupon.ngayketthuc}</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </AnimatePresence>

        <Box textAlign="center" mt={8}>
          <div className="flex justify-end">
            <Button
              as={motion.button}
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.2
                }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              bg="pink.500"
              color="white"
              size="lg"
              onClick={handlePublicClick}
              width={100}
              px={8}
              shadow="md"
              style={{
               fontSize: "14px",
               fontWeight: "normal",
              }}

            >
              Xuất bản
              <i className="fa-light fa-arrow-right ml-2 " style={{fontSize: "12px"}} />
            </Button>
          </div>
        </Box>
      </Container>
      <ToastContainer />
    </ChakraProvider>
  );
};

export default CouponForm;