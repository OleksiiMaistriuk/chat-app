import { useAuthContext } from "context/AuthContext";
import { useUserContext } from "context/UserContext";
import {
  addDoc,
  collection,
  // doc,
  // getDoc,
  getDocs,
  query,
  serverTimestamp,
  // serverTimestamp,
  // setDoc,
  // updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { db } from "../../firebase/firebase";

export const Message = () => {
  // const [chats, setChats] = useState<any | {}>({});
  // const [text, setText] = useState("");
  const [task, setTask] = useState("");
  // const [user, setUser] = useState<any>({});

  //@ts-ignore
  const { currentUser } = useAuthContext();

  //@ts-ignore
  const { dispatch, data } = useUserContext();

  // const { user } = data;

  const handleSearch = async (userName: string) => {
    const q = query(collection(db, "users"), where("name", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        dispatch({ type: "CHANGE_USER", payload: doc.data() });
        // setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get chats
  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(
  //       doc(db, "usersChats", currentUser.uid),
  //       (doc) => {
  //         console.log("doc.data()", doc.data());
  //         setChats(doc.data());
  //       }
  //     );
  //     console.log("chats", chats);
  //     return () => {
  //       unsub();
  //     };
  //   };
  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  // const createUserChat = async () => {
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;

  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));

  //     if (!res.exists()) {
  //       //create a chat in chat collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       // create users chat
  //       await updateDoc(doc(db, "usersChats", currentUser.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: user.uid,
  //           displayName: user.name,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "usersChats", user.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSendTask = async (e: any) => {
    e.preventDefault();
    const collectionRef = collection(db, "tasks");
    try {
      if (task) {
        await addDoc(collectionRef, {
          task,
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          createdDate: serverTimestamp(),
        });
      }

      setTask("");
    } catch (error) {
      console.log(error);
    }
  };
  // const handleSend = async (e: any) => {
  //   e.preventDefault();
  //   await createUserChat();

  //   try {
  //     await updateDoc(doc(db, "chats", data.chatId), {
  //       messages: arrayUnion({
  //         id: uuid(),
  //         text,
  //         senderName: currentUser.displayName,
  //         date: Timestamp.now(),
  //         dateNow: Date.now(),
  //       }),
  //     });

  //     await updateDoc(doc(db, "usersChats", currentUser.uid), {
  //       [data.chatId + ".lastMessage"]: { text },
  //       [data.chatId + ".date"]: serverTimestamp(),
  //     });

  //     await updateDoc(doc(db, "usersChats", user.uid), {
  //       [data.chatId + ".lastMessage"]: { text },
  //       [data.chatId + ".date"]: serverTimestamp(),
  //     });

  //     setText("");
  //     setTask("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // debugger;
  const handleKeyDown = (e: any) => {
    e.code === "Enter" && handleSearch(e.target.value);
  };

  return (
    <div className="m-auto">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onKeyDown={handleKeyDown}
        />
      </InputGroup>
      {/* {chats &&
        Object.entries(chats)?.map((chat: any) => (
          <span key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            {chat[1].userInfo.displayName}
          </span>
        ))} */}
      {/* <Form onSubmit={(e: any) => handleSend(e)}>
        {data.user.name && <span>{data.user.name}</span>}
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
      </Form> */}
      <Form onSubmit={(e: any) => handleSendTask(e)}>
        {data.user.name && <span>{data.user.name}</span>}
        <Form.Group className="mb-3" controlId="task">
          <Form.Label>Enter task</Form.Label>
          <Form.Control
            value={task}
            type="text"
            placeholder="Enter task"
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
