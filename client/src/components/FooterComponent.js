import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/aboutus">About Us</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/contactus">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address>
                        920, Elm Avenue<br />
                        Windsor, ON<br />
                        Canada N9A 5H5<br />
                        <i className="fa fa-phone fa-lg"></i>: +647-540-2989<br />
                        <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:indiancuisine@food.ca">
                        indiancuisine@food.ca</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-facebook" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/sheshanpatel23/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-github" href="https://github.com/sheshan23/Restaurant-Management-Front-End" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:indiancuisine@food.ca"><i className="fa fa-envelope-o" target="_blank" rel="noopener noreferrer"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2020 The Indian Cuisine</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;