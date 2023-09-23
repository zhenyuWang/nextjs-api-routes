import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function FeedbackDetailPage() {
  const [feedbackData, setFeedbackData] = useState()
  const router = useRouter()
  const feedbackId = router.query.id

  useEffect(() => {
    if (!feedbackId) return
    fetch(`/api/feedback/${feedbackId}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback))
  }, [feedbackId])

  if (!feedbackId || !feedbackData) {
    return <p>Loading...</p>
  }
  return (
    <>
      <h1>feedback detail page</h1>
      <p>{feedbackData.email}</p>
      <p>{feedbackData.feedback}</p>
    </>
  )
}
