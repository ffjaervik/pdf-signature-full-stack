const express = require('express');
const db = require('./db.json');
const cors = require('cors');
const templatePdf = require('./documents/template');
const morgan = require('morgan');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();
const port = 3001;
const dbData = db.schedule[0];

app.use(
    cors({
        methods: ['GET', 'POST'],
    })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/schedule', (req, res) => {
    res.send(dbData);
});

// Route to generate PDF and return it
app.get('/get-pdf', async (req, res) => {
    const { name, days } = dbData;
    const pdfContent = templatePdf({ name, days });
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set the content
    await page.setContent(pdfContent);

    // Replace waitForTimeout with new Promise
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate the PDF buffer
    const pdfBuffer = await page.pdf();
    console.log(pdfBuffer);

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=generated-pdf.pdf');
    res.send(pdfBuffer);
});


app.post('/save-signature', async (req, res) => {
    const { signatureDataUrl } = req.body;
    const {name, days} = dbData
    console.log(signatureDataUrl)

    // Assuming signatureDataUrl is directly used in the template
    const pdfContentWithSignature = templatePdf({ name, days, signature: signatureDataUrl });
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content and wait for a short period to ensure rendering is complete
    await page.setContent(pdfContentWithSignature);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate the new PDF buffer
    const newPdfBuffer = await page.pdf();

    // Save the PDF locally on the server
    const pdfFilePath = './temp/generated-pdf.pdf';
    fs.writeFileSync(pdfFilePath, newPdfBuffer, 'binary');

    await browser.close();

    // Send the new PDF as a response to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.send(newPdfBuffer);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


