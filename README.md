# Email-Automation
The Automation Enables sending to the list of Emails from the PDF attached using automation tool "PlayWright" 
  - Will be able to send 120 mails per minute!
  - The Initial-Setup was simple using PlayWright.


## Requirements

- Node.js
- Playwright
- pdf-parse
- A Gmail account

## Step1 : Installation

  1.1 Clone this repository:
      ```bash
      git clone https://github.com/yourusername/automated-email-sender.git
      cd automated-email-sender
      ```

  2.2 Install the required dependencies:
      ```bash
      npm install
      ```

  3.3 Download the necessary browsers for Playwright:
      ```bash
      npx playwright install
      ```

## Step2: Configuration

  2.1 Place the PDF file (`Banglore IT Companies List.pdf`) containing the list of companies in the root directory of the project.
  2.2 Update the `subject` and `body` variables in the script with your own email content.

## Step3: Run & Usage

  3.1 Run the script:
      ```bash
      node sendEmails.js
      ```

  NOTE: The script will open a browser and navigate to Gmail. You will need to manually log in to your Gmail account if not already logged in.


  Once logged in, the script will start sending emails to the companies listed in the PDF file. Each email will include the subject, body, and an attached resume (`<Attachment Name.pdf>`).


## Troubleshooting

- If the script fails to send an email, it will log an error message to the console with the email address of the company it failed to send to.
- Ensure that the labels and selectors used in the script match those on the Gmail interface. If Google updates the Gmail interface, you might need to update the script accordingly.

## Contributing

Feel free to submit issues or pull requests if you have any suggestions or improvements.

---

*Note: Be mindful of Gmail's sending limits to avoid getting your account temporarily suspended. This script is intended for educational purposes only.*
