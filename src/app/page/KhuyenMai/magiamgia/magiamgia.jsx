// VoucherShop.jsx
import { useEffect, useState } from "react";
import {
    Flex,
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

function VoucherCard({ maso, giamgia, gia, trangthai, hinh, hansudung, onSave, isSaved }) {
    const bgColor = useColorModeValue("white", "gray.800");

    return (
        <>
            <Flex justify="center" align="center" bg={bgColor} py={5}>
                <MotionBox
                    maxW="800px"
                    w="100%"
                    position="relative"
                    className="voucher-container"
                    whileHover={{
                        opacity: 0.8,
                        transition: { duration: 0.3 },
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                >
                    <HStack
                        spacing={0}
                        align="stretch"
                        className="voucher-content"
                    >
                        {/* Left side */}
                        <Box className="voucher-left">
                            <Box className="image-wrapper">
                                <Image
                                    src={hinh}
                                    alt={hinh}
                                    className="circular-image"
                                />
                            </Box>
                        </Box>

                        {/* Divider */}
                        <div className="divider"></div>

                        {/* Right side */}
                        <Box className="voucher-right">
                            <Text className="discount-text text-3xl font-bold">
                                Giảm {giamgia}%
                            </Text>
                            <Text className="min-amount text-2xl">
                                <strong>Đơn Tối Thiểu</strong> ₫{gia}
                            </Text>
                            <Text className="expiry-date text-2xl">
                                <strong>Hạn Sử Dụng:</strong> {new Date(hansudung).toLocaleDateString()}
                            </Text>
                            <HStack justify="space-between" align="center">
                                <Text className="condition-text text-2xl">
                                    <strong>Điều Kiện:</strong> Đúng khóa học
                                </Text>
                                                                                          <Button
                                                                className={`save-button ${isSaved ? 'saved' : ''} font-bold`}
                                                                onClick={() => onSave(maso)}
                                                                isDisabled={isSaved}
                                                                bg="#ff6b6b"
                                                                color="white"
                                                                px={4} // Horizontal padding
                                                                py={2} // Vertical padding
                                                            >
                                                                <i className={`bi ${isSaved ? "bi-check-circle" : "bi-save"} text-2xl`} />
                                                                {isSaved ? "Đã Lưu" : "Lưu"}
                                                            </Button>
                            </HStack>
                        </Box>
                    </HStack>
                </MotionBox>
            </Flex>
            <style jsx global>{`
                .voucher-container {
                    background: white;
                    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
                    position: relative;
                    border-radius: 12px;
                }

                .voucher-content {
                    background: white;
                    position: relative;
                    padding: 20px;
                    border-radius: 12px;
                    word-wrap: break-word;
                    clip-path: polygon(
                        20px 0,
                        100% 0,
                        100% 100%,
                        20px 100%,
                        0 95%,
                        10px 90%,
                        0 85%,
                        10px 80%,
                        0 75%,
                        10px 70%,
                        0 65%,
                        10px 60%,
                        0 55%,
                        10px 50%,
                        0 45%,
                        10px 40%,
                        0 35%,
                        10px 30%,
                        0 25%,
                        10px 20%,
                        0 15%,
                        10px 10%,
                        0 5%,
                        10px 0
                    );
                }

                .voucher-content::before,
                .voucher-content::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 20px;
                    background-image: linear-gradient(
                        45deg, 
                        transparent 33.333%, 
                        white 33.333%, 
                        white 66.667%, 
                        transparent 66.667%
                    );
                    background-size: 20px 40px;
                    background-repeat: repeat-x;
                }

                .voucher-content::before {
                    top: -10px;
                    transform: rotate(180deg);
                }

                .voucher-content::after {
                    bottom: -10px;
                }

                .divider {
                    width: 1px;
                    background: repeating-linear-gradient(
                        to bottom,
                        #ccc 0px,
                        #ccc 5px,
                        transparent 5px,
                        transparent 10px
                    );
                    margin: 0 10px;
                    position: relative;
                }

                .divider::before,
                .divider::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: #f8f9fa;
                    border-radius: 50%;
                }

                .divider::before {
                    top: -10px;
                }

                .divider::after {
                    bottom: -10px;
                }

                .voucher-left {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15px;
                    width: 40%;
                }

                .image-wrapper {
                    width: 100px;
                    height: 100px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    padding: 5px;
                }

                .circular-image {
                    width: 90%;
                    height: 90%;
                    border-radius: 50%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .image-wrapper:hover .circular-image {
                    transform: scale(1.1);
                }

                .expiry-date {
                    color: #555;
                    font-size: 1.125rem;
                    margin-top: 5px;
                }

                .voucher-right {
                    margin-left: 10px;
                    word-wrap: break-word;
                }

                .voucher-container::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 20px;
                    background: rgba(0,0,0,0.05);
                    z-index: -1;
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
                }

                .discount-text {
                    font-size: 1.5rem;
                }

                .min-amount,
                .expiry-date,
                .condition-text {
                    font-size: 1.25rem;
                }

                .save-button i {
                    font-size: 1.5rem;
                }

                /* Adjusted Styles for Center Alignment */
                .container-fluid {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: #f0f0f0;
                }

                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
            `}</style>
        </>
    );
    }
    

    export default function VoucherShop() {
        const [savedVouchers, setSavedVouchers] = useState([]);
        const [KhuyenMai, setKhuyenMai] = useState([]);
    
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
    
        return (
            <>
                <div className="container-fluid py-5 position-relative"
                    style={{
                        background: 'white', // Changed to white
                        minHeight: '100vh'
                    }}
                >
                    <ToastContainer />
                    <motion.div
                        className="container position-relative"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="text-center mb-5">
                            <motion.div
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="display-4 fw-bold text-black" style={{
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                                }}>Ưu đãi hấp dẫn</h2>
                            </motion.div>
                            <motion.p
                                className="text-black mt-3 fs-5"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                            >
                                Số lượng có hạn, dành cho những bạn nhanh nhất
                            </motion.p>
                        </div>
    
                        <motion.div
                            className="row g-4"
                            initial="visible"
                            animate="visible"
                        >
                            {KhuyenMai.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="col-12 col-sm-6 col-md-4 col-lg-5"
                                    whileHover={{
                                        opacity: 0.8,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <VoucherCard
                                        maso={item.magiamgia.maso}
                                        giamgia={item.magiamgia.giamgia}
                                        gia={item.khoahoc.gia}
                                        hinh={item.khoahoc.hinh}
                                        hansudung={item.magiamgia.ngayketthuc}
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
                    .gradient-text {
                        background: linear-gradient(90deg, #FF6B6B, #FF8E53, #FF6B6B);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: bold;
                        letter-spacing: 1px;
                    }
                `}</style>
            </>
        );
    }