import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeComponent from "./HomeComponent";
import SubBar from "./SubBar";

const Folder = () => {
  const [folders, setFolders] = useState([]);

  const fetchFolders = async () => {
    try {
      const tokenString = localStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `http://localhost:3000/api/`,
        { headers: { Authorization: token } }
      );
      console.log("Fetched data:", response.data);
      if (Array.isArray(response.data)) {
        setFolders(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
        setFolders([]); // Ensure folders is an array
      }
    } catch (error) {
      console.error("Failed to fetch folders:", error);
      setFolders([]); // Ensure folders is an array on error
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const createFolderHandler = async () => {
    const tokenString = localStorage.getItem("token");
    const token = JSON.parse(tokenString);
   

    const folderName = prompt("Enter folder name:");
    if (!folderName) return;

    try {
      const response = await axios.post("http://localhost:3000/api/folders", {
        name: folderName,
      }, { headers: { Authorization: token } });
      setFolders([...folders, response.data]);
      console.log(response.data);
      console.log(folders);
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  return (
    <div>
      <SubBar createFolderHandler={createFolderHandler} />
      <HomeComponent folders={folders} />
    </div>
  );
};

export default Folder;
