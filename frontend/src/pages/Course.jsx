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
      <EmbedPDF
        companyIdentifier="react-viewer"
        mode="inline"
        style={{ width: 1100, height: 800 }}
        documentURL={singleCourse?.data?.englishLink}
      />
    </Container>
  );
}
