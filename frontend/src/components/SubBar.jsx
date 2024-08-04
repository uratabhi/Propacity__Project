import React from "react";


const SubBar = ({ createFolderHandler }) => {
  return (
    <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2 px-5">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item mx-2">
          <button className="btn btn-outline-dark">Upload File</button>
        </li>
        <li className="nav-item mx-2">
          <button className="btn btn-outline-dark" onClick={createFolderHandler}>
            Create Folder
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubBar;
