export const ApprovedRegIdPwd = (name, username, password) => {
    return `
      <!DOCTYPE html>
      <html style="margin: 0; padding: 0;">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Thankyou for registering with Mersat</title>
      <style>
          body {
              background-color: #FFFFFF; padding: 0; margin: 0;
          }
      </style>
      </head>
      <body style="background-color: #FFFFFF; padding: 0; margin: 0;">
  
      <table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">
          <tr>
              <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">
                      <tr>
                          <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">
                              <span style="font-size: 18px; font-weight: normal;">VERIFICATION SUCCESSFUL</span>
                          </td>
                      </tr>
                      <tr>
                      <td align="left" valign="top" colspan="2" style="padding: 20px 0 10px 0;">
                          <span style="font-size: 18px; font-weight: normal;">Hi ${name},</span>
                      </td>
                      </tr>
                      <tr>
                          <td align="left" valign="top" colspan="2" style="padding-top: 10px;">
                              <span style="font-size: 12px; line-height: 1.5; color: #333333;">
                                  We have received your application to register on our portal.
                                  <br/><br/>
                                   This is to inform you that your application is verified.
                                  <br/><br/>
                                    Your credentials to login are as below.
                                    Username - ${username}
                                    Password - ${password}
                                    Please login to the portal using this link.
                                  <br/><br/>
                                  <br/><br/>
                                  Thanks,
                                  <br/>
                                  No Reply Team
                              </span>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      </body>
      `;
  };
  