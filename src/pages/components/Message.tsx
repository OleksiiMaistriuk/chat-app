import { useAuthContext } from "context/AuthContext";
import { useUserContext } from "context/UserContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase/firebase";

export const Message = () => {
  // const [user, setUser] = useState<any>({
  //   name: "qwertyuiop",
  //   uid: "dYSvgiN3zjW3O4kHReUDE85AmPy1",
  // });
  const [chats, setChats] = useState<any | {}>({});
  const [text, setText] = useState("");

  //@ts-ignore
  const { currentUser } = useAuthContext();
  //@ts-ignore
  const { dispatch, data } = useUserContext();
  //get chats
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "usersChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log("currentUser", currentUser.displayName);

  const createUserChat = async () => {
    const combinedId =
      currentUser.uid > data.user.uid
        ? currentUser.uid + data.user.uid
        : data.user.uid + currentUser.uid;
    console.log("combineId", combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chat colection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create users chat
        console.log("currentUser", currentUser);

        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: data.user.uid,
            displayName: data.user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log("user", data);

        await updateDoc(doc(db, "usersChats", data.user.uid), {
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

  const handleSend = async (e: any) => {
    e.preventDefault();
    createUserChat();

    console.log("text", text);
    console.log("data.chatId", data.chatId);
    console.log("data", data);
    console.log("data.user", data.user);

    await updateDoc(doc(db, "chats", data.chatId), {
      message: arrayUnion({
        id: uuid(),
        text,
        senderName: currentUser.displayName,
        date: Timestamp.now(),
        dateNow: Date.now(),
      }),
    });

    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "usersChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
  };

  const handleSelect = (user: any) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="m-auto">
      {Object.entries(chats)?.map((chat: any) => (
        <span key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          {chat[1].userInfo.displayName}
        </span>
      ))}
      <Form onSubmit={(e: any) => handleSend(e)}>
        {/* <Form.Select id="disabledSelect" className="mb-3">
          {Object.entries(chats)?.map((chat: any) => (
            <option key={chat[0]}>{chat[1].userInfo.displayName}</option>
          ))}
        </Form.Select> */}
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            value={text}
            type="text"
            placeholder="Enter message"
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
