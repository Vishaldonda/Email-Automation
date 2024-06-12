const { chromium } = require('playwright');
const fs = require('fs');
const pdfParse = require('pdf-parse');

// Regular expression to match email addresses
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

// Load the company list from the PDF
async function getCompaniesFromPDF(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  const lines = data.text.split('\n');
  
  const companies = lines.map(line => {
    const emailMatch = line.match(emailRegex);
    if (emailMatch) {
      return { email: emailMatch[0] };
    }
    return null;
  }).filter(company => company !== null);

  return companies;
}

(async () => {
  const companies = await getCompaniesFromPDF('Banglore IT Companies List.pdf');

  // Email content
  const subject = "Application for software developer - 'Your Name'";
  const body = `
    Hi,

    I hope this email finds you well. This is 'Your Name' graduated from 'Your college'.

    I am writing to express my interest in the software developer position at your company. With a strong background in software development and a passion I myself find interested and excited about the opportunity to contribute. In my previous Company 'xxx', I was responsible for developing and maintaining their portal of their fleets(drivers).

    This experience equipped me with the ability to work effectively in a fast-paced environment, collaborate with different teams, across various technologies. I am confident that my skills and experience make me a strong candidate for the role. I am keen to further discuss my background, skills, and previous experience.

    Thank you for considering my application. I have attached my resume for your review, and I look forward to the possibility of discussing this exciting opportunity with you further.

    Warm regards,

   'Your Name'
   'Phno: zzz'
   'https://www.linkedin.com/in/'xxx'/'
  `;

  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Log in to Gmail
  await page.goto('https://mail.google.com/');
  // Wait for manual login
  await page.waitForSelector('div[role="button"][gh="cm"]', { timeout: 0 });

  for (const company of companies) {
    try {
      // Click compose button
      await page.click('div[role="button"][gh="cm"]');

      // Wait for the new message form to appear
      await page.waitForTimeout(1000); // Wait for 1 second for the compose window to appear

      // Fill out the email fields
      await page.getByLabel('To recipients').fill(company.email);
      await page.fill('input[name="subjectbox"]', subject);
      await page.fill('div[aria-label="Message Body"]', body);

      // Attach resume
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('div[command="Files"]')
      ]);
      await fileChooser.setFiles('Cashier Resume.pdf');

      // Send the email
      await page.click('div[aria-label="Send ‪(Ctrl-Enter)‬"]');

      // Wait for the email to be sent
      await page.waitForTimeout(5000); // Wait for 3 seconds before sending the next email
    } catch (error) {
      console.error(`Failed to send email to ${company.email}: ${error.message}`);
    }
  }

  await browser.close();
})();
