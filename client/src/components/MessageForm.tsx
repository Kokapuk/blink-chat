import { FormEvent, useState } from 'react';
import styles from '../styles/MessageForm.module.css';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

const MessageForm = ({ socket }: Props) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value.trimStart())}
        className={styles.form__input}
        type='text'
        required
        minLength={1}
        maxLength={512}
      />
      <button>Send</button>
    </form>
  );
};

export default MessageForm;
