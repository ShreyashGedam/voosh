import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Register = (props) => {
  const navigate = useNavigate();
  const { setUser } = props;
  const [invalid, setInvalid] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClickNormal = async () => {
    await axios
      .post("http://localhost:8080/user/adduser", {
      // .post("https://tiny-jade-swordfish-cape.cyclic.app/user/adduser", {
        name,
        phone,
        password,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setInvalid(true);
      });
  };

  const handleNaviagte = () => {
    navigate("/");
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      {invalid && <h2 style={{ color: "red" }}>Invalid or Already Exist</h2>}
      <Contain>
        <p>Name</p>
        <input
          onChange={(e) => {
            setInvalid(false);
            setName(e.target.value);
          }}
        ></input>
      </Contain>
      <Contain style={{ marginBottom: "20px" }}>
        <p>Phone Number</p>
        <input
          onChange={(e) => {
            setInvalid(false);
            setPhone(e.target.value);
          }}
        ></input>
      </Contain>
      <Contain style={{ marginBottom: "20px" }}>
        <p>Password</p>
        <input
          onChange={(e) => {
            setInvalid(false);
            setPassword(e.target.value);
          }}
        ></input>
      </Contain>
      <button
        style={{ marginBottom: "20px", cursor: "pointer" }}
        onClick={handleClickNormal}
      >
        Submit
      </button>
      <p>Already a user ?</p>
      <p style={{ cursor: "pointer" }} onClick={handleNaviagte}>
        Login
      </p>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  width: 20%;
  margin: auto;
  border: 1px solid;
`;

const Contain = styled.div``;
