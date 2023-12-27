import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeJobKeyword,
  handleChangeLocationKeyword,
  handleChangeUsersSearch,
  handleFindJobByKeywords,
} from "../../redux/JobSlice";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/BG-white.png";
import Header from "../Header";

function FindMyForm({ from }) {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { findJobLoading, jobTitleKeyword, locationKeyword, usersSearch } =
    useSelector((s) => s.root.job);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchJob = () => {
    axios
      .get(
        `https://admin.footballrecruitment.eu/api/autocomplete/title?title=${jobTitleKeyword}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err?.response);
      });
  };

  const handleSearchLocation = () => {
    axios
      .get(
        `https://admin.footballrecruitment.eu/api/autocomplete/city?city=${locationKeyword}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err?.response);
      });
  };

  const handleSuggestionClick = (suggestion) => {
    if (jobTitleKeyword !== "") {
      dispatch(handleChangeUsersSearch({ jobTitle: suggestion }));
      dispatch(handleChangeJobKeyword(""));
    } else {
      dispatch(handleChangeUsersSearch({ location: suggestion }));
      dispatch(handleChangeLocationKeyword(""));
    }
    setSearchResult([]); // Clear suggestions after clicking on a suggestion
  };

  const hanldeFindJob = (e) => {
    e.preventDefault();
    if (usersSearch?.jobTitle === "" || usersSearch?.location === "") {
      toast.remove();
      return toast.error("Please fill information");
    }
    setLoading(true);
    const response = dispatch(
      handleFindJobByKeywords({
        title: usersSearch.job,
        city: usersSearch?.location,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          setLoading(false);
          navigate("/current-vacancies");
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (jobTitleKeyword.trim() !== "") {
      if (usersSearch?.jobTitle !== "") {
        dispatch(handleChangeUsersSearch({ jobTitle: ""}));
      }
      handleSearchJob();
    } else {
      setSearchResult([]); // Clear suggestions if the input is empty
    }
  }, [jobTitleKeyword]);

  useEffect(() => {
    if (locationKeyword.trim() !== "") {
      if (usersSearch?.location !== "") {
        dispatch(handleChangeUsersSearch({ location: "" }));
      }
      handleSearchLocation();
    } else {
      setSearchResult([]); // Clear suggestions if the input is empty
    }
  }, [locationKeyword]);

  // console.log(usersSearch);

  if (from == "current_vacany") {
    return (
      <div
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative"
      >
        <Header />
        <div className="flex justify-center items-center min-h-[80vh] w-full">
          <div className="flex items-center   flex-col gap-y-4 lg:p-[4.5rem] p-2 md:w-[60%] lg:w-[80%] xl:w-[70%] w-11/12 rounded-2xl">
            <span className="text-white xl:text-4xl text-xl  font-semibold">
              Find job
            </span>
            <p className="lg:w-7/12 text-center text-[14px] text-white">
              Search and find your dream job is now easier than ever you just
              browse and find job if you need it{" "}
            </p>

            <form
              onSubmit={hanldeFindJob}
              className="bg-white rounded-lg flex justify-around items-center gap-2 lg:flex-row lg:w-full flex-col w-full px-3 py-4"
            >
              <div className="gap-3 flex items-center w-full">
                <IoIosSearch className="text-2xl" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="outline-none"
                  value={
                    jobTitleKeyword ? jobTitleKeyword : usersSearch.jobTitle
                  }
                  onChange={(e) =>
                    dispatch(handleChangeJobKeyword(e.target.value))
                  }
                />
              </div>
              <div className="gap-3 flex items-center w-full">
                <IoLocationOutline className="text-2xl" />
                <input
                  type="text"
                  placeholder="Select location work"
                  className="outline-none"
                  value={
                    locationKeyword ? locationKeyword : usersSearch.location
                  }
                  onChange={(e) =>
                    dispatch(handleChangeLocationKeyword(e.target.value))
                  }
                />
              </div>
              <button
                type="submit"
                className="blue_button px-4 w-full hover:bg-blue_button/80 active:scale-90 transition"
                disabled={findJobLoading || loading}
              >
                {loading ? "Finding..." : "Find Job"}
              </button>
            </form>
            <div className="space-y-4 w-full">
              {/* {findJobLoading && <span>Loading...</span>} */}
              {searchResult.length > 0 && (
                <div className="suggestions bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-lg p-3 space-y-3 px-6 cursor-pointer w-full">
                  {searchResult.map((item, index) => (
                    <div
                      onClick={() => handleSuggestionClick(item)}
                      key={index}
                    >
                      <div className="suggestion-item">{item}</div>
                      <hr className="mt-1" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="bg-white flex items-center relative  flex-col gap-y-4 lg:p-[1.5rem] p-4 md:w-[60%] lg:w-[70%] xl:w-[60%] w-11/12 rounded-2xl">
          <img
            src={require("../../assets/Pattern.png")}
            alt=""
            className="absolute lg:block hidden -right-12 top-8 w-20"
          />
          <span className="lg:text-[30px] 2xl:text-[42px] text-lg">
            Discover your <b className="title_blue">Dream Job</b>{" "}
          </span>
          <p className="lg:w-7/12 text-center text-[14px] text-slate-400">
            Search and find your dream job is now easier than ever you just
            browse and find job if you need it{" "}
          </p>

          <form
            onSubmit={hanldeFindJob}
            className="shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-lg flex justify-around items-center gap-2 xl:flex-row xl:w-full flex-col w-full px-3 py-4"
          >
            <div className="gap-3 flex items-center w-full">
              <IoIosSearch className="text-2xl" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="outline-none"
                value={jobTitleKeyword ? jobTitleKeyword : usersSearch.jobTitle}
                onChange={(e) =>
                  dispatch(handleChangeJobKeyword(e.target.value))
                }
              />
            </div>
            <div className="gap-3 flex items-center w-full">
              <IoLocationOutline className="text-2xl" />
              <input
                type="text"
                placeholder="Select location work"
                className="outline-none text-sm"
                value={locationKeyword ? locationKeyword : usersSearch.location}
                onChange={(e) =>
                  dispatch(handleChangeLocationKeyword(e.target.value))
                }
              />
            </div>
            <button
              type="submit"
              className="blue_button px-4 w-full hover:bg-blue_button/80 active:scale-90 transition"
              disabled={findJobLoading || loading}
            >
              {loading ? "Finding..." : "Find Job"}
            </button>
          </form>
          <div className="space-y-4 w-full">
            {/* {loading && <span>Loading...</span>} */}
            {searchResult.length > 0 && (
              <div className="suggestions shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-lg p-3 space-y-3 px-6 cursor-pointer w-full">
                {searchResult.map((item, index) => (
                  <div onClick={() => handleSuggestionClick(item)} key={index}>
                    <div className="suggestion-item">{item}</div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-5">
            <img
              src={require("../../assets/Pattern.png")}
              alt=""
              className="absolute bottom-7 lg:block hidden -left-14 w-20"
            />
          </div>
        </div>
      </>
    );
  }
}

export default FindMyForm;
