// const GoogleSpreadsheet = require('google-spreadsheet')
// const credentials = require('./bugtracker.json')
// const { promisify } = require('util')

// const doc = new GoogleSpreadsheet()
// doc.useServiceAccountAuth(credentials, (err) => {
//     if (err) {
//         console.log('Não foi possível abrir a planilha')
//     } else {
//         doc.getInfo((err, info) => {
//             const worksheet = info.worksheets[0]
//             worksheet.addRow({ name: '', email: 'teste' }, err => {
//                 console.log('Linha Inserida')
//             })
//         })
//     }
// })