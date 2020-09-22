import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle
} from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super();
  }

  com;
  renderDish(dish) {
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
  }

  renderComments(comments) {
    this.com = comments.map((comment) => {
      return (
          <ul key={comment.id} className="list-unstyled">
            <li>{comment.comment}</li>
            <li>
              --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
            </li>
          </ul>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.dish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.props.dish != null ? (
            this.renderComments(this.props.dish.comments)
          ) : (
            this.com = null
          )}
          {this.com != null ? <h4>Comments</h4> : null }
          {this.com}
        </div>
      </div>
    );
  }
}

export default DishDetail;
