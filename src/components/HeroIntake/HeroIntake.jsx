import { useDispatch } from "react-redux";
import { FieldArray, Formik } from "formik";
import { FiPaperclip } from "react-icons/fi";
import {
  MdOutlineAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import {
  ErrorMessage,
  FormBtn,
  HeroForm,
  FormField,
  Label,
  SuperpowerBtn,
  SuperpowerWrapper,
  SvgBtn,
  Wrapper,
  ImageWrapper,
  ImagesWrapper,
  Overlay,
  BtnsWrap,
} from "./HeroIntake.styled";
import {
  addHero,
  updateHero,
  deleteHero,
} from "../../redux/heroes/heroesOperations";
import { API_HOST } from "../../constants";

const requiredError = "This is a required field";

const validate = (values, existingHero) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    newImages,
    deletedImages,
  } = values;
  const errors = {};

  if (!nickname) {
    errors.nickname = requiredError;
  } else if (nickname.length < 3) {
    errors.nickname = "Nickname length must be more than 3 characters";
  } else if (nickname.length > 30) {
    errors.nickname = "Nickname length must be less than 30 characters";
  }
  if (!real_name) {
    errors.real_name = requiredError;
  } else if (real_name.length < 3) {
    errors.real_name = "Real name length must be more than 3 characters";
  } else if (real_name.length > 30) {
    errors.real_name = "Real name length must be less than 30 characters";
  }

  if (!origin_description) {
    errors.origin_description = requiredError;
  }
  if (!catch_phrase) {
    errors.catch_phrase = requiredError;
  }

  superpowers.forEach((power, i) => {
    if (!power) {
      errors.superpowers = errors.superpowers ?? [];
      errors.superpowers[i] = requiredError;
    }
  });
  const imagesCount =
    (existingHero?.images.length ?? 0) +
    newImages.length -
    deletedImages.length;
  if (imagesCount < 1) {
    errors.images = "You must attach at least one image";
  }
  return errors;
};

export default function HeroIntake({ existingHero }) {
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const formData = new FormData();
    if (!existingHero) {
      formData.append("nickname", values.nickname);
      formData.append("real_name", values.real_name);
      formData.append("origin_description", values.origin_description);
      values.superpowers.forEach((el) => formData.append(`superpowers`, el));
      formData.append("catch_phrase", values.catch_phrase);
      values.newImages.forEach((el) => formData.append(`images`, el));
      await dispatch(addHero(formData));
    } else {
      console.log(values);
      formData.append("nickname", values.nickname);
      formData.append("real_name", values.real_name);
      formData.append("origin_description", values.origin_description);
      values.superpowers.forEach((el) => formData.append(`superpowers`, el));
      formData.append("catch_phrase", values.catch_phrase);
      values.deletedImages.forEach((el) =>
        formData.append(`deletedImages[]`, el)
      );
      values.newImages.forEach((el) => formData.append(`images`, el));
      await dispatch(updateHero({ heroId: existingHero._id, hero: formData }));
    }
  };

  const initialValues = {
    nickname: existingHero?.nickname ?? "",
    real_name: existingHero?.real_name ?? "",
    origin_description: existingHero?.origin_description ?? "",
    superpowers: existingHero?.superpowers ?? [],
    catch_phrase: existingHero?.catch_phrase ?? "",
    deletedImages: [],
    newImages: [],
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values, existingHero)}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          getFieldHelpers,
        }) => {
          const newImagesHelpers = getFieldHelpers("newImages");
          const deletedImagesHelpers = getFieldHelpers("deletedImages");
          const existingImages = (existingHero?.images ?? []).filter(
            (name) => !values.deletedImages.includes(name)
          );
          const allImages = [
            ...existingImages.map((name) => ({
              key: name,
              isNew: false,
              name,
              url: `${API_HOST}/heroes/download/` + name,
            })),
            ...values.newImages.map((file) => ({
              key: file.url,
              isNew: true,
              name: file.name,
              url: file.url,
              file,
            })),
          ];
          return (
            <HeroForm encType="multipart/form-data" onSubmit={handleSubmit}>
              <Label>
                Nickname
                <FormField name="nickname" />
              </Label>
              {touched.nickname && errors.nickname ? (
                <ErrorMessage>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 11.04C13 11.352 12.8929 11.59 12.6788 11.754C12.4647 11.918 12.2019 12 11.8904 12H1.10961C0.798143 12 0.53534 11.916 0.321204 11.748C0.107068 11.58 0 11.344 0 11.04C0 10.8 0.0700809 10.556 0.210243 10.308L5.59479 0.66C5.85175 0.22 6.15544 0 6.50584 0C6.85624 0 7.15214 0.22 7.39353 0.66L12.7898 10.32C12.9299 10.576 13 10.816 13 11.04ZM7.31177 4.908V3.156H5.68823V4.908C5.68823 5.02 5.69602 5.126 5.71159 5.226C5.72716 5.326 5.74858 5.438 5.77583 5.562C5.80308 5.686 5.8245 5.792 5.84007 5.88L6.14376 7.824H6.83288L7.14825 5.88C7.16382 5.8 7.18718 5.696 7.21833 5.568C7.24948 5.44 7.27284 5.326 7.28841 5.226C7.30398 5.126 7.31177 5.02 7.31177 4.908ZM7.31177 9.552C7.31177 9.32 7.23196 9.124 7.07233 8.964C6.9127 8.804 6.71998 8.724 6.49416 8.724C6.27613 8.724 6.0873 8.804 5.92767 8.964C5.76804 9.124 5.68823 9.32 5.68823 9.552C5.68823 9.784 5.76804 9.982 5.92767 10.146C6.0873 10.31 6.27613 10.392 6.49416 10.392C6.71998 10.392 6.9127 10.31 7.07233 10.146C7.23196 9.982 7.31177 9.784 7.31177 9.552Z"
                      fill="#EB5757"
                    />
                  </svg>
                  {touched.nickname && errors.nickname}
                </ErrorMessage>
              ) : (
                <div style={{ height: 12 }} />
              )}
              <Label>
                Real name
                <FormField name="real_name" />
              </Label>
              {touched.real_name && errors.real_name ? (
                <ErrorMessage>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 11.04C13 11.352 12.8929 11.59 12.6788 11.754C12.4647 11.918 12.2019 12 11.8904 12H1.10961C0.798143 12 0.53534 11.916 0.321204 11.748C0.107068 11.58 0 11.344 0 11.04C0 10.8 0.0700809 10.556 0.210243 10.308L5.59479 0.66C5.85175 0.22 6.15544 0 6.50584 0C6.85624 0 7.15214 0.22 7.39353 0.66L12.7898 10.32C12.9299 10.576 13 10.816 13 11.04ZM7.31177 4.908V3.156H5.68823V4.908C5.68823 5.02 5.69602 5.126 5.71159 5.226C5.72716 5.326 5.74858 5.438 5.77583 5.562C5.80308 5.686 5.8245 5.792 5.84007 5.88L6.14376 7.824H6.83288L7.14825 5.88C7.16382 5.8 7.18718 5.696 7.21833 5.568C7.24948 5.44 7.27284 5.326 7.28841 5.226C7.30398 5.126 7.31177 5.02 7.31177 4.908ZM7.31177 9.552C7.31177 9.32 7.23196 9.124 7.07233 8.964C6.9127 8.804 6.71998 8.724 6.49416 8.724C6.27613 8.724 6.0873 8.804 5.92767 8.964C5.76804 9.124 5.68823 9.32 5.68823 9.552C5.68823 9.784 5.76804 9.982 5.92767 10.146C6.0873 10.31 6.27613 10.392 6.49416 10.392C6.71998 10.392 6.9127 10.31 7.07233 10.146C7.23196 9.982 7.31177 9.784 7.31177 9.552Z"
                      fill="#EB5757"
                    />
                  </svg>
                  {touched.real_name && errors.real_name}
                </ErrorMessage>
              ) : (
                <div style={{ height: 12 }} />
              )}
              <Label>
                Origin description
                <FormField name="origin_description" />
              </Label>
              {touched.origin_description && errors.origin_description ? (
                <ErrorMessage>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 11.04C13 11.352 12.8929 11.59 12.6788 11.754C12.4647 11.918 12.2019 12 11.8904 12H1.10961C0.798143 12 0.53534 11.916 0.321204 11.748C0.107068 11.58 0 11.344 0 11.04C0 10.8 0.0700809 10.556 0.210243 10.308L5.59479 0.66C5.85175 0.22 6.15544 0 6.50584 0C6.85624 0 7.15214 0.22 7.39353 0.66L12.7898 10.32C12.9299 10.576 13 10.816 13 11.04ZM7.31177 4.908V3.156H5.68823V4.908C5.68823 5.02 5.69602 5.126 5.71159 5.226C5.72716 5.326 5.74858 5.438 5.77583 5.562C5.80308 5.686 5.8245 5.792 5.84007 5.88L6.14376 7.824H6.83288L7.14825 5.88C7.16382 5.8 7.18718 5.696 7.21833 5.568C7.24948 5.44 7.27284 5.326 7.28841 5.226C7.30398 5.126 7.31177 5.02 7.31177 4.908ZM7.31177 9.552C7.31177 9.32 7.23196 9.124 7.07233 8.964C6.9127 8.804 6.71998 8.724 6.49416 8.724C6.27613 8.724 6.0873 8.804 5.92767 8.964C5.76804 9.124 5.68823 9.32 5.68823 9.552C5.68823 9.784 5.76804 9.982 5.92767 10.146C6.0873 10.31 6.27613 10.392 6.49416 10.392C6.71998 10.392 6.9127 10.31 7.07233 10.146C7.23196 9.982 7.31177 9.784 7.31177 9.552Z"
                      fill="#EB5757"
                    />
                  </svg>
                  {touched.origin_description && errors.origin_description}
                </ErrorMessage>
              ) : (
                <div style={{ height: 12 }} />
              )}

              <FieldArray
                name="superpowers"
                render={(arrayHelpers) => (
                  <Wrapper>
                    Superpowers
                    {values.superpowers && values.superpowers.length > 0 ? (
                      values.superpowers.map((superpower, index) => (
                        <SuperpowerWrapper key={index}>
                          <label>
                            <FormField name={`superpowers.${index}`} />
                            <SvgBtn
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <MdOutlineRemoveCircleOutline width={100} />
                            </SvgBtn>
                            <SvgBtn
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                            >
                              <MdOutlineAddCircleOutline />
                            </SvgBtn>
                          </label>
                          {touched.superpowers?.[index] &&
                          errors.superpowers?.[index] ? (
                            <ErrorMessage>
                              <svg
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13 11.04C13 11.352 12.8929 11.59 12.6788 11.754C12.4647 11.918 12.2019 12 11.8904 12H1.10961C0.798143 12 0.53534 11.916 0.321204 11.748C0.107068 11.58 0 11.344 0 11.04C0 10.8 0.0700809 10.556 0.210243 10.308L5.59479 0.66C5.85175 0.22 6.15544 0 6.50584 0C6.85624 0 7.15214 0.22 7.39353 0.66L12.7898 10.32C12.9299 10.576 13 10.816 13 11.04ZM7.31177 4.908V3.156H5.68823V4.908C5.68823 5.02 5.69602 5.126 5.71159 5.226C5.72716 5.326 5.74858 5.438 5.77583 5.562C5.80308 5.686 5.8245 5.792 5.84007 5.88L6.14376 7.824H6.83288L7.14825 5.88C7.16382 5.8 7.18718 5.696 7.21833 5.568C7.24948 5.44 7.27284 5.326 7.28841 5.226C7.30398 5.126 7.31177 5.02 7.31177 4.908ZM7.31177 9.552C7.31177 9.32 7.23196 9.124 7.07233 8.964C6.9127 8.804 6.71998 8.724 6.49416 8.724C6.27613 8.724 6.0873 8.804 5.92767 8.964C5.76804 9.124 5.68823 9.32 5.68823 9.552C5.68823 9.784 5.76804 9.982 5.92767 10.146C6.0873 10.31 6.27613 10.392 6.49416 10.392C6.71998 10.392 6.9127 10.31 7.07233 10.146C7.23196 9.982 7.31177 9.784 7.31177 9.552Z"
                                  fill="#EB5757"
                                />
                              </svg>
                              {touched.superpowers?.[index] &&
                                errors.superpowers?.[index]}
                            </ErrorMessage>
                          ) : (
                            <div style={{ height: 12 }} />
                          )}
                        </SuperpowerWrapper>
                      ))
                    ) : (
                      <SuperpowerBtn
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add a superpower
                      </SuperpowerBtn>
                    )}
                  </Wrapper>
                )}
              />

              <Label>
                Catch phrase
                <FormField name="catch_phrase" />
                {touched.catch_phrase && errors.catch_phrase ? (
                  <ErrorMessage>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 11.04C13 11.352 12.8929 11.59 12.6788 11.754C12.4647 11.918 12.2019 12 11.8904 12H1.10961C0.798143 12 0.53534 11.916 0.321204 11.748C0.107068 11.58 0 11.344 0 11.04C0 10.8 0.0700809 10.556 0.210243 10.308L5.59479 0.66C5.85175 0.22 6.15544 0 6.50584 0C6.85624 0 7.15214 0.22 7.39353 0.66L12.7898 10.32C12.9299 10.576 13 10.816 13 11.04ZM7.31177 4.908V3.156H5.68823V4.908C5.68823 5.02 5.69602 5.126 5.71159 5.226C5.72716 5.326 5.74858 5.438 5.77583 5.562C5.80308 5.686 5.8245 5.792 5.84007 5.88L6.14376 7.824H6.83288L7.14825 5.88C7.16382 5.8 7.18718 5.696 7.21833 5.568C7.24948 5.44 7.27284 5.326 7.28841 5.226C7.30398 5.126 7.31177 5.02 7.31177 4.908ZM7.31177 9.552C7.31177 9.32 7.23196 9.124 7.07233 8.964C6.9127 8.804 6.71998 8.724 6.49416 8.724C6.27613 8.724 6.0873 8.804 5.92767 8.964C5.76804 9.124 5.68823 9.32 5.68823 9.552C5.68823 9.784 5.76804 9.982 5.92767 10.146C6.0873 10.31 6.27613 10.392 6.49416 10.392C6.71998 10.392 6.9127 10.31 7.07233 10.146C7.23196 9.982 7.31177 9.784 7.31177 9.552Z"
                        fill="#EB5757"
                      />
                    </svg>
                    {touched.catch_phrase && errors.catch_phrase}
                  </ErrorMessage>
                ) : (
                  <div style={{ height: 12 }} />
                )}
              </Label>
              <Label>
                Add image
                <FiPaperclip
                  style={{
                    marginLeft: 5,
                  }}
                />
                <input
                  style={{ display: "none" }}
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = [...e.target.files];
                    files.forEach((file) => {
                      file.url = URL.createObjectURL(file);
                    });
                    newImagesHelpers.setValue([...values.newImages, ...files]);
                    e.target.type = "";
                    e.target.type = "file";
                  }}
                />
              </Label>
              {(touched.newImages || touched.deletedImages) && errors.images ? (
                <ErrorMessage>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 11.04C13 11.352 12.8929 11.59 12.6788 11.754C12.4647 11.918 12.2019 12 11.8904 12H1.10961C0.798143 12 0.53534 11.916 0.321204 11.748C0.107068 11.58 0 11.344 0 11.04C0 10.8 0.0700809 10.556 0.210243 10.308L5.59479 0.66C5.85175 0.22 6.15544 0 6.50584 0C6.85624 0 7.15214 0.22 7.39353 0.66L12.7898 10.32C12.9299 10.576 13 10.816 13 11.04ZM7.31177 4.908V3.156H5.68823V4.908C5.68823 5.02 5.69602 5.126 5.71159 5.226C5.72716 5.326 5.74858 5.438 5.77583 5.562C5.80308 5.686 5.8245 5.792 5.84007 5.88L6.14376 7.824H6.83288L7.14825 5.88C7.16382 5.8 7.18718 5.696 7.21833 5.568C7.24948 5.44 7.27284 5.326 7.28841 5.226C7.30398 5.126 7.31177 5.02 7.31177 4.908ZM7.31177 9.552C7.31177 9.32 7.23196 9.124 7.07233 8.964C6.9127 8.804 6.71998 8.724 6.49416 8.724C6.27613 8.724 6.0873 8.804 5.92767 8.964C5.76804 9.124 5.68823 9.32 5.68823 9.552C5.68823 9.784 5.76804 9.982 5.92767 10.146C6.0873 10.31 6.27613 10.392 6.49416 10.392C6.71998 10.392 6.9127 10.31 7.07233 10.146C7.23196 9.982 7.31177 9.784 7.31177 9.552Z"
                      fill="#EB5757"
                    />
                  </svg>
                  {errors.images}
                </ErrorMessage>
              ) : (
                <div style={{ height: 12 }} />
              )}

              <ImagesWrapper>
                {allImages.map((el) => {
                  return (
                    <ImageWrapper key={el.key}>
                      <img src={el.url}></img>
                      <Overlay>
                        <button
                          type="button"
                          style={{ width: 35, height: 35, padding: 0 }}
                          onClick={() => {
                            console.log(el);
                            if (el.isNew) {
                              newImagesHelpers.setValue(
                                values.newImages.filter((x) => x !== el.file)
                              );
                            } else {
                              deletedImagesHelpers.setValue([
                                ...values.deletedImages,
                                el.name,
                              ]);
                              console.log(values.deletedImages);
                            }
                          }}
                        >
                          <MdOutlineRemoveCircleOutline
                            style={{
                              width: "100%",
                              height: "100%",
                              fill: "#ffffff",
                            }}
                          />
                        </button>
                      </Overlay>
                    </ImageWrapper>
                  );
                })}
              </ImagesWrapper>

              {existingHero ? (
                <BtnsWrap>
                  <FormBtn type="submit" disabled={isSubmitting}>
                    Update superhero
                  </FormBtn>{" "}
                  <FormBtn
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      dispatch(deleteHero({ heroId: existingHero._id }))
                    }
                  >
                    Delete superhero
                  </FormBtn>
                </BtnsWrap>
              ) : (
                <FormBtn type="submit" disabled={isSubmitting}>
                  Add superhero
                </FormBtn>
              )}
            </HeroForm>
          );
        }}
      </Formik>
    </>
  );
}
