import React, { useState } from "react"
import { Horizontal, Vertical } from "mantine-layout-components"
import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { useQuery, useMutation } from "@blitzjs/rpc"
import getTodos from "src/todos/queries/getTodos"
import { List, Text, Button, Input, Checkbox } from "@mantine/core"
import addTodo from "src/todos/mutations/addTodo"
import { notifications } from "@mantine/notifications"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getCurrentUser from "src/users/queries/getCurrentUser"
import toggleTodo from "src/auth/mutations/toggleTodo"
import cleanCompleted from "src/auth/mutations/cleanCompleted"

const Todo = ({ todo }) => {
  const [$toggleTodo] = useMutation(toggleTodo)
  return (
    <Horizontal>
      <Checkbox
        checked={todo.done}
        onClick={async () => {
          await $toggleTodo({
            id: todo.id,
          })
        }}
      ></Checkbox>
      <Text>{todo.title}</Text>
    </Horizontal>
  )
}

const Todos = () => {
  //const user = useCurrentUser()
  const [todos] = useQuery(getTodos, {})

  const [todoTitle, setTodoTitle] = useState("")

  const [$addTodo] = useMutation(addTodo, {})
  const [$cleanCompleted] = useMutation(cleanCompleted, {})

  return (
    <Vertical>
      <Text>Hello username, here are your todos:</Text>
      <Input
        placeholder="Enter todo title"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.currentTarget.value)}
      />

      <Button
        onClick={async () => {
          const result = await $addTodo({
            todoTitle: todoTitle,
          })
        }}
      >
        Create a todo
      </Button>

      <Button onClick={async () => $cleanCompleted({})}>Clean Completed</Button>

      <List>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </List>
    </Vertical>
  )
}

export const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Todos />
    </Layout>
  )
}

export default TodosPage
