import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUserId, setToken } from "../Store/userSlice";
import { registerUser } from "../Services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (user && token) navigate("/");
  }, [user, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ first_name: firstname, last_name: lastname, email, password });
      dispatch(setUser(response.email));
      dispatch(setToken(response.token));
      dispatch(setUserId(response._id));
      navigate("/");
    } catch (error) {
      console.log("Error registering:", error);
    }
  };

  return (
    <Wrapper className="d-flex align-items-center justify-content-center mt-5">
      <GlassMorphism className="col-10 col-md-8 col-lg-6 p-3">
        <h1 className="display-6">Create an account.</h1>
        <p className="text-sm fw-bolder">Get things done.</p>
        <form className="py-3" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputFirstname" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFirstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLastname" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <p className="text-sm mt-2 mb-0">
            Already have an account?{" "}
            <strong className="text-decoration-underline" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
              sign in
            </strong>
          </p>
        </form>
      </GlassMorphism>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div``;

const GlassMorphism = styled.div`
  background: rgba(155, 155, 155, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
`;
