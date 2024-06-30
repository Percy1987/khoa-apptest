import React, { useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import FormRow from "./FormRow";
import usePositions from "../utils/fetchPosition";

import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch } from "../redux/store";
import { saveFormData } from "../redux/formDataSlice";

interface ToolLanguage {
  description: string;
  id: number;
  tool: string;
  from?: string;
  to?: string;
  imageUrls: string[];
}

interface Position {
  id: number;
  name: string;
  positionResourceId: number;
  toolLanguages: ToolLanguage[];
}

const FormComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [name, setName] = useState("");
  const { positionOptions } = usePositions(); // Use the custom hook
  const [positions, setPositions] = useState<Position[]>([]);
  const [nextPositionId, setNextPositionId] = useState(1);
  const [nextToolLanguageId, setNextToolLanguageId] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleAddPositionClick = () => {
    setPositions([
      ...positions,
      {
        id: nextPositionId,
        name: "",
        positionResourceId: 0,
        toolLanguages: [
          {
            id: nextToolLanguageId,
            tool: "",
            from: "",
            to: "",
            description: "",
            imageUrls: [], // Initialize with an empty array
          },
        ],
      },
    ]);
    setNextPositionId(nextPositionId + 1);
    setNextToolLanguageId(nextToolLanguageId + 1);
  };

  const handlePositionChange = (id: number, positionResourceId: number) => {
    const selectedPosition = positionOptions.find(
      (pos) => pos.positionResourceId === positionResourceId
    );
    setPositions(
      positions.map((pos) =>
        pos.id === id
          ? { ...pos, name: selectedPosition?.name || "", positionResourceId }
          : pos
      )
    );
  };

  const handleDeletePosition = (id: number) => {
    setPositions(positions.filter((pos) => pos.id !== id));
  };

  const handleDeleteToolLanguage = (
    positionId: number,
    toolLanguageId: number
  ) => {
    setPositions(
      positions.map((pos) =>
        pos.id === positionId
          ? {
              ...pos,
              toolLanguages: pos.toolLanguages.filter(
                (lang) => lang.id !== toolLanguageId
              ),
            }
          : pos
      )
    );
  };

  const handleAddToolLanguage = (positionId: number) => {
    setPositions(
      positions.map((pos) =>
        pos.id === positionId
          ? {
              ...pos,
              toolLanguages: [
                ...pos.toolLanguages,
                {
                  id: nextToolLanguageId,
                  tool: "",
                  from: "",
                  to: "",
                  description: "",
                  imageUrls: [],
                },
              ],
            }
          : pos
      )
    );
    setNextToolLanguageId(nextToolLanguageId + 1);
  };

  const handleToolLanguageChange = (
    positionId: number,
    toolLanguageId: number,
    field: keyof ToolLanguage,
    name: string
  ) => {
    setPositions(
      positions.map((pos) =>
        pos.id === positionId
          ? {
              ...pos,
              toolLanguages: pos.toolLanguages.map((lang) =>
                lang.id === toolLanguageId ? { ...lang, [field]: name } : lang
              ),
            }
          : pos
      )
    );
  };

  const handleUploadImage = (
    positionId: number,
    toolLanguageId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPositions(
        positions.map((pos) =>
          pos.id === positionId
            ? {
                ...pos,
                toolLanguages: pos.toolLanguages.map((lang) =>
                  lang.id === toolLanguageId
                    ? {
                        ...lang,
                        imageUrls: [...lang.imageUrls, ...newImageUrls],
                      }
                    : lang
                ),
              }
            : pos
        )
      );
    }
  };

  const handleRemoveImage = (
    positionId: number,
    toolLanguageId: number,
    imageUrl: string
  ) => {
    setPositions(
      positions.map((pos) =>
        pos.id === positionId
          ? {
              ...pos,
              toolLanguages: pos.toolLanguages.map((lang) =>
                lang.id === toolLanguageId
                  ? {
                      ...lang,
                      imageUrls: lang.imageUrls.filter(
                        (url) => url !== imageUrl
                      ),
                    }
                  : lang
              ),
            }
          : pos
      )
    );
  };

  const getToolLanguagesSelect = (positionResourceId: number) => {
    const position = positionOptions.find(
      (pos) => pos.positionResourceId === positionResourceId
    );
    return position
      ? position.toolLanguageResources.map((toolLang) => (
          <option
            key={toolLang.toolLanguageResourceId}
            value={toolLang.toolLanguageResourceId}
          >
            {toolLang.name}
          </option>
        ))
      : [];
  };

  const validateToolLanguages = () => {
    const newErrors: { [key: string]: string } = {};
    positions.forEach((position) => {
      position.toolLanguages.forEach((toolLanguage) => {
        if (!toolLanguage.from || !toolLanguage.to) {
          newErrors[`${position.id}-${toolLanguage.id}`] =
            "From and To fields are required.";
        } else if (toolLanguage.from > toolLanguage.to) {
          newErrors[`${position.id}-${toolLanguage.id}`] =
            "From year cannot be greater than To year.";
        } else if (toolLanguage.from === toolLanguage.to) {
          newErrors[`${position.id}-${toolLanguage.id}`] =
            "From and To years cannot be the same.";
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (validateToolLanguages()) {
      const formData = collectFormData();

      console.log(formData);

      dispatch(saveFormData(formData));

      router.push("/");

      alert("Form is valid and ready to be submitted.");
    } else {
      alert("Please fix the validation errors.");
    }
  };

  const collectFormData = () => {
    const formData: any = {
      id: nextPositionId,
      name: name,
      positions: positions.map((pos) => ({
        id: pos.id,
        positionResourceId: pos.positionResourceId,
        toolLanguages: pos.toolLanguages.map((lang) => ({
          id: lang.id,
          toolLanguageResourceId: lang.tool,
          from: lang.from,
          to: lang.to,
          description: lang.description,
          imageUrls: lang.imageUrls,
        })),
        positionName: pos.name,
      })),
    };

    return formData;
  };

  const handleCloseAlert = (key: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[key];
      return newErrors;
    });
  };

  return (
    <div className="mt-4">
      <Form>
        <FormRow label="Name">
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </FormRow>
        {positions.map((position) => (
          <div key={position.id}>
            <FormRow
              label="Position"
              actions={
                <Button
                  variant="danger"
                  onClick={() => handleDeletePosition(position.id)}
                >
                  Delete Position
                </Button>
              }
            >
              <Form.Select
                onChange={(e) =>
                  handlePositionChange(position.id, parseInt(e.target.value))
                }
                value={position.positionResourceId}
                aria-label="Select Position"
              >
                <option value="">Select Position</option>
                {positionOptions.map((pos) => (
                  <option
                    key={pos.positionResourceId}
                    value={pos.positionResourceId}
                  >
                    {pos.name}
                  </option>
                ))}
              </Form.Select>
            </FormRow>

            {position.name &&
              position.toolLanguages.map((toolLanguage) => (
                <div key={toolLanguage.id} className="mb-3">
                  <FormRow
                    label="Tool Language"
                    actions={
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDeleteToolLanguage(position.id, toolLanguage.id)
                        }
                      >
                        Delete ToolLanguage
                      </Button>
                    }
                  >
                    <Row>
                      <Col>
                        <Form.Select
                          onChange={(e) =>
                            handleToolLanguageChange(
                              position.id,
                              toolLanguage.id,
                              "tool",
                              e.target.value
                            )
                          }
                          aria-label="Select ToolLanguage"
                        >
                          <option value="" disabled>
                            Select ToolLanguage
                          </option>
                          {getToolLanguagesSelect(position.positionResourceId)}
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          onChange={(e) =>
                            handleToolLanguageChange(
                              position.id,
                              toolLanguage.id,
                              "from",
                              e.target.value
                            )
                          }
                          aria-label="From"
                        >
                          <option value="" disabled>
                            From
                          </option>
                          {[
                            "2018",
                            "2019",
                            "2020",
                            "2021",
                            "2022",
                            "2023",
                            "2024",
                          ].map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          onChange={(e) =>
                            handleToolLanguageChange(
                              position.id,
                              toolLanguage.id,
                              "to",
                              e.target.value
                            )
                          }
                          aria-label="To"
                        >
                          <option value="" disabled>
                            To
                          </option>
                          {[
                            "2018",
                            "2019",
                            "2020",
                            "2021",
                            "2022",
                            "2023",
                            "2024",
                          ].map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </FormRow>
                  <Row>
                    <Col sm={2}></Col>
                    <Col sm={8}>
                      {errors[`${position.id}-${toolLanguage.id}`] && (
                        <Alert
                          variant="danger"
                          dismissible
                          onClose={() =>
                            handleCloseAlert(
                              `${position.id}-${toolLanguage.id}`
                            )
                          }
                        >
                          {errors[`${position.id}-${toolLanguage.id}`]}
                        </Alert>
                      )}
                    </Col>
                  </Row>

                  <FormRow label="Description">
                    <Form.Control
                      as="textarea"
                      value={toolLanguage.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleToolLanguageChange(
                          position.id,
                          toolLanguage.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Description"
                      rows={5}
                    />
                  </FormRow>

                  <FormRow label="">
                    <Row>
                      <Col sm={2}>
                        <div className="upload-btn-wrapper">
                          <button className="btnUpload">
                            <span className="iconUpload text-dark">+</span>
                            <p className="text-dark">Upload</p>
                          </button>
                          <label>
                            <input
                              className="upload-file-button"
                              type="file"
                              multiple // Allow multiple files selection
                              onChange={(e) =>
                                handleUploadImage(
                                  position.id,
                                  toolLanguage.id,
                                  e
                                )
                              }
                            />
                          </label>
                        </div>
                      </Col>
                      <Col sm={10} className="d-flex flex-row ">
                        {toolLanguage.imageUrls.map((imageUrl, index) => (
                          <div key={index} className="position-relative">
                            <img
                              className="mx-2 my-2 position-relative"
                              src={imageUrl}
                              alt={`Uploaded ${index}`}
                              style={{
                                maxWidth: "100px",
                                maxHeight: "100px",
                              }}
                            />
                            <Button
                              variant="danger"
                              fs-6
                              className="position-absolute top-0 end-0"
                              style={{
                                padding: "0px 7px 0px 7px",
                                height: "1.6rem",
                              }}
                              onClick={() =>
                                handleRemoveImage(
                                  position.id,
                                  toolLanguage.id,
                                  imageUrl
                                )
                              }
                            >
                              X
                            </Button>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </FormRow>
                </div>
              ))}
            <div className="row-bordered">
              {position.name && (
                <FormRow label="">
                  <Col>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleAddToolLanguage(position.id)}
                    >
                      Add ToolLanguage
                    </Button>
                  </Col>
                </FormRow>
              )}
            </div>
          </div>
        ))}

        <FormRow label="">
          <Col>
            <Button variant="primary" onClick={handleAddPositionClick}>
              Add Position
            </Button>
          </Col>
        </FormRow>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="success" onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormComponent;
