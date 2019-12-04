import React from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginRequest from "../model/LoginRequest";

class SignInPage extends React.Component {
  state = {
    showModal: false
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { signIn, history } = this.props;
    const showModal = this.handleShowModal;

    return (
      <div className="SignIn-body">
        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Logowanie nieudane</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Wpisano niepoprawny login lub hasło, spróbuj ponownie!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleCloseModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <Container>
          <Row className="Row">
            <Col sm={12}>
              <Formik
                initialValues={{ login: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  const request = new XMLHttpRequest();
                  request.open("POST", "http://localhost:8080/api/login", true);
                  request.setRequestHeader("Content-Type", "application/json");
                  request.onload = function() {
                    var data = this.response;
                    if (request.status === 200) {
                      if (data !== "") {
                        localStorage.setItem("token", data);
                        setSubmitting(false);
                        signIn();
                        history.goBack();
                      } else {
                        showModal();
                        setSubmitting(false);
                      }
                    } else {
                      showModal();
                      setSubmitting(false);
                    }
                  };
                  var loginRequest = new LoginRequest(
                    values.login,
                    values.password
                  );
                  request.send(JSON.stringify(loginRequest));
                }}
                validationSchema={Yup.object().shape({
                  login: Yup.string().required("Login nie może być pusty!"),
                  password: Yup.string().required("Hasło nie może być puste!")
                  // .min(8, "Password is too short - should be 8 chars minimum.")
                  // .matches(/(?=.*[0-9])/, "Password must contain a number.")
                })}
              >
                {props => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                  } = props;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Form.Label className="SignInPart" htmlFor="login">
                        Login
                      </Form.Label>
                      <Form.Control
                        name="login"
                        type="login"
                        placeholder="Login"
                        value={values.login}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.login && touched.login && "error"}
                      />
                      {errors.login && touched.login && (
                        <div className="input-feedback">{errors.login}</div>
                      )}
                      <Form.Label className="SignInPart" htmlFor="password">
                        Hasło
                      </Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Hasło"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password && "error"
                        }
                      />
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                      <div className="d-flex justify-content-center">
                        <Button
                          className="SignInPart"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Zaloguj
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
          <Row className="Row"></Row>
        </Container>
      </div>
    );
  }
}

export default SignInPage;
