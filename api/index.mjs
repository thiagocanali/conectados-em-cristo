import { buildRuntimeApp } from '../server/dist/runtime.mjs'
import { createVercelHandler } from '../server/dist/vercel-handler.mjs'

// No listen() or migrations here. Keep the pool small as Vercel scales instances.
const app = buildRuntimeApp(process.env.DATABASE_URL, 1)
export default createVercelHandler(app)
