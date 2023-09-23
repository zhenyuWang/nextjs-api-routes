import path from 'path'
import fs from 'fs'

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json')
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath)
  return JSON.parse(fileData)
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email
    const feedback = req.body.feedback

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    }

    // store that in database or in a file
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    data.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success!', feedback: newFeedback })
  } else {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    res.status(200).json({ feedback: data })
  }
}
