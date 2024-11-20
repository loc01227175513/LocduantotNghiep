// VoucherShop.jsx
import { useEffect, useState } from "react";
import {
    Box,
    Image,
    Badge,
    Text,
    Button,
    HStack,
    useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TatCaKhuyenMaiKhoaHoc, NguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';


const MotionBox = motion(Box);

function VoucherCard({ maso, giamgia, gia, trangthai, hinh, onSave, isSaved }) {
    const bgColor = useColorModeValue("white", "gray.800");
    const brandBg = useColorModeValue("#fff7e6", "gray.700");

    return (<>
        <MotionBox
            maxW="300px"
            w="100%"
            borderRadius="xl"
            overflow="hidden"
            whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                background: [
                    "linear-gradient(135deg, #43cea2, #185a9d)",
                    "linear-gradient(135deg, #ff6e7f, #bfe9ff)",
                    "linear-gradient(135deg, #43cea2, #185a9d)"
                ]
            }}
            transition={{
                duration: 0.6,
                background: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            p="3px"
        >
            <HStack
                bg="rgba(255,255,255,0.9)"
                spacing={0}
                align="stretch"
                borderRadius="lg"
                style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)"
                }}
            >
                <Box
                    p={4}
                    bg="transparent"
                    w={{ base: "100%", sm: "40%" }}
                    minH={{ base: "80px", sm: "auto" }}
                    borderRightWidth={{ base: 0, sm: "1px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    overflow="hidden"
                    className="image-container"
                >
                    <Image
                        src={hinh}
                        alt={hinh}
                        maxH="80px"
                        objectFit="contain"
                        className="hover-image"
                    />
                </Box>
                <Box p={4} w={{ base: "100%", sm: "60%" }} className="content-box">
                    {trangthai === "Đã Duyệt" && (
                        <Badge
                            colorScheme="red"
                            mb={2}
                            fontSize="sm"
                            className="floating-badge"
                        >
                            {maso}
                        </Badge>
                    )}
                    <Text
                        fontSize={{ base: "20px", md: "24px" }}
                        fontWeight="bold"
                        mb={2}
                        className="gradient-text"
                    >
                        Giảm {giamgia}%
                    </Text>
                    <Text
                        color="gray.600"
                        fontSize="sm"
                        mb={2}
                        className="min-amount"
                    >
                        Đơn Tối Thiểu ₫{gia}
                    </Text>
                    <HStack justify="space-between" align="center">
                        <Text
                            color="blue.500"
                            fontSize="sm"
                            className="condition-text"
                        >
                            Điều Kiện: Đúng khóa học
                        </Text>
                        <Button
                            size="sm"
                            className={`save-button ${isSaved ? 'saved' : ''}`}
                            onClick={() => onSave(maso)}
                            isDisabled={isSaved}
                        >
                            <i className={`bi ${isSaved ? "bi-check-circle" : "bi-save"}`} />
                            {isSaved ? "Đã Lưu" : "Lưu"}
                        </Button>
                    </HStack>
                </Box>
            </HStack>
        </MotionBox>

        <style jsx global>{`
        
        @keyframes highlight-badge {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 0, 0, 0.4);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 0, 0, 0.4);
  }
}

.floating-badge {
  animation: highlight-badge 2s ease-in-out infinite;
}
            .image-container::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(
                    45deg,
                    rgba(255,255,255,0) 0%,
                    rgba(255,255,255,0.8) 50%,
                    rgba(255,255,255,0) 100%
                );
                transform: rotate(45deg);
                animation: shine 3s infinite;
            }

            .hover-image {
                transition: transform 0.3s ease;
            }

            .image-container:hover .hover-image {
                transform: scale(1.1);
            }

            .gradient-text {
                background: linear-gradient(45deg, #FF6B6B, #FF8E53);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: textShine 3s ease-in-out infinite;
            }

            .floating-badge {
                animation: float 3s ease-in-out infinite;
            }

            .save-button {
                background: linear-gradient(45deg, #FF6B6B, #FF8E53);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                transition: all 0.3s ease;
            }

            .save-button:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255,107,107,0.4);
            }

            .save-button.saved {
                background: linear-gradient(45deg, #808080, #A9A9A9);
            }

            @keyframes textShine {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            @keyframes shine {
                0% { transform: translateX(-100%) rotate(45deg); }
                100% { transform: translateX(100%) rotate(45deg); }
            }
        `}</style>
    </>);
}

export default function VoucherShop() {
    const [savedVouchers, setSavedVouchers] = useState([]);
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const [KhuyenMai, setKhuyenMai] = useState([]);
    const userId = 1; // Replace with actual user ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TatCaKhuyenMaiKhoaHoc();
                setKhuyenMai(response);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to fetch vouchers.");
            }
        };
        fetchData();
    }, []);
    console.log(KhuyenMai);


    const handleSave = async (maso) => {
        try {
            const selectedCoupon = KhuyenMai.find(item => item.magiamgia.maso === maso);
            if (selectedCoupon) {
                await NguoiDungMaGiamGia({
                    id_magiamgia: selectedCoupon.magiamgia.id
                });
                setSavedVouchers((prev) => [...prev, maso]);
                toast.success("Voucher saved successfully!");
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error("Failed to save voucher.");
        }
    };

    return (<>   <div className="container-fluid py-5 position-relative"
        style={{
            background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
            backgroundSize: '400% 400%',
            animation: 'gradientBG 15s ease infinite'
        }}
    >
        <ToastContainer />
        <motion.div
            className="container position-relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="text-center mb-5">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    <h2 className="display-4 fw-bold text-white" style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>Ưu đãi hấp dẫn</h2>
                </motion.div>
                <motion.p
                    className="text-white mt-3 fs-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Số lượng có hạn, dành cho những bạn nhanh nhất
                </motion.p>
            </div>

            <motion.div
                className="row g-4"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3
                        }
                    }
                }}
                initial="hidden"
                animate="show"
            >
                {KhuyenMai.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    bounce: 0.4
                                }
                            }
                        }}
                        whileHover={{
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 300 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <VoucherCard
                            maso={item.magiamgia.maso}
                            giamgia={(item.khoahoc.gia > item.magiamgia.giamgia ? (item.magiamgia.giamgia / item.khoahoc.gia) : 0) || (item.khoahoc.giamgia * 100)}
                            gia={item.khoahoc.gia}
                            hinh={item.khoahoc.hinh}
                            trangthai={item.magiamgia.trangthai}
                            onSave={handleSave}
                            isSaved={savedVouchers.includes(item.magiamgia.maso)}
                            disabled={item.magiamgia.trangthai === 'Đã sử dụng'}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </div>

        <style jsx global>{`
        @keyframes textGradientSlide {
  0% {
    background-position: 0% 50%;
    text-shadow: 2px 2px 4px rgba(255, 107, 107, 0.2);
    transform: perspective(500px) rotateX(0deg);
  }
  
  50% {
    background-position: 100% 50%;
    text-shadow: 4px 4px 8px rgba(255, 142, 83, 0.4);
    transform: perspective(500px) rotateX(10deg);
  }
  
  100% {
    background-position: 0% 50%;
    text-shadow: 2px 2px 4px rgba(255, 107, 107, 0.2);
    transform: perspective(500px) rotateX(0deg);
  }
}

.gradient-text {
  background: linear-gradient(90deg, #FF6B6B, #FF8E53, #FF6B6B);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textGradientSlide 3s ease-in-out infinite;
  font-weight: bold;
  letter-spacing: 1px;
}
            @keyframes gradientBG {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `}</style>
    </>

    );
}