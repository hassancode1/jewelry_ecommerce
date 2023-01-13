module.exports = {
  async afterCreate(event) {
    // First, create the email template using HTML and CSS

    const { result } = event;
    console.log(result);
    const emailTemplate = `
<html>
  <head>
    <style>
      /* Add your CSS styles here */
    </style>
  </head>
  <body>
    <h1>Thank you for your purchase!</h1>
    <p>Dear ${result.fullname},</p>
    <p>Thank you for purchasing our art work from our online store. We hope that you love it as much as we do!</p>
    <p>Your order will be shipped to the following address:</p>
    <p>
      ${result.fullname}<br>
      ${result.streetaddress}<br>
      ${result.city}, ${result.stateprovince} 
    </p>
    <p>We'll send you a tracking number as soon as your order is on its way. If you have any questions or concerns, please don't hesitate to reach out to us at sumyjaeh@gmail.com</p>
    <p>Thank you again for your business. We appreciate your support and look forward to seeing you again soon!</p>
    <p>Sincerely,</p>
    <p>The team at Your Store</p>
  </body>
</html>
`;

    try {
      await strapi.plugins["email"].services.email.send({
        to: `${result.email}`,
        from: "sumyjaeh@gmail.com",
        subject: "WE'VE RECIEVED  YOUR ORDER ",
        html: emailTemplate,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
