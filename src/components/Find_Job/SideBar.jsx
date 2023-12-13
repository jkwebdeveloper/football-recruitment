import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const categories = [
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
    subcategories: [
      { id: 1, name: "All" },
      { id: 2, name: "Analyst" },
      { id: 3, name: "Academy" },
      { id: 4, name: "Leadership & Management" },
      { id: 5, name: "Technology" },
      { id: 6, name: "Coaching" },
      { id: 7, name: "Data Science" },
      { id: 8, name: "Digital" },
    ],
  },
  {
    id: 3,
    name: "Location",
    subcategories: [
      { id: 1, name: "All" },
      { id: 2, name: "London" },
      { id: 3, name: "Canada" },
      { id: 4, name: "New York" },
      { id: 5, name: "France" },
    ],
  },
  {
    id: 4,
    name: "Salary Range",
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

  const handleSubcategoryChange = (categoryName, subcategoryName) => {
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
      // console.log(updatedState, "updated state");
      return updatedState;
    });
  };

  const handleToggle = (categoryName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

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
                                subcategory.name
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
