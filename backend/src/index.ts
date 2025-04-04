import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { blogRouter } from './routes/blog'
import { userRouter } from './routes/user'
import { aiRouter } from './routes/suggestions'
import { generateRouter } from './routes/generate'
const app = new Hono()
app.use('/*', cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)
app.route('/api/v1/ai', aiRouter)
app.route('/api/v1/ai', generateRouter)
export default app
