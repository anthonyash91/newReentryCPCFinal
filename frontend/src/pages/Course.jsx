import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Box, Text, Container } from "@chakra-ui/react";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import ReactPlayer from "react-player";

export default function Course({ singleCourse, getCourse }) {
  const params = useParams();

  useEffect(() => {
    getCourse(params.courseId);
  }, []);

  return (
    <Container display="flex" justifyContent="center">
      {singleCourse?.data?.contentType === "PDF" ? (
        <iframe src={singleCourse?.data?.englishLink}></iframe>
      ) : singleCourse?.data?.contentType === "Video" ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "0",
            paddingTop: "56.2500%",
            paddingBottom: "0",
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
            marginTop: "1.6em",
            marginBottom: "0.9em",
            overflow: "hidden",
            borderRadius: "8px",
            willChange: "transform"
          }}
        >
          <iframe
            loading="lazy"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              border: "none",
              padding: "0",
              margin: "0"
            }}
            allowFullScreen
            src={`${singleCourse?.data?.englishLink}?embed`}
          ></iframe>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
