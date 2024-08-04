// src/components/CreateSubFolder.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import SubBar from './SubBar';

const CreateSubFolder = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [subfolders, setSubfolders] = useState([]);
  const navigate = useNavigate();

  const fetchSubfolders = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authToken'));
      const response = await axios.get(`http://localhost:3000/folder/subfolders/${id}`, {
        headers: { Authorization: token }
      });
      setSubfolders(response.data);
    } catch (error) {
      console.error('Error fetching subfolders:', error);
    }
  };

  useEffect(() => {
    fetchSubfolders();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('authToken'));
      await axios.post(
        'http://localhost:3000/folder/createSubFolder',
        { parentId: id, name },
        { headers: { Authorization: token } }
      );
      setName('');
      fetchSubfolders(); // Re-fetch subfolders after creating a new one
    } catch (error) {
      console.error('Error creating subfolder:', error);
    }
  };

  return (
      <>
      <Navbar/>
      <SubBar/>
      </>
  );
};

export default CreateSubFolder;
