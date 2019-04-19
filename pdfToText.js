// Imports: Dependencies
const fs = require('fs-extra');
const pdf = require('pdf-parse');

// Date
let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
let day = new Date().getDate();

// PDF File
const pdfFile = './assets/PDF_FILE_HERE.pdf';

// PDF To Text
const pdfToText = async () => {
  try {
    // Read PDF
    const dataBuffer = await fs.readFileSync(pdfFile);
    const pdfData = await pdf(dataBuffer);

    // Extracted PDF Text
    const extractedText = pdfData.text;
    console.log(extractedText);

    // Text File (Output)
    await fs.writeFile(`./output/convertedPDF_${month}.${day}.${year}.txt`, extractedText, 'utf8', (error) => {
      if (error) {
        return console.log(error);
      }
      console.log('\nThe PDF has been converted to text and was saved.\n');
    });
    
    // PDF Pages Rendered/PDF Total Pages
    console.log(`\nPDF Pages Rendered: ${pdfData.numrender}/${pdfData.numpages}\n`);

    // PDF Info
    console.log(pdfData.info);

    // PDF Version
    console.log(`PDF Version: ${pdfData.version}`);
  }
  catch (error) {
    console.log(error);
  }
}

// Execute Function
pdfToText();