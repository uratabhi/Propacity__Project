import React from "react";
import ShowItems from "./ShowItems";

const HomeComponent = ({ folders }) => {
  return (
    <div className="container my-5">
      <ShowItems title="Created Folders" items={folders} />
    </div>
  );
};

export default HomeComponent;
