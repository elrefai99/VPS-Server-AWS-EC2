import express from 'express'

const app = express()

app.get('/', (_, res) => {
    res.status(200).json({ data: [], errors: [], statusCode: 200, message: 'Hola' })
})

app.listen(9000, () => console.log('Server is running at http://localhost:9000'))
