import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { db } from "../../firebase/firebase";

export const Chat = () => {
  const [messages, setMessages] = useState<any>([]);
  //@ts-ignore
  const { data } = useUserContext();

  useEffect(() => {
    console.log("data.chatId", data.chatId);
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().message);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <>
      {messages.map((message: any) => (
        <div className="m-auto mb-3" key={message.id}>
          <Card
            role="button"
            className="rounded-start rounded-end  overflow-hidden bg-success shadow  "
          >
            <Card.Body className="p-1 bg-opacity-10 bg-success d-flex gap-2 align-items-center d-flex justify-content-between">
              <div className="d-flex gap-4">
                <Card.Title>{message?.dateNow}</Card.Title>
                <Card.Title>{message?.senderName}</Card.Title>
              </div>
              <Card.Text>{message?.text}</Card.Text>
              <div className="d-flex gap-2 align-items-center ">
                <Button
                  className=" h-50 d-flex align-items-center "
                  variant="primary"
                >
                  Accept
                </Button>
                <Button
                  className="h-50 d-flex align-items-center "
                  variant="primary"
                >
                  Cancel
                </Button>
                {/* <CloseButton /> */}
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
};
