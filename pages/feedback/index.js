import { buildFeedbackPath, extractFeedback } from '../api/feedback'

export default function FeedbackPage({ feedbackItems }) {
  return (
    <>
      <h1>feedback page</h1>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            <p>
              {item.email}:<br />
              {item.feedback}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  // 这里就不能用 fetch 请求去请求 api routes 数据了，因为这段代码也是运行在服务器上，而不是客户端。
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)
  return {
    props: {
      feedbackItems: data,
    },
  }
}
