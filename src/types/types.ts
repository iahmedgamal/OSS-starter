export interface Label {
  id: number
  name: string
  description: string | null
  color: string
}

export interface Issue {
  id: number
  title: string
  html_url: string
  labels: Label[]
  user: {
    login: string
    avatar_url: string
  },
  body: string
}

export interface IssuesResponse {
  total_count: number
  items: Issue[]
}



