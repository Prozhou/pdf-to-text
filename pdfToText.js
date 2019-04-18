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

    // PDF Details
    let pdfPages = null;
    let pdfPagesRendered = null;

    // Extract PDF
    const extractPDF = (pdf) => {
      // PDF Details
      pdfPages = pdf.numpages;
      pdfPagesRendered = pdf.numrender;
  
      // PDF Text
      return pdf.text;
    };

    // PDF Text
    const extractedText = await extractPDF(pdfData);

    await console.log(extractedText);

    // Text File (Output)
    await fs.writeFile(`./output/convertedPDF_${month}.${day}.${year}.txt`, extractedText, 'utf8', (error) => {
      if (error) {
        return console.log(error);
      }
      console.log('The text file was saved');
    });

    await console.log(`\nPDF Pages Rendered: ${pdfPagesRendered}/${pdfPages}\n`);

  }
  catch (error) {
    console.log(error);
  }
}

pdfToText();