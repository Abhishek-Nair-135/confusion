import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <Card onClick={() => props.onClick(dish.id)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay body className="ml-5">
            <CardTitle heading>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    );
  });

  return <div className="row">{menu}</div>;
};

export default Menu;
