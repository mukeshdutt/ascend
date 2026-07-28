export type SubTask = {
  id: string
  title: string
  done: boolean
  notes: string
  createdAt: string
}

export type SubTasksIndex = Record<string, SubTask[]>
