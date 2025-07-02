import { useState , useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import './App.css'

import Markdown from 'react-markdown';

import axios from 'axios';

import rehypeHighlight from 'rehype-highlight';

import "highlight.js/styles/github-dark.css";

import Editor from 'react-simple-code-editor';

// Import PrismJS languages dynamically if needed
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-php";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-rust";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`
    function sum(){
      return 1+1;
    }
  `);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");
  useEffect(() =>{
    prism.highlightAll();
  })

  async function reviewCode(){
    setLoading(true);
    // Send both code and language to the backend
    const response = await axios.post(`${backendUrl}/ai/get-review` , { code, language });
    setReview(response.data);
    setLoading(false);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="heading">
            <h2>YOUR CODE</h2>
          </div>
          {/* Language selection dropdown */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="language-select" style={{ marginRight: '0.5rem', fontWeight: 500 }}>Language:</label>
            <select
              id="language-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ padding: '0.3rem 1rem', borderRadius: '4px', fontSize: '1rem' }}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
              <option value="typescript">TypeScript</option>
              <option value="csharp">C#</option>
              <option value="rust">Rust</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)  }
              highlight={code => code}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                margin: 0,
                borderRadius: "5px",
                backgroundColor: "black",
                border: "1px solid #ddd",
              }}
            />
          </div>
          {/* Review button is absolutely positioned at the bottom right of the code area. */}
          <button 
            onClick={reviewCode}
            className="review-btn"
            disabled={loading}
            style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
          >
            {loading ? "Reviewing..." : "Review"}
          </button>
        </div>
        <div className="right">
          <div className="heading">
            <h3>CODE REVIEW</h3>
          </div>
         <Markdown 
         rehypePlugins={[rehypeHighlight]}
         >{ review }</Markdown>
        </div>
      </main>
    </>
  )
}


export default App
