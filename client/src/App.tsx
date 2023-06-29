import { useSelector } from 'react-redux';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import io from 'socket.io-client';
import { RootState } from './app/store';
import JoinForm from './components/JoinForm';

const socket = io(import.meta.env.VITE_API_URL);

const App = () => {
  const connection = useSelector((state: RootState) => state.connection);

  return (
    <>
      {connection.room ? (
        <>
          <MessageList socket={socket} />
          <MessageForm socket={socket} />
        </>
      ) : (
        <JoinForm socket={socket} />
      )}
    </>
  );
};

export default App;
