import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  handleFindJobByKeywords,
  handleFindJobFilter,
} from "../../redux/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState({});
  const [categories, setCategories] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [allForJobType, setAllForJobType] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [fullTimeBox, setFullTimeBox] = useState(false);
  const [SalaryRange, setSalaryRange] = useState([
    { id: 0, name: "All", selected: false },
    { id: 1, name: "$700 - $1000", selected: false },
    { id: 2, name: "$100 - $1500", selected: false },
    { id: 3, name: "$1500 - $2000", selected: false },
    { id: 4, name: "$3000 or above", selected: false },
  ]);
  const [workPlace, setWorkPlace] = useState([
    { id: 1, name: "All", selected: false },
    { id: 2, name: "Work from office", selected: false },
    { id: 3, name: "Work from home", selected: false },
  ]);
  const [AllData, setAllData] = useState([]);
  const [AllForCategories, setAllForCategories] = useState(false);
  const [AllForCountry, setAllForCountry] = useState(false);

  const dispatch = useDispatch();

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("https://admin.footballrecruitment.eu/api/category")
          .then(({ data }) => {
            const obj = [];
            for (const key in data?.categoryList) {
              obj[key] = { ...data?.categoryList[key], selected: false };
            }
            setCategories(obj);

            const obj1 = [];
            for (const key in data?.countryList) {
              let country = data?.countryList[key];
              obj1[key] = { country, selected: false };
            }
            setCountryList(obj1);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (categoryName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const handleChangeFilterValue = (key, value, checked, categoryId) => {
    if (key == "jobType" && value == "all") {
      if (allForJobType) {
        setAllForJobType(false);
        setPartTime(false);
        setFullTimeBox(false);
      } else {
        setAllForJobType(true);
        setPartTime(true);
        setFullTimeBox(true);
        dispatch(handleFindJobByKeywords({}));
      }
    }
    if (key == "jobType") {
      if (value == "Part time") {
        if (checked) {
          setAllData([...AllData, { jobType: value }]);
          setPartTime(true);
        } else {
          const obj = [];
          for (const val in AllData) {
            if (AllData?.[val]?.[key] != value) {
              obj[val] = AllData[val];
            }
          }
          setAllData(obj);
          setPartTime(false);
        }
      }
      if (value == "Full time") {
        if (checked) {
          setAllData([...AllData, { jobType: value }]);
          setFullTimeBox(true);
        } else {
          const obj = [];
          for (const val in AllData) {
            if (AllData?.[val]?.[key] != value) {
              obj[val] = AllData[val];
            }
          }
          setAllData(obj);
          setFullTimeBox(false);
        }
      }
    }
    if (key == "category") {
      if (value == "all") {
        const arr = [];
        if (checked) {
          for (const key in categories) {
            arr[key] = { ...categories[key], selected: true };
          }
          setAllForCategories(true);
        } else {
          setAllForCategories(false);
          for (const key in categories) {
            arr[key] = { ...categories[key], selected: false };
          }
        }
        setCategories(arr);
        dispatch(handleFindJobByKeywords({}));
      } else {
        const arr = [];
        if (checked) {
          for (const [key, val] of categories.entries()) {
            if (val["name"] == value) {
              arr[key] = { ...val, selected: true };
            } else {
              arr[key] = { ...val };
            }
          }
          setAllData([...AllData, { category: categoryId }]);

          if (arr.every((e) => e.selected === true)) {
            for (const [key, val] of categories.entries()) {
              arr[key] = { ...val, selected: true };
            }
            setAllForCategories(true);
          }
        } else {
          const obj = [];
          for (const val in AllData) {
            if (AllData?.[val]?.[key] != categoryId) {
              obj[val] = AllData[val];
            }
          }
          for (const [key, val] of categories.entries()) {
            if (val["name"] == value) {
              arr[key] = { ...val, selected: false };
            } else {
              arr[key] = { ...val };
            }
          }
          setAllForCategories(false);
          setAllData(obj);
        }
        setCategories(arr);
      }
    }
    if (key == "location") {
      if (value == "all") {
        const arr = [];
        if (checked) {
          for (const key in countryList) {
            arr[key] = { ...countryList[key], selected: true };
          }
          setAllForCountry(true);
        } else {
          setAllForCountry(false);
          for (const key in countryList) {
            arr[key] = { ...countryList[key], selected: false };
          }
        }
        setCountryList(arr);
        dispatch(handleFindJobByKeywords({}));
      } else {
        const arr = [];
        if (checked) {
          for (const [key, val] of countryList.entries()) {
            if (val["country"] == value) {
              arr[key] = { ...val, selected: true };
            } else {
              arr[key] = { ...val };
            }
          }
          setAllData([...AllData, { country: value }]);

          if (arr.every((e) => e.selected === true)) {
            for (const [key, val] of countryList.entries()) {
              arr[key] = { ...val, selected: true };
            }
            setAllForCountry(true);
          }
        } else {
          const obj = [];
          for (const val in AllData) {
            if (AllData?.[val]?.[key] != value) {
              obj[val] = AllData[val];
            }
          }
          for (const [key, val] of countryList.entries()) {
            if (val["country"] == value) {
              arr[key] = { ...val, selected: false };
            } else {
              arr[key] = { ...val };
            }
          }
          setAllForCountry(false);
          setAllData(obj);
        }
        setCountryList(arr);
      }
    }
    if (key == "salary") {
      if (value == "all") {
        const arr = [];
        if (checked) {
          for (const key in SalaryRange) {
            arr[key] = { ...SalaryRange[key], selected: true };
          }
        } else {
          for (const key in SalaryRange) {
            arr[key] = { ...SalaryRange[key], selected: false };
          }
        }
        setSalaryRange(arr);
        dispatch(handleFindJobByKeywords({}));
      } else {
        const arr = [];
        if (checked) {
          for (const [key, val] of SalaryRange.entries()) {
            if (val["name"] == value) {
              if (value.includes("or")) {
                const [minSalary] = value.split("or");
                arr[key] = { ...val, selected: true };
                setAllData([
                  ...AllData,
                  { minSalary: parseInt(minSalary?.replace("$", "")) },
                ]);
              } else {
                const [minSalary, maxSalary] = value.split("-");
                arr[key] = { ...val, selected: true };
                console.log(minSalary, maxSalary);
                setAllData([
                  ...AllData,
                  { maxSalary: parseInt(maxSalary.replace("$", "")) },
                ]);
                setAllData([
                  ...AllData,
                  { minSalary: parseInt(minSalary.replace("$", "")) },
                ]);
              }
            } else {
              arr[key] = { ...val };
            }
          }
          const allDone = arr.filter((e) => e.selected === true);

          if (allDone.length === 4) {
            for (const [key, val] of SalaryRange.entries()) {
              arr[key] = { ...val, selected: true };
            }
          }
          if (arr.every((e) => e.selected === true)) {
            for (const [key, val] of SalaryRange.entries()) {
              arr[key] = { ...val, selected: true };
            }
          }
        } else {
          const obj = [];
          for (const val in AllData) {
            if (AllData?.[val]?.[key] != value) {
              obj[val] = AllData[val];
            }
          }
          for (const [key, val] of SalaryRange.entries()) {
            if (val["name"] == value) {
              arr[key] = { ...val, selected: false };
            } else {
              arr[key] = { ...val };
            }
          }
          setAllData(obj);
        }
        setSalaryRange(arr);
      }
    }
    if (key == "workPlace") {
      if (value == "all") {
        const arr = [];
        if (checked) {
          for (const key in workPlace) {
            arr[key] = { ...workPlace[key], selected: true };
          }
        } else {
          for (const key in workPlace) {
            arr[key] = { ...workPlace[key], selected: false };
          }
        }
        setWorkPlace(arr);
        dispatch(handleFindJobByKeywords({}));
      } else {
        const arr = [];
        if (checked) {
          for (const [key, val] of workPlace.entries()) {
            if (val["name"].toLocaleLowerCase() == value) {
              arr[key] = { ...val, selected: true };
            } else {
              arr[key] = { ...val };
            }
          }
          setAllData([...AllData, { workPlace: value }]);

          const allDone = arr.filter((e) => e.selected === true);

          if (allDone.length === 2) {
            for (const [key, val] of workPlace.entries()) {
              arr[key] = { ...val, selected: true };
            }
          }
        } else {
          const obj = [];
          for (const val in AllData) {
            if (AllData?.[val]?.[key] != value) {
              obj[val] = AllData[val];
            }
          }
          const allDone = arr.filter((e) => e.selected === true);

          if (allDone.length < 2) {
            for (const [key, val] of workPlace.entries()) {
              if (val["name"] === "All") {
                arr[key] = { ...val, selected: false };
              } else {
                arr[key] = { ...val };
              }
            }
          }
          for (const [key, val] of workPlace.entries()) {
            if (val["name"].toLocaleLowerCase() == value) {
              arr[key] = { ...val, selected: false };
            } else {
              arr[key] = { ...val };
            }
          }
          setAllData(obj);
        }
        setWorkPlace(arr);
      }
    }
  };

  useEffect(() => {
    let para = "";
    for (const [key, value] of AllData.entries()) {
      if (value && value["jobType"]) {
        para += `&jobType=${value["jobType"]}`;
      } else if (value && value["category"]) {
        para += `&category=${value["category"]}`;
      } else if (value && value["country"]) {
        para += `&country=${value["country"]}`;
      } else if (value && value["minSalary"]) {
        para += `&minSalary=${value["minSalary"]}`;
      } else if (value && value["maxSalary"]) {
        para += `&maxSalary=${value["maxSalary"]}`;
      } else if (value && value["workPlace"]) {
        para += `&workPlace=${value["workPlace"]}`;
      }
    }

    dispatch(handleFindJobFilter({ data: para }));
  }, [AllData]);

  return (
    <div className="md:w-[30%] lg:w-[20%] w-full mx-auto space-y-5 ">
      {/* type of employment */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3 items-center justify-between">
            <h1 className="xl:text-base text-sm font-bold text-[#25324B]">
              Type of Employment
            </h1>
            <div
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => handleToggle("Type of Employment")}
            >
              {isOpen["Type of Employment"] ? (
                <IoIosArrowUp className="text-xl cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-xl cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        {isOpen["Type of Employment"] && (
          <div className="space-y-3">
            <ul className="ml-4 space-y-3">
              <li className="text-[#515B6F] text-sm">
                <label>
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={allForJobType}
                    style={{ accentColor: "#004D7F" }}
                    onClick={() => {
                      handleChangeFilterValue("jobType", "all");
                    }}
                  />
                  All
                </label>
              </li>
              <li className="text-[#515B6F] text-sm">
                <label>
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={partTime}
                    style={{ accentColor: "#004D7F" }}
                    onChange={(e) => {
                      if (fullTimeBox && e.target.checked) {
                        setAllForJobType(true);
                        dispatch(handleFindJobByKeywords({}));
                      }
                      handleChangeFilterValue(
                        "jobType",
                        "Part time",
                        e.target.checked
                      );
                    }}
                  />
                  Part time
                </label>
              </li>
              <li className="text-[#515B6F] text-sm">
                <label>
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={fullTimeBox}
                    style={{ accentColor: "#004D7F" }}
                    onChange={(e) => {
                      if (partTime && e.target.checked) {
                        setAllForJobType(true);
                        dispatch(handleFindJobByKeywords({}));
                      }
                      handleChangeFilterValue(
                        "jobType",
                        "Full time",
                        e.target.checked
                      );
                    }}
                  />
                  Full time
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* categories */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3 items-center justify-between">
            <h1 className="xl:text-base text-sm font-bold text-[#25324B]">
              Categories
            </h1>
            <div
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => handleToggle("Categories")}
            >
              {isOpen["Categories"] ? (
                <IoIosArrowUp className="text-xl cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-xl cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        {isOpen["Categories"] && (
          <div className="space-y-3">
            <ul className="ml-4 space-y-3">
              <li className="text-[#515B6F] text-sm">
                <label>
                  <input
                    type="checkbox"
                    className="mr-4"
                    style={{ accentColor: "#004D7F" }}
                    checked={AllForCategories}
                    onChange={(e) =>
                      handleChangeFilterValue(
                        "category",
                        "all",
                        e.target.checked
                      )
                    }
                  />
                  All
                </label>
              </li>
              {categories &&
                categories.map((category) => (
                  <li key={category?._id} className="text-[#515B6F] text-sm">
                    <label>
                      <input
                        type="checkbox"
                        className="mr-4"
                        style={{ accentColor: "#004D7F" }}
                        checked={category?.selected}
                        onChange={(e) =>
                          handleChangeFilterValue(
                            "category",
                            category?.name,
                            e.target.checked,
                            category?._id
                          )
                        }
                      />
                      {category?.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {/* location */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3 items-center justify-between">
            <h1 className="xl:text-base text-sm font-bold text-[#25324B]">
              Location
            </h1>
            <div
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => handleToggle("Location")}
            >
              {isOpen["Location"] ? (
                <IoIosArrowUp className="text-xl cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-xl cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        {isOpen["Location"] && (
          <div className="space-y-3">
            <ul className="ml-4 space-y-3">
              <li className="text-[#515B6F] text-sm">
                <label>
                  <input
                    type="checkbox"
                    className="mr-4"
                    style={{ accentColor: "#004D7F" }}
                    checked={AllForCountry}
                    onChange={(e) =>
                      handleChangeFilterValue(
                        "location",
                        "all",
                        e.target.checked
                      )
                    }
                  />
                  All
                </label>
              </li>
              {countryList &&
                countryList.map((country, index) => (
                  <li key={index} className="text-[#515B6F] text-sm">
                    <label>
                      <input
                        type="checkbox"
                        className="mr-4"
                        style={{ accentColor: "#004D7F" }}
                        checked={country?.selected}
                        onChange={(e) =>
                          handleChangeFilterValue(
                            "location",
                            country?.country,
                            e.target.checked
                          )
                        }
                      />
                      {country?.country}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {/* salary range */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3 items-center justify-between">
            <h1 className="xl:text-base text-sm font-bold text-[#25324B]">
              Salary range
            </h1>
            <div
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => handleToggle("Salary range")}
            >
              {isOpen["Salary range"] ? (
                <IoIosArrowUp className="text-xl cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-xl cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        {isOpen["Salary range"] && (
          <div className="space-y-3">
            <ul className="ml-4 space-y-3">
              {SalaryRange &&
                SalaryRange.map((salary) => (
                  <li key={salary?._id} className="text-[#515B6F] text-sm">
                    <label>
                      <input
                        type="checkbox"
                        className="mr-4"
                        style={{ accentColor: "#004D7F" }}
                        checked={salary?.selected}
                        onChange={(e) => {
                          handleChangeFilterValue(
                            "salary",
                            salary?.name.toLocaleLowerCase(),
                            e.target.checked
                          );
                        }}
                      />
                      {salary?.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {/* work space */}
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex gap-3 items-center justify-between">
            <h1 className="xl:text-base capitalize text-sm font-bold text-[#25324B]">
              work place
            </h1>
            <div
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => handleToggle("work place")}
            >
              {isOpen["work place"] ? (
                <IoIosArrowUp className="text-xl cursor-pointer" />
              ) : (
                <IoIosArrowDown className="text-xl cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        {isOpen["work place"] && (
          <div className="space-y-3">
            <ul className="ml-4 space-y-3">
              {workPlace &&
                workPlace.map((place) => (
                  <li key={place?._id} className="text-[#515B6F] text-sm">
                    <label>
                      <input
                        type="checkbox"
                        className="mr-4"
                        style={{ accentColor: "#004D7F" }}
                        checked={place?.selected}
                        onChange={(e) =>
                          handleChangeFilterValue(
                            "workPlace",
                            place?.name.toLocaleLowerCase(),
                            e.target.checked
                          )
                        }
                      />
                      {place?.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* {categories.map((category) => {
        return (
          <>
            <div className="space-y-4">
              <div key={""} className="space-y-3">
                <div className="flex gap-3 items-center justify-between">
                  <h1 className="xl:text-base text-sm font-bold text-[#25324B]">
                    {category.name}
                  </h1>
                  <div
                    role="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggle(category.name)}
                  >
                    {isOpen[category.name] ? (
                      <IoIosArrowUp className="text-xl cursor-pointer" />
                    ) : (
                      <IoIosArrowDown className="text-xl cursor-pointer" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isOpen[category.name] && (
              <div className="space-y-3">
                {category.subcategories.map((subcategory) => (
                  <ul className="ml-4 space-y-3" key={subcategory.id}>
                    <li className="text-[#515B6F] text-sm">
                      <label>
                        <input
                          type="checkbox"
                          className="mr-4"
                          style={{ accentColor: "#004D7F" }}
                          checked={
                            subcategory.name === "All"
                              ? selectedSubcategories[category.name]?.All
                              : selectedSubcategories[category.name]?.[
                                  subcategory.name
                                ]
                          }
                          onChange={() =>
                            handleSubcategoryChange(
                              category.name,
                              subcategory.name,
                              subcategory.id
                            )
                          }
                        />
                        {subcategory.name}
                      </label>
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </>
        );
      })} */}
    </div>
  );
};

export default SideBar;