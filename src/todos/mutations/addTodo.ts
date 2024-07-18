import { resolver } from "@blitzjs/rpc"
import db from "db"
import { connect } from "http2"
import { use } from "react"
import { z } from "zod"

const Input = z.object({
  todoTitle: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ todoTitle }, { session: { userId } }) => {
    console.log(`creating a todo with title: ${todoTitle} for user ${userId}`)
    const todo = await db.todo.create({
      data: {
        title: todoTitle,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return todo
  }
)
