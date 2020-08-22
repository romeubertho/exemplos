import express from 'express'
import cors from 'cors'
import routes from '~/routes'
import compression from 'compression'

const app = express()

app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.listen(8080, async () => {
  console.log('Server running')
})
