import moment from 'moment';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import styles from '../styles/MessageList.module.css';
import { Message } from '../utils/types';

interface Props {
  socket: Socket;
}

const MessageList = ({ socket }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  return (
    <ul className={styles.list}>
      {messages.map((message, index) => (
        <li key={index} className={styles.message}>
          <pre className={styles.message__content}>{message.content}</pre>
          <p className={styles['message__time-stamp']}>{moment(message.timeStamp).fromNow()}</p>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
