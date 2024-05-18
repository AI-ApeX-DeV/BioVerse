import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (question.trim()) {
      setLoading(true);
      try {
        const result = await axios.post('/api/query', { question });
        setResponse(result.data.response);
      } catch (error) {
        console.error('Error sending question:', error);
        setResponse('Error: Unable to fetch response');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="input-container">
        <textarea
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </div>
      {response && (
        <div className="response-container">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
