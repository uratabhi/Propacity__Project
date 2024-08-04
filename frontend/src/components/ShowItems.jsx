import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { FaFolder, FaEdit } from 'react-icons/fa';
import axios from 'axios';

const ShowItems = ({ title, items = [], refreshItems }) => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleItemDoubleClick = (item) => {
    navigate(`/create-subfolder/${item.id}`);
  };

  const handleRenameClick = (item) => {
    setCurrentItem(item);
    setNewName(item.name);
    setShowRenameModal(true);
  };

  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenString = localStorage.getItem("token");
      const token = JSON.parse(tokenString); // Ensure this is correctly parsed

      // Add Bearer prefix for Authorization header
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `${token}` // Correctly formatted Authorization header
        },
      };

      await axios.put(
        `http://localhost:3000/api/folder/${currentItem.id}`,
        { name: newName },
        config
      );

      // Call refreshItems to update the folder list
      refreshItems();
      setShowRenameModal(false);
    } catch (error) {
      console.error('Error renaming folder:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom mb-4 pb-2">{title}</h4>
      <div className="row gap-4 p-4">
        {items.map((item, index) => (
          <div key={index * 55} className="col-md-3">
            <Card
              className="shadow-sm border-0 cursor-pointer hover-effect position-relative"
              onDoubleClick={() => handleItemDoubleClick(item)}
              style={{ transition: 'transform 0.3s' }}
            >
              <Card.Body className="text-center">
                <FaFolder size={50} color="#007bff" />
                <h5 className="mt-2">{item.name}</h5>
                <Button
                  variant="link"
                  className="position-absolute top-0 end-0 mt-2 me-2 text-primary"
                  onClick={() => handleRenameClick(item)}
                >
                  <FaEdit size={20} />
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRenameSubmit}>
            <Form.Group controlId="formBasicNewName">
              <Form.Label>New Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new folder name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Rename
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShowItems;
