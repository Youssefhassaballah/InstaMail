import React, { useState, useEffect } from "react";
import TopBar from "../components/HomePageComponents/TopBar";
import Sidebar from "../components/HomePageComponents/Sidebar/Sidebar";
import HomePageBody from "../components/HomePageComponents/HomePageBody";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { deleteFolder } from "../services/folderService";

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

  const handleDeleteFolder = async (folderName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the folder "${folderName}"?`
    );

    if (confirmDelete) {
      try {
        await deleteFolder(folderName);

        // Reset to Inbox if the deleted folder was active
        if (activeCategory === folderName) {
          setActiveCategory("Inbox");
        }

        // Refresh folders list
        // You might want to add a function to fetch and update folders
        // await refreshFolders();
      } catch (error) {
        console.error("Failed to delete folder:", error);
        alert("Failed to delete folder. Please try again.");
      }
    }
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
          onAddFolderClick={handleAddFolderClick} // Pass the handler to the Sidebar
        />

        <HomePageBody
          activeCategory={activeCategory}
          isContactsModalOpen={isContactsModalOpen}
          setIsContactsModalOpen={setIsContactsModalOpen}
          onDeleteFolder={handleDeleteFolder}
          setIsAddFolderModalOpen={setIsAddFolderModalOpen}
          isAddFolderModalOpen={isAddFolderModalOpen}
        />
      </div>

      
    </div>
  );
};

export default Home;
