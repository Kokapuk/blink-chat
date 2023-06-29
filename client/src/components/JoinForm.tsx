import { FormEvent, useState } from 'react';
import styles from '../styles/JoinForm.module.css';
import { Socket } from 'socket.io-client';
import { store } from '../app/store';
import { setConnection } from '../feature/connection/connectionSlice';

interface Props {
  socket: Socket;
}

const JoinForm = ({ socket }: Props) => {
  const [room, setRoom] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    socket.emit('join', room);
    store.dispatch(setConnection({ room }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input value={room} onChange={(e) => setRoom(e.target.value.trim())} minLength={3} required placeholder='Room' />
      <button>Join</button>
    </form>
  );
};

export default JoinForm;
