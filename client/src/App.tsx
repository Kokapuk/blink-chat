import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

const App = () => {
  return (
    <>
      <MessageList socket={socket} />
      <MessageForm socket={socket} />
    </>
  );
};

export default App;
