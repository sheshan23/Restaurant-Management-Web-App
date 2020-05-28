import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button , 
    Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    function RenderDish({dish}) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments}) {
        const comment = comments.map((c) => {
            return(
                <div key={c.id}>
                    <ul class="list-unstyled">
                        <li>
                            <p>{c.comment}</p>
                            <p>-- {c.author},
                            &nbsp; 
                            {new Intl.DateTimeFormat('en-US', 
                                { year: 'numeric', 
                                    month: 'short', 
                                    day: '2-digit'
                                }).format(new Date(Date.parse(c.date)))}
                            </p>
                        </li>
                    </ul>
                </div>
            );
        })
        if (comments!=null)
            return(
                <div>
                    <h4>Comments</h4>
                    {comment}
                    <CommentForm />
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    class CommentForm extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                isModalOpen : false
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState ({
                isModalOpen : !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            this.toggleModal();
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
        }

        render() {
            return(
                <div>
                    <Button onClick={this.toggleModal} className="btn btn-light border-dark"><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label md={12}>Rating</Label>
                                    <Col className="md-auto">
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
                                    <Label htmlFor="yourname" md={12}>Your Name</Label>
                                    <Col className="md-auto">
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={12}>Comment</Label>
                                    <Col className="md-auto">
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6" 
                                            className="form-control"/>
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }

    const DishDetail = (props) => {

        if (props.dish==null) {
            return(
                <div></div>
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail;