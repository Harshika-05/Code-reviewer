import { useState , useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import './App.css'

import Markdown from 'react-markdown';

import axios from 'axios';

import rehypeHighlight from 'rehype-highlight';

import "highlight.js/styles/github-dark.css";

import Editor from 'react-simple-code-editor';

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`
    function sum(){
      return 1+1;
    }
  `);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() =>{
    prism.highlightAll();
  })

async function reviewCode(){
  setLoading(true);
  const response = await axios.post('http://localhost:3000/ai/get-review' , { code });
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
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)  }
              highlight={code => prism.highlight(code, prism.languages.javascript , "javascript")}
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
