import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import { Flex, Box, Text, Container } from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";
import { MdVideoFile } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";

export default function Category({
  allCourses,
  setAllCourses,
  setSingleCourse
}) {
  const params = useParams();

  const categoryCourses = allCourses?.data?.filter(
    (course) => course.category === params.category
  );

  useEffect(() => {
    setSingleCourse({});
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="8"
      mb="50px"
      mt="50px"
      w="80%"
    >
      {categoryCourses?.map((i) => (
        <NavLink to={`/categories/${i.category}/${i._id}`}>
          <Flex
            alignItems="center"
            borderRadius="6px"
            borderWidth="1px"
            justifyContent="space-between"
            pb="4"
            pl="4"
            pr="5"
            pt="4"
            key={i._id}
          >
            <Flex alignItems="center" gap="3">
              <Flex justifyContent="center" w="9">
                {i.contentType === "PDF" ? (
                  <BiSolidFilePdf size="40" />
                ) : i.contentType === "Video" ? (
                  <MdVideoFile size="40" />
                ) : i.contentType === "Link" ? (
                  <HiExternalLink size="35" />
                ) : (
                  ""
                )}
              </Flex>
              <Flex justifyContent="center" flexDirection="column" pr="3">
                <Text fontWeight="semibold" lineHeight="tight">
                  {i.englishTitle}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </NavLink>
      ))}
    </Container>
  );
}
