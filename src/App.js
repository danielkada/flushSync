import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { uniqueNamesGenerator, names } from 'unique-names-generator';

import './App.css';

function App() {
  const chatRef = useRef(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    makeMessage(),
    makeMessage(),
    makeMessage(),
    makeMessage(),
  ]);

  function makeMessage() {
    return {
      id: String(Math.random()),
      name: name || uniqueNamesGenerator({ dictionaries: [names] }),
      text: message || 'Lorem ipsum dolor sit amet.',
    };
  }

  function scrollToBottom() {
    const { lastChild } = chatRef.current;
    lastChild.scrollIntoView({ behavior: 'smooth' });

    console.log(lastChild.querySelector('strong').innerText);
  }

  function handleSubmit(event) {
    event.preventDefault();

    flushSync(() => { // código fica travado aqui
      setMessages((prevState) => prevState.concat(makeMessage()));
    })
    
    // eu já tenho a DOM atualizada com a nova mensagem
    scrollToBottom();
    setMessage('');
  }

  return (
    <div className="content">
      <div className="chat" ref={chatRef}>
        {messages.map((message) => (
          <div className="chat__message" key={message.id}>
            <strong>{message.name}:</strong>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <input
          type="text"
          placeholder="Mensagem"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
