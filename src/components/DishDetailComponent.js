import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button, Col, Label, Modal, ModalBody, ModalHeader, Row
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Errors, LocalForm } from "react-redux-form";

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

const RenderComments = ({ comments, addComment, dishId }) => {
  if (comments != null) {
    heading = <h4>Comments</h4>;
    com = comments.map((comment) => {
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
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
};

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="col-12">
        <h3>{props.dish.name}</h3>
        <hr />
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
      </div>
    </div>
  );
};

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      })
  }

  handleSubmit(values){
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                  <Col>
                  <Label htmlFor="rating">Rating</Label>
                      <Control.select model=".rating" name="rating"
                          className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Control.select>
                  </Col>
              </Row>
              <Row className="form-group">
                  <Col>
                  <Label htmlFor="author">Your Name</Label>
                      <Control.text model=".author" id="author" name="author"
                          placeholder="Your Name"
                          className="form-control"
                          validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                          }}
                            />
                        <Errors
                            className="text-danger"
                            show="touched"
                            model=".author"
                            messages={{
                              required: 'Required',
                              minLength: 'Should have a minimum 3 characters',
                              maxLength: 'Should have a maximum 15 characters'
                            }} />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Col>
                  <Label htmlFor="comment">Comment</Label>
                      <Control.textarea rows="6" model=".comment" id="comment" name="comment"
                        placeholder="Your Comment Here"
                        className="form-control"
                        />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Col md={{size:10}}>
                      <Button type="submit" color="primary">
                      Submit
                      </Button>
                  </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default DishDetail;