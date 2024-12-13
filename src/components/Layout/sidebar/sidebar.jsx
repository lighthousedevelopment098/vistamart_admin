import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { sidebarItems as allSidebarItems } from "./sideBarData";
import { BsDot } from "react-icons/bs";
import { getAuthData } from "../../../utils/authHelper"; // Import function to get token

// Function to format module names for display
const formatModuleName = (moduleName) => {
  if (!moduleName) return ""; // Prevent errors if moduleName is undefined
  return moduleName
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const Sidebar = ({ toggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sidebarItems, setSidebarItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the user data
  const { token, user } = useMemo(() => getAuthData(), []); // Empty array to ensure it only runs once

  useEffect(() => {
    if (!user || !user.role || !user.role.modules) return;
    // console.log("User modules:", user.role.modules);
    // console.log("Sidebar item keys:", allSidebarItems.map(item => item.key));

    const role = user.role.name || "admin";

    // Filter items based on user modules
    const filteredItems = allSidebarItems.filter(
      (item) => item.key && user.role.modules.includes(item.key)
    );

    // Format titles and set state
    const formattedItems = filteredItems.map((item) => ({
      ...item,
      title: formatModuleName(item.key),
    }));

    // console.log("Filtered Items:", formattedItems);
    setSidebarItems(formattedItems);
  }, [user]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // console.log("sidebar itemss====", sidebarItems)
  // Filtering sidebar items based on search term
  const filteredSidebarItems = sidebarItems.filter((item) => {
    const searchQuery = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchQuery) ||
      (item.subItems &&
        item.subItems.some((subItem) =>
          subItem.title.toLowerCase().includes(searchQuery)
        ))
    );
  });

  return (
    <aside className="bg-primary-500 text-white w-64 min-h-screen top-0 p-4 flex flex-col fixed left-0 h-full overflow-y-scroll">
      {/* Search Box */}
      <div className="sticky top-0 bg-primary-500 pt-6 pb-4 z-10">
        <input
          type="text"
          className="ml-2 p-2 bg-primary-500 border mt-12 text-white border-white rounded-md focus:outline-none w-full placeholder-white"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
        />
      </div>

      {/* Sidebar Items */}
      {filteredSidebarItems.map((item, index) => (
        <div key={index} className="mt-2">
          {item.isDropdown ? (
            <>
              <h1 className="text-gray-300 mb-2 mt-3">{item.SubHeading}</h1>
              <button
                className="w-full text-left p-2 rounded hover:bg-primary-dark-500 text-white flex justify-between"
                onClick={() => toggleDropdown(index)}
                style={{ color: "white" }}
              >
                <div className="flex items-center gap-2 m-0">
                  {item.icon} {item.title}
                </div>
                <span>
                  {activeDropdown === index ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </button>
              <ul
                className={`ml-2 transition-all duration-300 ease-in-out overflow-hidden ${
                  activeDropdown === index
                    ? "max-h-80 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={subItem.link}
                      className="w-full m-0 flex items-center text-left p-1 pl-4 rounded hover:bg-primary-dark-500 text-white"
                      onClick={toggleSidebar}
                      style={{ color: "white" }}
                    >
                      <span>
                        <BsDot className="font-bold text-[1rem]" />
                      </span>{" "}
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h1 className="text-gray-300 p">{item.SubHeading}</h1>
              <Link
                to={item.link}
                className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-primary-dark-500 text-white"
                onClick={toggleSidebar}
                style={{ color: "white" }}
              >
                {item.icon} {item.title}
              </Link>
            </>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
