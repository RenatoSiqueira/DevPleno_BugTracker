require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')
const sgMail = require('@sendgrid/mail')

const { port, docId, SENDGRID_API_KEY, private_key_id, private_key, client_email, client_id } = process.env
const worksheetIndex = 0

const credentials = {
    "type": "service_account",
    "project_id": "bugtracker-259017",
    private_key_id, private_key, client_email, client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bugtracker%40bugtracker-259017.iam.gserviceaccount.com"
}

app
    .set('view engine', 'ejs')
    .set('views', path.resolve(__dirname, 'views'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(__dirname + '/assets'))

app.get('/', (req, res) => res.render('home'))
app.post('/', async (req, res) => {
    try {
        const doc = new GoogleSpreadsheet(docId)
        await promisify(doc.useServiceAccountAuth)(credentials)
        const info = await promisify(doc.getInfo)()
        const worksheet = info.worksheets[worksheetIndex]
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
        await promisify(worksheet.addRow)(data)

        if (req.body.issueType === 'CRITICAL') {

            sgMail.setApiKey(SENDGRID_API_KEY)
            const msg = {
                to: 'renatoelysiqueira@gmail.com',
                from: req.body.email,
                subject: 'Sending with Twilio SendGrid is Fun',
                text: `O usuário ${req.body.name} reportou um problema`,
                html: `O usuário ${req.body.name} reportou um problema`,
            }
            sgMail.send(msg)
        }

        res.render('success', data)

    } catch (error) {
        if (error) {
            res.send('Erro ao enviar formulário')
            console.log(error)
        }
    }
})


app.listen(port, (err) => console.log(err ? 'error: ' + err : 'Server Running...'))