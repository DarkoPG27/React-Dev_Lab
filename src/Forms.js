import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './registration.css';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: ""
            },
            confirmPassword: "",
            validated: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.name, event.target.value);
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [event.target.name]: event.target.value
            }
        }));
    };

    handleSubmit(evt) {
        const form = evt.currentTarget;
        if (form.checkValidity() === false) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        this.setState({ validated: true })

        if (this.state.user.password !== this.state.confirmPassword) {
            evt.preventDefault();
            evt.stopPropagation();
            alert("Paswords does not matches")
        }
        if (form.checkValidity() === true && (this.state.user.password === this.state.confirmPassword)) {
            fetch("https://jsonblob.com/api/jsonBlob", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    redirect: "follow"
                },
                body: JSON.stringify(this.state.user)
            })
                .then(function (response) {
                    let blobUrl = response.headers.get(
                        "Location"
                    );
                    alert(`Registration successful. Your data: ${blobUrl}`)
                })
                .catch(function (error) {
                    alert("Registration failed.")
                });
        }
    };

    render() {
        return (
            <Form className="registration container" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Col className=" mb-3">
                    <h1>Registration Form</h1>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type='text'
                            name="firstName"
                            required
                            value={this.state.user.firstName}
                            onChange={this.handleChange}
                            placeholder="First name"
                        /><Form.Control.Feedback type="invalid">
                            * Please enter your first name.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type='text'
                            name="lastName"
                            required
                            value={this.state.user.lastName}
                            onChange={this.handleChange}
                            placeholder="Last name"
                        /><Form.Control.Feedback type="invalid">
                            * Please enter your last name.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            name="username"
                            required
                            value={this.state.user.username}
                            onChange={this.handleChange}
                            placeholder="Username"
                            minLength={6}
                            maxLength={12}
                        />
                        <Form.Control.Feedback type="invalid">
                            * Please choose a username (6-12 characters).
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom03">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            name="email"
                            required
                            value={this.state.user.email}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom04">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            name="password"
                            required
                            minLength={8}
                            pattern="(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            value={this.state.user.password}
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.<br />
                            (Minimum 8 characters, At least: <br />
                            one uppercase letter, lowercase letter, <br />
                            number and special character (!, #, $,%, &, *, @ ...)).
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom05">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            name="confirmPassword"
                            required
                            minLength={8}
                            pattern="(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            value={this.state.confirmPassword}
                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            Please confirm a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" >  Submit!</Button>
                </Col>
            </Form >
        )
    }
}

export default Forms;