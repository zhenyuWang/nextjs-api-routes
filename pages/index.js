import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState([])
  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  useEffect(() => {
    loadFeedbackHandler()
  }, [])

  function submitFormHandler(event) {
    event.preventDefault()
    const email = emailInputRef.current.value
    const feedback = feedbackInputRef.current.value

    if (!email || !feedback) return

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ email, feedback }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems((prevItems) => [...prevItems, data.feedback])
      })
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback))
  }

  return (
    <>
      <h1>home page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Feedback</label>
          <textarea id='feedback' rows={5} ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            <Link href={`/feedback/${item.id}`}>
              <p>{item.email}:</p>
              <p>{item.feedback}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
