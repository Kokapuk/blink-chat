import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import styles from '../styles/MessageList.module.css';
import { Message } from '../utils/types';

interface Props {
  socket: Socket;
}

const MessageList = ({ socket }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message].splice(-50));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    list.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ul ref={list} className={styles.list}>
      {messages.map((message, index) => (
        <li key={index} className={styles.message}>
          <span className={styles.message__header}>
            <h3>{message.username}</h3>
            <p className={styles['message__time-stamp']}>{moment(message.timeStamp).fromNow()}</p>
          </span>
          <pre className={styles.message__content}>{message.content}</pre>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
