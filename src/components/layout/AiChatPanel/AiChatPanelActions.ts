import { MCP_URL } from '@/config'

export type ChatResponse = {
  sessionId: string
  reply: string
}

/**
* Send a chat message to the assistant
*
* POST /vesting/chat
**/
export const postChatMessage = async (payload: { sessionId?: string, message: string }, headers: Headers): Promise<ChatResponse> => {
  headers.append("Content-Type", "application/json")

  const res = await fetch(`${ MCP_URL }/vesting/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  })

  if (res.status === 401) throw new Error('401')

  const data = await res.json()

  if (!res.ok) throw new Error(data.error || res.statusText)

  return data
}
