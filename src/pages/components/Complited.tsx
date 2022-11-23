import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { db } from "../../firebase/firebase";
export const Complited = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);
  console.log(userName);
  const heandleSearch = async () => {
    console.log("enter");
    const q = query(collection(db, "users"), where("name", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data().name);
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKeyDown = (e: any) => {
    e.code === "Enter" && heandleSearch();
  };
  // debugger;
  return (
    <div className="m-auto ">
      <span>{user}</span>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="primary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
      {err && <span>not found</span>}

      <Card className="rounded-start rounded-end overflow-hidden bg-success shadow ">
        <Card.Body className="p-1 bg-success d-flex gap-2 align-items-center d-flex justify-content-between">
          <div className="d-flex gap-4">
            <Card.Title>time</Card.Title>
            <Card.Title>name</Card.Title>
          </div>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
