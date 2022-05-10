import express, { Request } from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000
const jsonParser = bodyParser.json()

interface NameRequest {
  name: string
}

interface StringRequest {
  input: string
}

interface CustomRequest<T> extends Request {
  body: T
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/SayMyName', jsonParser, (req: CustomRequest<NameRequest>, res) => {
  // console.log(req.body.foo) // Property 'foo' does not exist on type 'NameRequest'

  res.send(`Hello ${req.body.name}!`)
})

app.post('/SayAString', jsonParser, (req: CustomRequest<StringRequest>, res) => {
  if (!req.body.input) {
    res.send('Missing key "input" from JSON body')
  } else {
    const response: string = getResponseString(req.body.input)

    res.send(response)
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})

const getResponseString = (input: string): string => {
  if (!Number.isNaN(parseInt(input))) {
    // input is an integer number
    const inputInteger = parseInt(input)
    
    // intellisense will now know to treat this like a number
    return `You sent the integer ${inputInteger}`
  }
  return `You sent the string ${input}`
}
