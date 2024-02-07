import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUrl, PostUrl } from "../BaseUrl";
import toast from "react-hot-toast";

export const handleFindJobByKeywords = createAsyncThunk(
  "job/handleFindJobByKeywords",
  async (
    {
      title,
      city,
      page,
      limit,
      minSalary,
      maxSalary,
      categoryId,
      jobType,
    },
    { rejectWithValue }
  ) => {
    toast.dismiss();
    const response = await GetUrl(
      `all-job?title=${title ?? ""}&city=${city ?? ""}&page=${
        page ?? "1"
      }&limit=${limit ?? "5"}&minSalary=${minSalary ?? ""}&maxSalary=${
        maxSalary ?? ""
      }&category=${categoryId ?? ""}&jobType=${jobType ?? ""}`
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleFindJobFilter = createAsyncThunk(
  "job/handleFindJobFilter",
  async ({ data }, { rejectWithValue }) => {
    toast.dismiss();
    console.log(data);
    const response = await GetUrl(
      `all-job?${data}`
      // `all-job?title=${title ?? ""}&city=${city ?? ""}&page=${
      //   pageNumber ?? ""
      // }&limit=${limit ?? ""}&minSalary=${minSalary ?? ""}&maxSalary=${
      //   maxSalary ?? ""
      // }&category=${categoryId ?? ""}&jobType=${jobType ?? ""}`
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleFindJobById = createAsyncThunk(
  "job/handleFindJobById",
  async ({ id }, { rejectWithValue }) => {
    toast.dismiss();
    const response = await GetUrl(`job/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleApplyForJob = createAsyncThunk(
  "job/handleApplyForJob",
  async ({ id, name, email, phone, resume, token, title }, { rejectWithValue }) => {
    toast.dismiss();
    const response = await PostUrl(`apply/job/${id}`, {
      data: { name, email, resumePdf: resume, phone, title },
      headers: { Authorization: token },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

export const handleGetAppliedJobs = createAsyncThunk(
  "job/handleGetAppliedJobs",
  async ({ token }, { rejectWithValue }) => {
    toast.dismiss();
    const response = await GetUrl("apply/job", {
      headers: { Authorization: token },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err?.response?.data);
      });
    return response;
  }
);

const initialState = {
  findJobLoading: false,
  jobs: [],
  error: null,
  totalJobCount: 0,
  currPage: 0,
  totalPages: 0,
  jobTitleKeyword: "",
  locationKeyword: "",
  usersSearch: { jobTitle: "", location: "" },
  findSingleJobLoading: false,
  singleJob: null,
  similarJobs: [],
  applyJobLoading: false,
  appliedJobs: [],
  appliedjobLoading: false,
};

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChangeJobKeyword: (state, { payload }) => {
      state.jobTitleKeyword = payload;
    },
    handleChangeLocationKeyword: (state, { payload }) => {
      state.locationKeyword = payload;
    },
    handleChangeUsersSearch: (state, { payload: { jobTitle, location } }) => {
      if (jobTitle) {
        state.usersSearch = { ...state.usersSearch, jobTitle };
      } else {
        state.usersSearch = { ...state.usersSearch, location };
      }
    },
  },
  extraReducers: (builder) => {
    // find job
    builder.addCase(handleFindJobByKeywords.pending, (state, {}) => {
      state.findJobLoading = true;
      state.error = null;
    });
    builder.addCase(handleFindJobByKeywords.fulfilled, (state, { payload }) => {
      state.findJobLoading = false;
      state.error = null;
      state.jobs = payload?.job;
      state.currPage = payload?.currPage;
      state.totalPages = payload?.totalPages;
      state.totalJobCount = payload?.totalJobCount;
    });
    builder.addCase(handleFindJobByKeywords.rejected, (state, { payload }) => {
      state.findJobLoading = false;
      state.error = payload ?? null;
      state.jobs = [];
      state.currPage = 0;
      state.totalPages = 0;
      state.totalJobCount = 0;
    });
    // find job filter
    builder.addCase(handleFindJobFilter.pending, (state, {}) => {
      state.findJobLoading = true;
      state.error = null;
    });
    builder.addCase(handleFindJobFilter.fulfilled, (state, { payload }) => {
      state.findJobLoading = false;
      state.error = null;
      state.jobs = payload?.job;
      state.currPage = payload?.currPage;
      state.totalPages = payload?.totalPages;
      state.totalJobCount = payload?.totalJobCount;
    });
    builder.addCase(handleFindJobFilter.rejected, (state, { payload }) => {
      state.findJobLoading = false;
      state.error = payload ?? null;
      state.jobs = [];
      state.currPage = 0;
      state.totalPages = 0;
      state.totalJobCount = 0;
    });

    // find job by id
    builder.addCase(handleFindJobById.pending, (state, {}) => {
      state.findSingleJobLoading = true;
      state.error = null;
    });
    builder.addCase(handleFindJobById.fulfilled, (state, { payload }) => {
      state.findSingleJobLoading = false;
      state.error = null;
      state.singleJob = payload?.job;
      state.similarJobs = payload?.similarJobs;
    });
    builder.addCase(handleFindJobById.rejected, (state, { payload }) => {
      state.findSingleJobLoading = false;
      state.error = payload ?? null;
      state.singleJob = null;
      state.similarJobs = [];
    });

    // apply for job
    builder.addCase(handleApplyForJob.pending, (state, {}) => {
      state.applyJobLoading = true;
      state.error = null;
    });
    builder.addCase(handleApplyForJob.fulfilled, (state, { payload }) => {
      state.applyJobLoading = false;
      state.error = null;
    });
    builder.addCase(handleApplyForJob.rejected, (state, { payload }) => {
      state.applyJobLoading = false;
      state.error = payload ?? null;
    });

    // get applied job
    builder.addCase(handleGetAppliedJobs.pending, (state, {}) => {
      state.appliedjobLoading = true;
      state.error = null;
    });
    builder.addCase(handleGetAppliedJobs.fulfilled, (state, { payload }) => {
      state.appliedjobLoading = false;
      state.error = null;
      state.appliedJobs = payload?.appliedJobs;
    });
    builder.addCase(handleGetAppliedJobs.rejected, (state, { payload }) => {
      state.appliedjobLoading = false;
      state.appliedJobs = [];
      state.error = payload ?? null;
    });
  },
});

export const {
  handleChangeJobKeyword,
  handleChangeUsersSearch,
  handleChangeLocationKeyword,
} = JobSlice.actions;

export default JobSlice.reducer;
