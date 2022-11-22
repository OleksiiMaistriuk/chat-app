import { useGlobalContext } from "context/AuthContext";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebase";

import { Button, Form } from "react-bootstrap";

export const Message = () => {
  const [user, setUser] = useState<any>({
    name: "qwert",
    uid: "zVKISKe0iqg6DQoBTmEre2zJ97F2",
  });
  //@ts-ignore
  const { currentUser } = useGlobalContext();
  const createUserChat = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uis + user.uid
        : user.uid + currentUser.uid;
    console.log("combineId", combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chat colection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create users chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-auto">
      {" "}
      <Form>
        <Form.Select id="disabledSelect" className="mb-3">
          <option>department</option>
          <option>department</option>
          <option>department</option>
          <option>department</option>
          <option>department</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control type="email" placeholder="Enter message" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">

          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <button type="button" onClick={() => createUserChat()}>
        click
      </button>
    </div>
  );
};
