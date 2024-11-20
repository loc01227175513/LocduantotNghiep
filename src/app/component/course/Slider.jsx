"use client";
import { Flex, Box, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const images = [
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126647/13_jmgxo8.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126637/12_tm0xts.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126629/11_t1fwzm.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126621/10_tkgxsm.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126611/09_i4yvcq.svg",
  "https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126601/08_v0jlvy.svg",
];

export default function HorizontalScrollImages() {
  return (
    <Flex
      justify="center"
      align="center"
      minH="10vh"
      overflow="hidden"
      w="600px"
      mx="auto"
      position="relative"
      bg="gray.50"
      borderRadius="xl"
      py={8}
      _before={{
        content: '""',
        position: 'absolute',
        left: 0,
        width: '100px',
        height: '100%',
        background: 'linear-gradient(to right, rgba(247, 250, 252, 1), transparent)',
        zIndex: 2,
      }}
      _after={{
        content: '""',
        position: 'absolute',
        right: 0,
        width: '100px',
        height: '100%',
        background: 'linear-gradient(to left, rgba(247, 250, 252, 1), transparent)',
        zIndex: 2,
      }}
    >
      <Flex
        animation={`${scroll} 30s linear infinite`}
        minW="200%"
        align="center"
        _hover={{
          animationPlayState: 'paused'
        }}
      >
        {[...images, ...images].map((src, index) => (
          <Box
            key={index}
            mx={4}
            boxShadow="lg"
            borderRadius="xl"
            p={3}
            bg="white"
            transition="all 0.3s ease"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: '2xl',
            }}
          >
            <Image
              src={src}
              alt={`icon-${index}`}
              boxSize="8rem"
              border="1px"
              borderColor="gray.100"
              borderRadius="lg"
              p={2}
              transition="all 0.3s ease"
              _hover={{
                borderColor: 'blue.200',
              }}
            />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}