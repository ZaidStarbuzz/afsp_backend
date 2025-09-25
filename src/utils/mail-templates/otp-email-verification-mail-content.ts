interface EmailVerificationTemplateParams {
  otp: string;
}

export const OtpEmailVerificationMailContent = ({
  otp,
}: EmailVerificationTemplateParams) => {
  const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 20px; }
          .otp { font-size: 24px; font-weight: bold; color: #ff6f00; margin: 20px 0; text-align: center; }
          .message { font-size: 16px; line-height: 1.5; text-align: left; }
          .footer { text-align: center; margin-top: 20px; font-size: 14px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>OTP Verification</h2>
          </div>
          <div class="message">
            <p>Dear user,</p>
            <p">Your One-Time Password (OTP) for verification is:</p>
          </div>
          <div class="otp">${otp}</div>
          <div class="message">
            <p>Please use this OTP to complete your verification. It is valid for the next 5 minutes.</p>
            <p style="text-align: center;">If you did not request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you for using our service!</p>
          </div>
        </div>
      </body>
    </html>`;

  return {
    subject: 'Zaid - Email Verification',
    text: 'Zaid - Email Verification',
    html: htmlTemplate,
  };
};
