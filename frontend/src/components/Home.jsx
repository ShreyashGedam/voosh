import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Orders } from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/user/user";
import { getOrder } from "../features/order/order";

export const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const [add, setAdd] = useState(true);
  const dispatch = useDispatch();

  console.log(order);

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  useEffect(() => {
    dispatch(
      getOrder({
        params: { id: user?.user.id },
        headers: { Authorization: `Bearer ${user?.token}` },
      })
    );
  }, []);

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <Container>
      <Header>
        <h1>Home Page</h1>
        <button onClick={handleLogOut}>Logout</button>
      </Header>
      <Name>Welcome {user?.user.name}</Name>
      <Header>
        {add ? <h2>My orders</h2> : <h2>Add Your Order</h2>}
        {add ? (
          <button onClick={handleAdd}>Add Order</button>
        ) : (
          <button onClick={handleAdd}>My Orders</button>
        )}
      </Header>
      {add ? (
        <div
          style={{
            border: "1px solid",
            width: "30%",
            margin: "auto",
            marginBottom: "10px",
          }}
        >
          {order?.length ? (
            order.map((e) => (
              <Small key={e._id}>
                <div>
                  <p>Name:</p>
                  <p>{e.order_name}</p>
                </div>
                <div>
                  <p>Cost:</p>
                  <p>{e.total}</p>
                </div>
              </Small>
            ))
          ) : (
            <p>No order yet</p>
          )}
        </div>
      ) : (
        <Orders />
      )}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 30%;
  justify-content: space-between;

  button {
    height: 30px;
    cursor: pointer;
  }
`;

const Name = styled.div`
  border: 1px solid;
  width: 30%;
  margin: auto;
  margin-top: 30px;
  font-size: 26px;
  padding: 10px;
  font-weight: bold;
  color: teal;
`;

const Small = styled.div`
  border-bottom: 1px solid red;
  margin-bottom: 10px;

  div {
    display: flex;
    justify-content: center;
    font-size: 25px;
    width: 30%;
    margin: auto;
  }
`;
