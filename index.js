require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const sgMail = require('@sendgrid/mail')

const { port, docId, SENDGRID_API_KEY } = process.env
const worksheetIndex = 0

app
    .set('view engine', 'ejs')
    .set('views', path.resolve(__dirname, 'views'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(__dirname + '/assets'))


app.get('/', (req, res) => res.render('home'))

app.post('/', async (req, res) => {
    try {
        const doc = new GoogleSpreadsheet(docId)
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
        })
        await doc.loadInfo()

        const worksheet = doc.sheetsByIndex[worksheetIndex]

        const {
            name,
            email,
            userAgent,
            userDate,
            issueType,
            howToReproduce,
            expectedOutput,
            receivedOutput } = req.body

        const data = {
            name,
            email,
            userAgent,
            userDate,
            issueType,
            howToReproduce,
            expectedOutput,
            receivedOutput,
            source: req.query.source || 'direct'
        }

        await worksheet.addRow(data)

        if (req.body.issueType === 'CRITICAL') {
            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: 'renatoelysiqueira@gmail.com',
                from: req.body.email,
                subject: `[BugTracker] - O usuário ${req.body.name} reportou um problema`,
                text: `O usuário ${req.body.name} reportou um problema`,
                html: `O usuário ${req.body.name} reportou um problema`,
            }
            sgMail.send(msg)
        }

        res.render('success', data)

    } catch (error) {
        if (error) {
            res.render('error')
        }
    }
})


app.listen(port, (err) => console.log(err ? 'error: ' + err : 'Server Running...'))