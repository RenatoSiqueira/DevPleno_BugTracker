const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const GoogleSpreadsheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')

const port = process.env.PORT || 3000
const docId = '13aNlOpoWC9olSCzqNvXoDpd3npNpww_1-iYuBD_aqTE'
const worksheetIndex = 0

app
    .set('view engine', 'ejs')
    .set('views', path.resolve(__dirname, 'views'))
    .use(bodyParser.urlencoded({ extended: true }))

app
    .get('/', (req, res) => {
        res.render('home')
    })
    .post('/', (req, res) => {
        const doc = new GoogleSpreadsheet(docId)
        doc.useServiceAccountAuth(credentials, (err) => {
            if (err) {
                console.log('Não foi possível abrir a planilha')
            } else {
                doc.getInfo((err, info) => {
                    const worksheet = info.worksheets[worksheetIndex]
                    worksheet.addRow({ name: req.body.name, email: req.body.email }, err => {
                        res.send('Bug Ok')
                    })
                })
            }
        })
    })

app.listen(port, (err) => {
    if (err)
        console.log('error:', err)
    else
        console.log('Server Running...')
})