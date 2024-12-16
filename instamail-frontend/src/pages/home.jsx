import React, { useState, useEffect } from "react";
import TopBar from "../components/HomePageComponents/TopBar";
import Sidebar from "../components/HomePageComponents/Sidebar/Sidebar";
import HomePageBody from "../components/HomePageComponents/HomePageBody";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { token } = useAppContext();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Inbox");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);

  const openContactsModal = () => setIsContactsModalOpen(true);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false); // State for Add Folder Modal
  const handleAddFolderClick = () => {
    setIsAddFolderModalOpen(true); // Open Add Folder Modal
  };


  return (
    <div className="h-screen flex flex-col">
      <TopBar toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          openContactsModal={openContactsModal}
          onAddFolderClick={handleAddFolderClick}
        />

        <HomePageBody
          activeCategory={activeCategory}
          isContactsModalOpen={isContactsModalOpen}
          setIsContactsModalOpen={setIsContactsModalOpen}
          setIsAddFolderModalOpen={setIsAddFolderModalOpen}
          isAddFolderModalOpen={isAddFolderModalOpen}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </div>
  );
};

export default Home;
