const getWelcomeMessage = (userDetails) => {
  const welcomeSubject = `Welcome to Book House!`;

  const welcomeMessage = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; margin-bottom: 100px; background-color: white; color: #1a1a1a;">
      
      <h2 style="color: black; margin-bottom: 10px;">
        Welcome to <span style="color: #6b7280;">Book House</span>!
      </h2>
      
      <p>Dear <strong>${userDetails.fullname || "User"}</strong>,</p>
      
      <p>Thank you for registering with <strong>Book House</strong>.</p>
      
      <p>Your registration email is:
        <span style="
          background-color: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          color: #1a1a1a;
        ">
          <strong>${userDetails.email}.</strong>
        </span>
      </p>

     <div style="margin-top: 30px;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="display: inline-block;">
    <tr>
      <td align="center" bgcolor="white" style="
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid #1a1a1a;
        ">
        <a href="https://bookhouseui.vercel.app/" target="_blank" style="
            font-weight: bold;
            color: black !important;
            text-decoration: none !important;
            display: inline-block;
          ">
          Explore Book House
        </a>
      </td>
    </tr>
  </table>
</div>

      <p style="margin-top: 30px; color: #6b7280;">
        Best regards,<br/>
        <strong>Team Book House</strong>
      </p>
    </div>
  `;

  return { welcomeMessage, welcomeSubject };
};

module.exports = { getWelcomeMessage };