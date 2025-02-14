import { NavLink } from "react-router-dom";

import {
  Grid,
  Box,
  Flex,
  Image,
  Divider,
  Center,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function Home({ allCategories }) {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4
  };

  return (
    <Wrap justify="center" m="30px">
      {allCategories?.data?.map((i) => (
        <NavLink to={`/categories/${i.englishTitle}`}>
          <Box
            maxW="xs"
            m="20px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={i.categoryImage} alt={i.englishTitle} p="6px" />
            <Divider />
            <Flex
              justifyContent="center"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              p="6"
              textAlign="center"
            >
              {i.englishTitle}
            </Flex>
          </Box>
        </NavLink>
      ))}
    </Wrap>
  );
}
