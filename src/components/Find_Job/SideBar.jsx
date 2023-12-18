import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { handleFindJobByKeywords } from "../../redux/JobSlice";
import { useDispatch } from "react-redux";

const categoriesList = [
  {
    id: 1,
    name: "Type of Employment",
    subcategories: [
      { id: 1, name: "All" },
      { id: 2, name: "Full Time" },
      { id: 3, name: "Part Time" },
    ],
  },
  {
    id: 2,
    name: "Categories",
    subcategories: [],
  },
  {
    id: 3,
    name: "Location",
    subcategories: [],
  },
  {
    id: 4,
    name: "SalaryRange",
    subcategories: [
      { id: 1, name: "$700 - $1000" },
      { id: 2, name: "$100 - $1500" },
      { id: 3, name: "$1500 - $2000" },
      { id: 4, name: "$3000 or above" },
    ],
  },
  {
    id: 5,
    name: "Work place",
    subcategories: [
      { id: 1, name: "All" },
      { id: 2, name: "Work from office" },
      { id: 3, name: "Work from home" },
    ],
  },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [apiData, setApiData] = useState(null);
  const [categories, setCategories] = useState(categoriesList);
  const [loading, setLoading] = useState(false);
  const [categoryListData, setCategoryListData] = useState("");

  const dispatch = useDispatch();

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://football-recruitment.onrender.com/api/category"
        );
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update "Categories" subcategories
    if (apiData && apiData.success) {
      const categoriesIndex = categories.findIndex(
        (category) => category.name === "Categories"
      );

      if (categoriesIndex !== -1) {
        const newCategories = [...categories];
        newCategories[categoriesIndex].subcategories = [
          { id: 1, name: "All" },
          ...apiData.categoryList.map((category) => ({
            id: category._id,
            name: category.name,
          })),
        ];

        setCategories(newCategories);
      }
    }

    // Update "Location" subcategories
    if (apiData && apiData.success) {
      const locationIndex = categories.findIndex(
        (category) => category.name === "Location"
      );

      if (locationIndex !== -1) {
        const newCategories = [...categories];
        newCategories[locationIndex].subcategories = [
          { id: 1, name: "All" },
          ...apiData.countryList.map((country) => ({
            id: country,
            name: country,
          })),
        ];

        setCategories(newCategories);
      }
    }
  }, [apiData]);

  const handleSubcategoryChange = (
    categoryName,
    subcategoryName,
    categoryId
  ) => {
    setSelectedSubcategories((prevState) => {
      const updatedState = {
        ...prevState,
        [categoryName]: { ...prevState[categoryName] },
      };

      if (subcategoryName === "All") {
        // If "All" is selected, toggle "All" and all subcategories
        updatedState[categoryName].All = !prevState[categoryName]?.All;

        categories
          .find((category) => category.name === categoryName)
          .subcategories.slice(1)
          .forEach((subcategory) => {
            updatedState[categoryName][subcategory.name] =
              updatedState[categoryName].All;
          });
      } else {
        // If a specific subcategory is selected, toggle its state
        updatedState[categoryName][subcategoryName] =
          !prevState[categoryName]?.[subcategoryName];

        // Check if all subcategories are selected and update "All" accordingly
        const areAllSubcategoriesSelected = categories
          .find((category) => category.name === categoryName)
          .subcategories.slice(1)
          .every(
            (subcategory) =>
              updatedState[categoryName][subcategory.name] ||
              subcategory.name === "All"
          );

        updatedState[categoryName].All = areAllSubcategoriesSelected;
      }
      setCategoryListData(updatedState);
      console.log(updatedState, "updated state");
      return updatedState;
    });
  };
  console.log(categoriesList?.name?.subcategories);
  const handleToggle = (categoryName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const hanldeFindJob = (e) => {
    // e.preventDefault();
    setLoading(true);
    const response = dispatch(
      handleFindJobByKeywords({
        jobType: "Full Time",
        categoryId: "656479f6cd928452f66dd672",
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          setLoading(false);
          // navigate("/current-vacancies");
        }
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    hanldeFindJob();
  },[]);
  return (
    <div className="md:w-[30%] lg:w-[20%] w-full mx-auto space-y-5 ">
      {categories.map((category) => {
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
              <>
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
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default SideBar;
