import { FormEvent, useState } from 'react';
import styles from '../styles/MessageForm.module.css';
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket;
}

const MessageForm = ({ socket }: Props) => {
  const [username, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    socket.emit('message', { username, content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        placeholder='Username'
        value={username}
        onChange={(e) => setName(e.currentTarget.value.trim())}
        type='text'
        required
        minLength={3}
        maxLength={16}
      />
      <input
        placeholder='Message'
        value={content}
        onChange={(e) => setContent(e.target.value.trimStart())}
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
