import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Text, Container } from "@chakra-ui/react";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

export default function Course({ singleCourse, getCourse }) {
  const params = useParams();

  useEffect(() => {
    getCourse(params.courseId);
  }, []);

  return (
    <Container display="flex" justifyContent="center">
      <div>
        <div
          style={{
            paddingTop: "56.25%",
            position: "relative",
            backgroundColor: "yellow",
            width: "100%",
            height: "100%"
          }}
        >
          <iframe src={singleCourse?.data?.englishLink}></iframe>
        </div>
      </div>
    </Container>
  );
}
