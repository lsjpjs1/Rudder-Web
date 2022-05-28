import axiosInstance from "./index";

type GetSchoolsRequest = {

};

export const getSchools = (getSchoolsRequest: GetSchoolsRequest) =>
    axiosInstance.get("/schools",
    )