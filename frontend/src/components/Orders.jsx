import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addOrder } from "../features/order/order";

export const Orders = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);

  console.log("hello in order");

  const handleClick = () => {
    dispatch(
      addOrder({
        userId: user.user.id,
        payload: {
          total,
          order_name: name,
        },
        token: {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      })
    );
    setName("");
    setTotal(0);
    alert("order added successfully");
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
