import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { logger } from './services/logger.service.js'
// import { toyService } from '../services/toy.service.js'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ],
    credentials: true
}

// import { authRoutes } from './api/auth/auth.routes.js'
// import { userRoutes } from './api/user/user.routes.js'
import { toyRoutes } from './api/toy/toy.routes.js'

app.use(cors(corsOptions))
app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body
app.use(express.static('public'))

// routes
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)


// //List
// app.get('/api/toy', (req, res) => {
//     const { txt, labels, inStock, pageIdx} = req.query
//     // const {sortBy={} } = req.query.params
//     const filterBy = { txt, labels,inStock, pageIdx }

//     // toyService.query(filterBy,sortBy)
//     toyService.query(filterBy)
//         .then(toys => {
//             res.send(toys)
//         })
//         .catch(err => {
//             loggerService.error('Cannot load toys', err)
//             res.status(400).send('Cannot load toys')
//         })
// })
// //add
// app.post('/api/toy', (req, res) => {
//     const { txt:name, labels, inStock } = req.body
//     const toy = {
//         name,
//         labels,
//         inStock,
//     }
//     toyService.save(toy)
//         .then(savedToy => {
//             res.send(savedToy)
//         })
//         .catch(err => {
//             loggerService.error('Cannot add toy', err)
//             res.status(400).send('Cannot add toy')
//         })
// })
// ///edit
// app.put('/api/toy', (req, res) => {
   

//     const {_id,name,labels,price,createdAt,inStock } = req.body
//     const toy = {
//         _id,
//         name,
//         labels,
//         price,
//         createdAt,
//         inStock
//     }
//     toyService.save(toy)
//     .then(savedToy => {
//         res.send(savedToy)
//     })
//     .catch(err => {
//         loggerService.error('Cannot add toy', err)
//         res.status(400).send('Cannot add toy')
//     })
// })

// // Read - getById
// app.get('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.get(toyId)
//         .then(toy => {
//             // toy.msgs =['HEllo']
//             res.send(toy)
//         })
//         .catch(err => {
//             loggerService.error('Cannot get toy', err)
//             res.status(400).send(err)
//         })
// })

// // Remove
// app.delete('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.remove(toyId)
//         .then(msg => {
//             res.send({ msg, toyId })
//         })
//         .catch(err => {
//             loggerService.error('Cannot delete toy', err)
//             res.status(400).send('Cannot delete toy, ' + err)
//         })
// })


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})



// Listen will always be the last line in our server!
const port = process.env.PORT || 3030
app.listen(port, () => {
    logger.info(`Server listening on port http://127.0.0.1:${port}/`)
})