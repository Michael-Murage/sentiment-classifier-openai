import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  async function callLLM() {
    if (!message) return;
    try {
      const resp = await fetch('http://localhost:3100/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: message}),
      });

      if (resp.ok) {
        const result = await resp.json();
        setResponse(result?.choices[0]?.text?.trim());
        console.log(result);
      } else {
        const err = await resp.json();
        console.error(err);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>
      <div>
        <textarea
          className='rounded-lg hover:border p-3'
          placeholder='Write your tweet here'
          onChange={(e) => setMessage(e.target.value)}
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button
          className='mt-6 bg-gray-900 px-12 py-4 rounded-lg hover:bg-gray-800 hover:scale-105'
          onClick={callLLM}>Click to get your tweet sentiment below</button>
        {
          response ?
          <h2 className='font-semibold text-lg mt-6'>This tweet is {response}</h2>
          :
          null
        }
      </div>
    </div>
  )
}

export default App;
