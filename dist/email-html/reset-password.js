"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetpasswordHTML = void 0;
const resetpasswordHTML = (data) => `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
  <html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  
      <title>Reset Password</title>
  
      <style>
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 300;
          src: url('https://fonts.gstatic.com/s/sourcesanspro/v22/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf')
            format('truetype');
        }
  
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: url('https://fonts.gstatic.com/s/sourcesanspro/v22/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7g.ttf')
            format('truetype');
        }
  
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 600;
          src: url('https://fonts.gstatic.com/s/sourcesanspro/v22/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdr.ttf')
            format('truetype');
        }
  
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: url('https://fonts.gstatic.com/s/sourcesanspro/v22/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdr.ttf')
            format('truetype');
        }
  
        body {
          margin: 0;
          padding: 0;
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
          background-color: #ffffff;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
        }
  
        table {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
  
        td {
          text-align: center;
        }
  
        img {
          max-width: 100%;
          height: auto;
        }
  
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #fff;
            color: #ffffff;
          }
  
          img {
            filter: invert(1);
          }
        }
      </style>
    </head>
    <body>
      <div
        style="
          width: fit-content;
          margin: auto;
          font-family: 'Source Sans Pro', sans-serif;
        "
      >
        <table
          style="
            max-width: 600px;
            border: 1px solid #cbcbcb;
            border-radius: 15px;
            font-family: 'Source Sans Pro', sans-serif;
          "
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <td
              style="
                justify-content: space-between !important;
                padding: 30px 50px;
                background-color: white;
              "
            >
              <img
                alt="fourierpay logo"
                src="https://res.cloudinary.com/dokfqcv95/image/upload/v1688975757/Asset_22_aljxrs.png"
                style="
                  width: auto !important;
                  height: 40px !important;
                  max-width: 100% !important;
                "
              />
            </td>
          </tr>
          <tr>
            <td style="height: 0; border: 0.5px solid #cbcbcb"></td>
          </tr>
          <tr>
            <td style="height: 40px"></td>
          </tr>
          <tr>
            <td
              style="
                text-align: center;
                font-size: 22px;
                font-weight: 800;
                line-height: 1.5;
                color: #1f332b;
                padding: 0px 40px;
              "
            >
              Dear ${data.name},
            </td>
          </tr>
          <tr>
            <td style="height: 25px"></td>
          </tr>
          <tr>
            <td
              style="
                font-size: 16px;
                font-weight: 500;
                line-height: 1.5;
                color: black;
                padding: 0px 40px;
              "
            >
             We received a request to reset your password for FourierPay,

             Click on the button below to reset your Password
            </td>
          </tr>
          <tr>
            <td style="height: 10px"></td>
          </tr>
          <tr>
            <td style="height: 18px"></td>
          </tr>
          <tr>
            <td
              style="
                text-align: center;
                display: inline-block;
                min-width: 60%;
                padding: 0 30px;
              "
            >
              <a
                href="${data.link}"
                style="
                display: inline-block;
                  width: 100%;
                  text-transform: uppercase;
                  text-align: center;
                  font-size: 24px;
                  font-weight: 700;
                  border-radius: 255px;
                  letter-spacing: 2px;
                  background-color: #1f332b;
                  color: #fff6eb;
                  padding: 7px 98px;
                  text-decoration: none;
                "
              >
                Reset Your Password
              </a>
            </td>
  
  
          </tr>
          <tr>
            <td
              style="
                text-align: center;
                font-size: 16px;
                font-weight: 500;
                line-height: 1.5;
                color: black;
                padding: 12px 40px;
                margin-top: 2rem;
                display: inline-block;
              "
            >
              Thanks you for using Fourier Pay
              
              The Fourier Pay Team
            </td>
          </tr>
          <tr>
            <td style="height: 40px"></td>
          </tr>
          <tr>
            <td
              style="
                color: #747474;
                font-size: 12px;
                padding: 0px 40px 60px 40px;
                text-align: center;
              "
            >
              ©2023 Fourier Pay • Contact:
              <a
                href="mailto:support@braudit.io"
                style="color: inherit; text-decoration: none"
              >
                fourierpay@gmail.com
              </a>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>`;
exports.resetpasswordHTML = resetpasswordHTML;
//# sourceMappingURL=reset-password.js.map