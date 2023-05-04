import React from "react";
import '../Styles/Spinner.css'

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: blue;
// `;

const PageLoader = () => {
    
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
  );
};

export default PageLoader;