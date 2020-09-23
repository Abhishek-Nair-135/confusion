import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

let com, heading;
const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <Card>
        <CardImg src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
};

const RenderComments = ({ dish }) => {
  if (dish != null && dish.comments != null) {
    heading = <h4>Comments</h4>;
    com = dish.comments.map((comment) => {
      return (
        <ul key={comment.id} className="list-unstyled">
          <li>{comment.comment}</li>
          <li>
            --{comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </li>
        </ul>
      );
    });
  } else {
    heading = <div></div>;
    com = <div></div>;
  }

  return (
    <div className="col-12 col-md-5 m-1">
      {heading}
      {com}
    </div>
  );
};

const DishDetail = (props) => {
  return (
    <div className="row">
      <div className="col-12 col-md-5 m-1">
        <RenderDish dish={props.dish} />
      </div>

      <RenderComments dish={props.dish} />
    </div>
  );
};

export default DishDetail;
