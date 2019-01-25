import React from 'react';

import './ProductDetails.css';

const ProductDetails = props => {
  const { title, description } = props.details;
  return (
    <div className="modal__container">
      <div className="modal__title"> {title}</div>
      <div className="modal__body">
        <p> {description}</p>
      </div>
      <div className="modal__footer">
        <button onClick={props.handleClick}> close </button>
      </div>
    </div>
  );
};

export default ProductDetails;
