import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(Input),
  async ({ id }, { session: { userId } }) => {
    const todo = await db.todo.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        done: true,
      },
    })

    if (!todo) throw new Error("Todo not found")

    return db.todo.update({
      where: {
        id,
      },
      data: {
        done: !todo.done,
      },
    })
  }
)
