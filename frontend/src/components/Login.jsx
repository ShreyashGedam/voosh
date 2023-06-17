import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addUser } from "../features/user/user";

export const Login = (props) => {
  // const { setUser, user } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);

  const [err, setErr] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleClickNormal = async () => {
    dispatch(addUser({ phone, password }));
  };

  useEffect(() => {
    if (user) navigate("/home");
    if (error) setErr(true);
  }, [user, error]);

  const handleNaviagte = () => {
    navigate("/register");
  };

  return (
    <Container>
      <h1>Login</h1>
      {err && <h2 style={{ color: "red" }}>Invalid Credentials</h2>}
      <Contain>
        <p>Phone Number</p>
        <input
          onChange={(e) => {
            setErr(false);
            setPhone(e.target.value);
          }}
        ></input>
      </Contain>
      <Contain style={{ marginBottom: "20px" }}>
        <p>Password</p>
        <input
          onChange={(e) => {
            setErr(false);
            setPassword(e.target.value);
          }}
        ></input>
      </Contain>
      <button
        style={{ marginBottom: "20px", cursor: "pointer" }}
        onClick={handleClickNormal}
        disabled={!phone || !password}
      >
        Submit
      </button>
      <h1>OR</h1>
      <button
        style={{
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        <Link to="http://localhost:8080/auth/google">Google Login</Link>
      </button>
      <br />
      <p>New User ?</p>
      <p style={{ cursor: "pointer" }} onClick={handleNaviagte}>
        Register
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
