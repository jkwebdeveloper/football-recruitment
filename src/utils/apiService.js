import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "./apiEndPoints";

const setHeaders = (token) => ({
  // "Accept": "application/json",
  // "Content-Type": "application/json",
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
  Authorization: token || "",
});

const handleApiResponse = (response, disableMessage) => {
  if (!disableMessage) {
    if (response?.success === true) {
      console.log("Success", response);
    } else {
      console.log("Failed", JSON.stringify(response));
    }
  }
  return response;
};

export const ApiPostRequest = ({
  key,
  endPoints,
  disableMessage,
  successCallBack,
}) => {
  return createAsyncThunk(
    `${key || endPoints}`,
    async ({ data }, { getState, dispatch }) => {
      const state = getState();
      const { token } = state?.whiteList;
      const meta = {
        endPoints: endPoints,
        params: data,
      };
      console.log("token", token);
      console.log("Api Request ->", JSON.stringify(meta));
      // console.log(`${baseURL}${endPoints}`, "url💥");
      // const formDataObject = {};
      // data.forEach((value, key) => {
      //   formDataObject[key] = value;
      // });
      // console.log("Form Data:", formDataObject);
      try {
        const parsedResponse = await fetch(`${baseURL}${endPoints}`, {
          method: "POST",
          headers: setHeaders(token),
          body: data,
        });

        let response = await parsedResponse.json();
        console.log("response 💥", response);
        handleApiResponse(response, disableMessage, dispatch);
        return (successCallBack && successCallBack(response)) || response;

        // if (response?.success === true) {
        //   console.log("Success", response?.message);
        // } else {
        //   console.log("Failed", JSON.stringify(response?.message));
        // }

        // return response;
      } catch (error) {
        console.log("error from api =>", error);
        return error;
      }
    }
  );
};
