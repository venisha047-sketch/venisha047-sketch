import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
const PORT = 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json())

function getClient() {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  return new Anthropic({ apiKey: key })
}

async function callClaude(systemPrompt, userContent, res) {
  const client = getClient()
  if (!client) {
    return res.status(503).json({
      error: 'API key not configured',
      hint: 'Add ANTHROPIC_API_KEY=your-key to a .env file and restart the server with: npm run server',
    })
  }
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userContent }],
    })
    res.json({ result: message.content[0].text })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

app.post('/api/optimize', async (req, res) => {
  const { prompt } = req.body
  if (!prompt?.trim()) return res.status(400).json({ error: 'prompt is required' })

  const system = `You are a prompt engineering expert. Analyze the given prompt and identify 2-3 specific weaknesses (be precise: missing context, vague instructions, no output format, ambiguous scope, etc.). Then return an improved version that fixes those weaknesses.

Format your response exactly like this:
ANALYSIS:
• [first weakness]
• [second weakness]
• [optional third weakness]

IMPROVED PROMPT:
[the fully rewritten prompt]

WHY IT WORKS:
[one sentence explaining the key improvement]`

  await callClaude(system, prompt, res)
})

app.post('/api/usecases', async (req, res) => {
  const { business } = req.body
  if (!business?.trim()) return res.status(400).json({ error: 'business is required' })

  const system = `You are an AI implementation strategist. Given a business description, identify exactly 3 specific, actionable AI implementations — not generic ideas, but concrete systems.

For each implementation, use this format:

IMPLEMENTATION 1: [name]
What it does: [specific description of exactly what the AI does in this business]
What it takes to build: [tech stack, key components, rough timeline, complexity level]

IMPLEMENTATION 2: [name]
What it does: [specific description]
What it takes to build: [tech stack, key components, rough timeline, complexity level]

IMPLEMENTATION 3: [name]
What it does: [specific description]
What it takes to build: [tech stack, key components, rough timeline, complexity level]

Be concrete. Name specific tools and technologies. Avoid generic answers like "chatbot" or "automation."`

  await callClaude(system, business, res)
})

app.post('/api/workflow', async (req, res) => {
  const { process: processInput } = req.body
  if (!processInput?.trim()) return res.status(400).json({ error: 'process is required' })

  const system = `You are an AI workflow designer. Design a complete, deployable agent workflow for the given role or process.

Structure your response exactly like this:

WHAT TO AUTOMATE:
• [task 1]
• [task 2]
• [task 3]
• [task 4]
• [task 5]

AGENTS NEEDED:
• [Agent Name] — [what it specializes in]
• [Agent Name] — [what it specializes in]
• [Agent Name] — [what it specializes in]

TOOL INTEGRATIONS:
• [specific API or service] — [what it does in this workflow]
• [specific API or service] — [what it does in this workflow]
• [specific API or service] — [what it does in this workflow]

HOW THEY CONNECT:
[2-3 sentences describing the data flow and handoffs between agents]

KEY METRICS:
• [metric 1]
• [metric 2]
• [metric 3]

Be specific. Name real tools (OpenAI, Notion API, Slack, etc.). Make it deployable today.`

  await callClaude(system, processInput, res)
})

app.listen(PORT, () => {
  const hasKey = !!process.env.ANTHROPIC_API_KEY
  console.log(`API server running at http://localhost:${PORT}`)
  if (!hasKey) {
    console.log('⚠  No ANTHROPIC_API_KEY found. Playground tools will prompt for key setup.')
    console.log('   Add it to a .env file: ANTHROPIC_API_KEY=sk-ant-...')
  } else {
    console.log('✓  ANTHROPIC_API_KEY found. Playground tools are live.')
  }
})
