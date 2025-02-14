import { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Box,
  Input,
  InputGroup,
  Select,
  Button,
  IconButton,
  ButtonGroup,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Center,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Divider,
  useToast
} from "@chakra-ui/react";
import {
  RiUploadCloud2Fill,
  RiEditFill,
  RiDeleteBin6Fill
} from "react-icons/ri";
import { HiChevronDown, HiExternalLink } from "react-icons/hi";
import { GrFormView, GrHide } from "react-icons/gr";
import { MdLanguage, MdVideoFile } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";

import { UploadButton } from "@bytescale/upload-widget-react";

export default function Admin({
  allCourses,
  getCourses,
  singleCourse,
  getCourse
}) {
  const toast = useToast();

  const {
    isOpen: isNewCourseOpen,
    onOpen: onNewCourseOpen,
    onClose: onNewCourseClose
  } = useDisclosure();

  const {
    isOpen: isNewCategoryOpen,
    onOpen: onNewCategoryOpen,
    onClose: onNewCategoryClose
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();

  const [openEditModal, setOpenEditModal] = useState("");

  const [showSpanishCourse, setShowSpanishCourse] = useState(false);

  const [newCourse, setNewCourse] = useState({
    englishTitle: "",
    spanishTitle: "",
    englishLink: "",
    spanishLink: "",
    category: "",
    contentType: "",
    active: true
  });

  const clearCourseForm = () => {
    setShowSpanishCourse(!showSpanishCourse);
    setNewCourse({
      englishTitle: "",
      spanishTitle: "",
      englishLink: "",
      spanishLink: "",
      category: "",
      contentType: "",
      active: true
    });
  };

  const createCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(newCourse),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        toast({
          title: `${newCourse.englishTitle} not created.`,
          status: "error"
        });
      } else {
        getCourses();
        toast({
          title: `${newCourse.englishTitle} created.`,
          status: "success"
        });

        clearCourseForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [editCourse, setEditCourse] = useState({
    englishTitle: "",
    spanishTitle: "",
    englishLink: "",
    spanishLink: "",
    category: "",
    contentType: "",
    active: true,
    id: ""
  });

  const [showSpanishCourseEdit, setShowSpanishCourseEdit] = useState(null);

  const updateCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/courses/${editCourse.id}`, {
        method: "PUT",
        body: JSON.stringify(editCourse),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        toast({
          title: `"${editCourse.englishTitle}" not updated.`,
          status: "error"
        });
      } else {
        toast({
          title: `"${editCourse.englishTitle}" updated.`,
          status: "success"
        });
        getCourses();
      }
    } catch (error) {}
  };

  const deleteCourse = async (id, name) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast({
          title: `${name} deleted.`,
          status: "success"
        });
        getCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [filterContentType, setFilterContentType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filterCourses = allCourses?.data?.filter((course) =>
    filterContentType && filterCategory
      ? filterContentType === filterContentType &&
        filterCategory === filterCategory
        ? course.category === filterCategory &&
          course.contentType === filterContentType
        : ""
      : filterContentType && !filterCategory
      ? course.contentType === filterContentType
      : !filterContentType && filterCategory
      ? course.category === filterCategory
      : ""
  );

  const [showSpanishCategory, setShowSpanishCategory] = useState(false);

  const [newCategory, setNewCategory] = useState({
    englishTitle: "",
    spanishTitle: "",
    categoryImage: ""
  });

  const [allCategories, setAllCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const categoriesData = await res.json();

      if (res.ok) {
        setAllCategories(categoriesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    apiKey: "public_223k24FBYTp3msVUE8shtNXQk57H", // This is your API key.
    maxFileCount: 1,
    showFinishButton: false,
    editor: {
      images: {
        crop: false,
        preview: false
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (filterContentType === "All") {
      setFilterContentType("");
    }

    if (filterCategory === "All") {
      setFilterCategory("");
    }
  }, [filterContentType, filterCategory]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="8"
      minWidth="60%"
      p="10"
    >
      <Flex gap="3">
        <Button flex="1" colorScheme="blue" onClick={onNewCourseOpen}>
          New Course
        </Button>

        <Button flex="1" colorScheme="blue" onClick={onNewCategoryOpen}>
          New Category
        </Button>
      </Flex>

      <Flex justifyContent="center">
        <Heading as="h4" size="md">
          {allCourses?.data?.length &&
            !filterContentType &&
            !filterCategory &&
            `${allCourses?.data?.length} courses available.`}

          {filterContentType && !filterCategory
            ? `${filterCourses?.length} ${filterContentType}${
                filterCourses?.length === 0 || filterCourses?.length > 1
                  ? "s"
                  : ""
              } available.`
            : !filterContentType && filterCategory
            ? `${filterCourses?.length} course${
                filterCourses?.length === 0 || filterCourses?.length > 1
                  ? "s"
                  : ""
              } available in "${filterCategory}".`
            : filterContentType && filterCategory
            ? `${filterCourses?.length} ${filterContentType}${
                filterCourses?.length === 0 || filterCourses?.length > 1
                  ? "s"
                  : ""
              } available in ${filterCategory}.`
            : ""}
        </Heading>
      </Flex>

      <Flex gap="3">
        <Select
          onChange={(e) => {
            setFilterContentType(e.target.value);
          }}
        >
          <option hidden>Filter Courses by Content Type</option>
          <option>All</option>
          <option>Video</option>
          <option>PDF</option>
          <option>Link</option>
        </Select>

        <Select
          onChange={(e) => {
            setFilterCategory(e.target.value);
          }}
        >
          <option hidden>Filter Courses by Category</option>
          <option>All</option>
          {allCategories?.data?.map((i) => (
            <option key={i._id}>{i.englishTitle}</option>
          ))}
        </Select>
      </Flex>

      <Flex flexDirection="column" gap="8">
        {filterCategory === "" && filterContentType === ""
          ? allCourses?.data
              ?.map((i) => (
                <>
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
                      <Flex
                        justifyContent="center"
                        flexDirection="column"
                        pr="3"
                      >
                        <Text lineHeight="1.2">
                          <b>{i.englishTitle}</b>
                        </Text>
                        <Text lineHeight="1.2">
                          <small>{i.category}</small>
                        </Text>
                      </Flex>
                    </Flex>
                    <ButtonGroup>
                      <Tooltip
                        hasArrow
                        arrowSize={8}
                        borderRadius="6px"
                        label="Edit Course"
                        p="2"
                        pl="4"
                        pr="4"
                        placement="top"
                      >
                        <IconButton
                          aria-label="Search database"
                          icon={<RiEditFill />}
                          onClick={() => {
                            getCourse(i._id);
                            setOpenEditModal(i._id);
                            onEditOpen();

                            if (i.spanishTitle) {
                              setShowSpanishCourseEdit(i._id);
                            } else {
                              setShowSpanishCourseEdit(null);
                            }

                            setEditCourse({
                              englishTitle: i.englishTitle,
                              spanishTitle: i.spanishTitle,
                              englishLink: i.englishLink,
                              spanishLink: i.spanishLink,
                              category: i.category,
                              contentType: i.contentType,
                              active: true,
                              id: i._id
                            });
                          }}
                          size="sm"
                        />
                      </Tooltip>

                      <Popover>
                        <PopoverTrigger>
                          <IconButton
                            aria-label="Search database"
                            colorScheme="red"
                            icon={<RiDeleteBin6Fill />}
                            size="sm"
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverBody pt="5" pb="6" pl="6" pr="6">
                            <Box fontSize="md" textAlign="center">
                              Are you sure you want to delete "
                              <b>{i.englishTitle}</b>
                              "?
                            </Box>
                            <Divider mb="2" mt="3" />
                            <Flex justifyContent="center">
                              <Button
                                //   flex="1"
                                colorScheme="red"
                                gap="2"
                                mt="3"
                                onClick={() => {
                                  deleteCourse(i._id, i.englishTitle);
                                }}
                                //   pb="5"f
                                //   pt="5"
                                size="md"
                              >
                                <RiDeleteBin6Fill />
                                Permanently Delete
                              </Button>
                            </Flex>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </ButtonGroup>
                  </Flex>

                  {openEditModal === i._id && (
                    <Modal
                      isCentered
                      isOpen={isEditOpen}
                      onClose={onEditClose}
                      size="xl"
                    >
                      <ModalOverlay />
                      <ModalContent pb="8" pl="4" pr="4" pt="4">
                        <ModalHeader>Edit This Course</ModalHeader>
                        <ModalCloseButton mt="1" />
                        <ModalBody>
                          <form onSubmit={updateCourse}>
                            <Flex flexDirection="column" gap="5">
                              <Box>
                                <Input
                                  name="englishTitle"
                                  placeholder="English Content Title"
                                  onChange={(e) => {
                                    setEditCourse({
                                      ...editCourse,
                                      englishTitle: e.target.value
                                    });
                                  }}
                                  value={editCourse.englishTitle}
                                  type="text"
                                />
                              </Box>

                              <Box>
                                <InputGroup gap="3">
                                  <Input
                                    name="englishLink"
                                    placeholder="English Content Link"
                                    onChange={(e) => {
                                      setEditCourse({
                                        ...editCourse,
                                        englishLink: e.target.value
                                      });
                                    }}
                                    value={editCourse.englishLink}
                                    type="text"
                                  />

                                  <UploadButton
                                    options={options}
                                    onComplete={(files) =>
                                      setEditCourse({
                                        ...editCourse,
                                        englishLink: files
                                          .map((x) => x.fileUrl)
                                          .join("\n")
                                      })
                                    }
                                  >
                                    {({ onClick }) => (
                                      <Tooltip
                                        hasArrow
                                        arrowSize={8}
                                        borderRadius="6px"
                                        label="Upload File"
                                        p="2"
                                        pl="4"
                                        pr="4"
                                      >
                                        <IconButton
                                          aria-label="Upload File"
                                          fontSize="18"
                                          icon={<RiUploadCloud2Fill />}
                                          onClick={onClick}
                                        />
                                      </Tooltip>
                                    )}
                                  </UploadButton>
                                </InputGroup>
                              </Box>

                              {showSpanishCourseEdit === i._id && (
                                <>
                                  <Box>
                                    <Input
                                      name="spanishTitle"
                                      placeholder="Spanish Content Title"
                                      onChange={(e) => {
                                        setEditCourse({
                                          ...editCourse,
                                          spanishTitle: e.target.value
                                        });
                                      }}
                                      value={editCourse.spanishTitle}
                                      type="text"
                                    />
                                  </Box>

                                  <Box>
                                    <InputGroup gap="3">
                                      <Input
                                        name="spanishLink"
                                        placeholder="Spanish Content Link"
                                        onChange={(e) => {
                                          setEditCourse({
                                            ...editCourse,
                                            spanishLink: e.target.value
                                          });
                                        }}
                                        value={editCourse.spanishLink}
                                        type="text"
                                      />
                                      <UploadButton
                                        options={options}
                                        onComplete={(files) =>
                                          setEditCourse({
                                            ...editCourse,
                                            spanishLink: files
                                              .map((x) => x.fileUrl)
                                              .join("\n")
                                          })
                                        }
                                      >
                                        {({ onClick }) => (
                                          <Tooltip
                                            hasArrow
                                            arrowSize={8}
                                            borderRadius="6px"
                                            label="Upload File"
                                            p="2"
                                            pl="4"
                                            pr="4"
                                          >
                                            <IconButton
                                              aria-label="Upload File"
                                              fontSize="18"
                                              icon={<RiUploadCloud2Fill />}
                                              onClick={onClick}
                                            />
                                          </Tooltip>
                                        )}
                                      </UploadButton>
                                    </InputGroup>
                                  </Box>
                                </>
                              )}

                              {showSpanishCourseEdit !== i._id &&
                                !i.spanishTitle && (
                                  <Button
                                    gap="1"
                                    onClick={() => {
                                      setShowSpanishCourseEdit(i._id);
                                    }}
                                  >
                                    <MdLanguage fontSize="16" /> Add Spanish
                                  </Button>
                                )}

                              <Box>
                                <Select
                                  color={editCourse.category ? "" : "#748094"}
                                  icon={<HiChevronDown />}
                                  name="category"
                                  onChange={(e) => {
                                    setEditCourse({
                                      ...editCourse,
                                      category: e.target.value
                                    });
                                  }}
                                  value={editCourse.category}
                                >
                                  <option hidden>
                                    Choose Content Category
                                  </option>
                                  {allCategories?.data?.map((i) => (
                                    <option key={i._id}>
                                      {i.englishTitle}
                                    </option>
                                  ))}
                                </Select>
                              </Box>

                              <Box>
                                <Select
                                  color={
                                    editCourse.contentType ? "" : "#748094"
                                  }
                                  icon={<HiChevronDown />}
                                  name="contentType"
                                  onChange={(e) => {
                                    setEditCourse({
                                      ...editCourse,
                                      contentType: e.target.value
                                    });
                                  }}
                                  value={editCourse.contentType}
                                >
                                  <option hidden>Choose Content Type</option>
                                  <option>PDF</option>
                                  <option>Video</option>
                                  <option>Link</option>
                                </Select>
                              </Box>

                              <ButtonGroup gap="2" justifyContent="stretch">
                                <Button
                                  colorScheme={
                                    editCourse.active ? "green" : "gray"
                                  }
                                  flex="1"
                                  gap="1"
                                  onClick={() =>
                                    setEditCourse({
                                      ...editCourse,
                                      active: true
                                    })
                                  }
                                  variant="outline"
                                >
                                  <GrFormView fontSize="20" /> Active
                                </Button>
                                <Button
                                  colorScheme={
                                    !editCourse.active ? "red" : "gray"
                                  }
                                  flex="1"
                                  gap="1"
                                  onClick={() =>
                                    setEditCourse({
                                      ...editCourse,
                                      active: false
                                    })
                                  }
                                  variant="outline"
                                >
                                  <GrHide fontSize="20" /> Inactive
                                </Button>
                              </ButtonGroup>

                              <Button
                                colorScheme="blue"
                                opacity={
                                  editCourse.englishTitle &&
                                  editCourse.englishLink &&
                                  editCourse.category &&
                                  editCourse.contentType
                                    ? "1"
                                    : ".5"
                                }
                                overflow="hidden"
                                pointerEvents={
                                  editCourse.englishTitle &&
                                  editCourse.englishLink &&
                                  editCourse.category &&
                                  editCourse.contentType
                                    ? ""
                                    : "none"
                                }
                                type="submit"
                              >
                                Update Course
                              </Button>
                            </Flex>
                          </form>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  )}
                </>
              ))
              .reverse()
          : filterCourses
              ?.map((i) => (
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
                  <Flex alignItems="center" gap="2">
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
                      <Text lineHeight="1.2">
                        <b>{i.englishTitle}</b>
                      </Text>
                      <Text lineHeight="1.2">
                        <small>{i.category}</small>
                      </Text>
                    </Flex>
                  </Flex>
                  <ButtonGroup>
                    <Tooltip
                      hasArrow
                      arrowSize={8}
                      borderRadius="6px"
                      label="Edit Course"
                      p="2"
                      pl="4"
                      pr="4"
                      placement="top"
                    >
                      <IconButton
                        icon={<RiEditFill />}
                        onClick={() => {
                          setOpenEditModal(i._id);
                        }}
                        size="sm"
                      />
                    </Tooltip>

                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          colorScheme="red"
                          icon={<RiDeleteBin6Fill />}
                          size="sm"
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody pt="5" pb="6" pl="6" pr="6">
                          <Box fontSize="sm" textAlign="center">
                            Are you sure you want to delete "
                            <b>{i.englishTitle}</b>
                            "?
                          </Box>
                          <Divider mb="2" mt="3" />
                          <Flex justifyContent="center">
                            <Button
                              //   flex="1"
                              colorScheme="red"
                              gap="1"
                              mt="3"
                              //   pb="5"
                              //   pt="5"
                              size="sm"
                            >
                              <RiDeleteBin6Fill />
                              Permanently Delete
                            </Button>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </ButtonGroup>
                </Flex>
              ))
              .reverse()}
      </Flex>

      <Modal
        isCentered
        isOpen={isNewCourseOpen}
        onClose={onNewCourseClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent pb="8" pl="4" pr="4" pt="4">
          <ModalHeader>Create a New Course</ModalHeader>
          <ModalCloseButton
            mt="1"
            onClick={() => {
              clearCourseForm();
            }}
          />
          <ModalBody>
            <form onSubmit={createCourse}>
              <Flex flexDirection="column" gap="5">
                <Box>
                  <Input
                    name="englishTitle"
                    placeholder="English Content Title"
                    onChange={(e) => {
                      setNewCourse({
                        ...newCourse,
                        englishTitle: e.target.value
                      });
                    }}
                    value={newCourse.englishTitle}
                    type="text"
                  />
                </Box>

                <Box>
                  <InputGroup gap="3">
                    <Input
                      name="englishLink"
                      placeholder="English Content Link"
                      onChange={(e) => {
                        setNewCourse({
                          ...newCourse,
                          englishLink: e.target.value
                        });
                      }}
                      value={newCourse.englishLink}
                      type="text"
                    />

                    <UploadButton
                      options={options}
                      onComplete={(files) =>
                        setNewCourse({
                          ...newCourse,
                          englishLink: files.map((x) => x.fileUrl).join("\n")
                        })
                      }
                    >
                      {({ onClick }) => (
                        <Tooltip
                          hasArrow
                          arrowSize={8}
                          borderRadius="6px"
                          label="Upload File"
                          p="2"
                          pl="4"
                          pr="4"
                        >
                          <IconButton
                            aria-label="Upload File"
                            fontSize="18"
                            icon={<RiUploadCloud2Fill />}
                            onClick={onClick}
                          />
                        </Tooltip>
                      )}
                    </UploadButton>
                  </InputGroup>
                </Box>

                {showSpanishCourse ? (
                  <>
                    <Box>
                      <Input
                        name="spanishTitle"
                        placeholder="Spanish Content Title"
                        onChange={(e) => {
                          setNewCourse({
                            ...newCourse,
                            spanishTitle: e.target.value
                          });
                        }}
                        value={newCourse.spanishTitle}
                        type="text"
                      />
                    </Box>

                    <Box>
                      <InputGroup gap="3">
                        <Input
                          name="spanishLink"
                          placeholder="Spanish Content Link"
                          onChange={(e) => {
                            setNewCourse({
                              ...newCourse,
                              spanishLink: e.target.value
                            });
                          }}
                          value={newCourse.spanishLink}
                          type="text"
                        />
                        <UploadButton
                          options={options}
                          onComplete={(files) =>
                            setNewCourse({
                              ...newCourse,
                              spanishLink: files
                                .map((x) => x.fileUrl)
                                .join("\n")
                            })
                          }
                        >
                          {({ onClick }) => (
                            <Tooltip
                              hasArrow
                              arrowSize={8}
                              borderRadius="6px"
                              label="Upload File"
                              p="2"
                              pl="4"
                              pr="4"
                            >
                              <IconButton
                                aria-label="Upload File"
                                fontSize="18"
                                icon={<RiUploadCloud2Fill />}
                                onClick={onClick}
                              />
                            </Tooltip>
                          )}
                        </UploadButton>
                      </InputGroup>
                    </Box>
                  </>
                ) : (
                  <Button
                    gap="1"
                    onClick={() => {
                      setShowSpanishCourse(!showSpanishCourse);
                    }}
                  >
                    <MdLanguage fontSize="16" /> Add Spanish
                  </Button>
                )}

                <Box>
                  <Select
                    color={newCourse.category ? "" : "#748094"}
                    icon={<HiChevronDown />}
                    name="category"
                    onChange={(e) => {
                      setNewCourse({ ...newCourse, category: e.target.value });
                    }}
                    value={newCourse.category}
                  >
                    <option hidden>Choose Content Category</option>
                    {allCategories?.data?.map((i) => (
                      <option key={i._id}>{i.englishTitle}</option>
                    ))}
                  </Select>
                </Box>

                <Box>
                  <Select
                    color={newCourse.contentType ? "" : "#748094"}
                    icon={<HiChevronDown />}
                    name="contentType"
                    onChange={(e) => {
                      setNewCourse({
                        ...newCourse,
                        contentType: e.target.value
                      });
                    }}
                    value={newCourse.contentType}
                  >
                    <option hidden>Choose Content Type</option>
                    <option>PDF</option>
                    <option>Video</option>
                    <option>Link</option>
                  </Select>
                </Box>

                <ButtonGroup gap="2" justifyContent="stretch">
                  <Button
                    colorScheme={newCourse.active ? "green" : "gray"}
                    flex="1"
                    gap="1"
                    onClick={() => setNewCourse({ ...newCourse, active: true })}
                    variant="outline"
                  >
                    <GrFormView fontSize="20" /> Active
                  </Button>
                  <Button
                    colorScheme={!newCourse.active ? "red" : "gray"}
                    flex="1"
                    gap="1"
                    onClick={() =>
                      setNewCourse({ ...newCourse, active: false })
                    }
                    variant="outline"
                  >
                    <GrHide fontSize="20" /> Inactive
                  </Button>
                </ButtonGroup>

                <Button
                  colorScheme="blue"
                  opacity={
                    newCourse.englishTitle &&
                    newCourse.englishLink &&
                    newCourse.category &&
                    newCourse.contentType
                      ? "1"
                      : ".5"
                  }
                  overflow="hidden"
                  pointerEvents={
                    newCourse.englishTitle &&
                    newCourse.englishLink &&
                    newCourse.category &&
                    newCourse.contentType
                      ? ""
                      : "none"
                  }
                  type="submit"
                >
                  Create Course
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={isNewCategoryOpen}
        onClose={onNewCategoryClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent pb="8" pl="4" pr="4" pt="4">
          <ModalHeader>Create a New Category</ModalHeader>
          <ModalCloseButton mt="1" />
          <ModalBody>
            <form>
              <Flex flexDirection="column" gap="5">
                <Box>
                  <Input
                    name="englishTitle"
                    placeholder="English Category Title"
                    onChange={(e) => {
                      setNewCategory({
                        ...newCategory,
                        englishTitle: e.target.value
                      });
                    }}
                    value={newCategory.englishTitle}
                    type="text"
                  />
                </Box>

                {showSpanishCategory ? (
                  <Box>
                    <Input
                      name="spanishTitle"
                      placeholder="Spanish Category Title"
                      onChange={(e) => {
                        setNewCategory({
                          ...newCategory,
                          spanishTitle: e.target.value
                        });
                      }}
                      value={newCategory.spanishTitle}
                      type="text"
                    />
                  </Box>
                ) : (
                  <Button
                    gap="1"
                    onClick={() => {
                      setShowSpanishCategory(!showSpanishCategory);
                    }}
                  >
                    <MdLanguage fontSize="16" /> Add Spanish
                  </Button>
                )}

                <Box>
                  <InputGroup gap="3">
                    <Input
                      name="categoryImage"
                      placeholder="Category Image"
                      onChange={(e) => {
                        setNewCategory({
                          ...newCategory,
                          categoryImage: e.target.value
                        });
                      }}
                      value={newCategory.categoryImage}
                      type="text"
                    />
                    <UploadButton
                      options={options}
                      onComplete={(files) =>
                        setNewCategory({
                          ...newCategory,
                          categoryImage: files.map((x) => x.fileUrl).join("\n")
                        })
                      }
                    >
                      {({ onClick }) => (
                        <Tooltip
                          hasArrow
                          arrowSize={8}
                          borderRadius="6px"
                          label="Upload File"
                          p="2"
                          pl="4"
                          pr="4"
                        >
                          <IconButton
                            aria-label="Upload File"
                            fontSize="18"
                            icon={<RiUploadCloud2Fill />}
                            onClick={onClick}
                          />
                        </Tooltip>
                      )}
                    </UploadButton>
                  </InputGroup>
                </Box>

                <Button
                  colorScheme="blue"
                  opacity={
                    newCategory.englishTitle && newCategory.categoryImage
                      ? "1"
                      : ".5"
                  }
                  overflow="hidden"
                  pointerEvents={
                    newCategory.englishTitle && newCategory.categoryImage
                      ? ""
                      : "none"
                  }
                >
                  Create Category
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
