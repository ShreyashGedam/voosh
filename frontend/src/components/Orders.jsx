import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Orders = (props) => {
  const { token, userId } = props;
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {}, [name, total]);

  const handleClick = () => {
    axios
      .post(
        `http://localhost:8080/order/addorder/${userId}`,
        {
          total,
          order_name: name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setName("");
        setTotal(0);
        alert("order added successdully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Contain>
        <p>Order Name:</p>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder={name}
        ></input>
      </Contain>
      <Contain style={{ marginBottom: "20px" }}>
        <p>Total Cost:</p>
        <input
          onChange={(e) => setTotal(e.target.value)}
          placeholder={total}
        ></input>
      </Contain>
      <button
        style={{ marginBottom: "20px", cursor: "pointer" }}
        onClick={handleClick}
        disabled={!name || !total}
      >
        Add order
      </button>
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
