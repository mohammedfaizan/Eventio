import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.authorize("ADMIN"),
  resolver.zod(Input),
  async ({ id }, { session: { userId } }) => {
    console.log("only admins can do this:)")
  }
)
