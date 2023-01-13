module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
  });
  
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey:
        env("SENDGRID_API_KEY")
      },
      settings: {
        defaultFrom: "sumyjaeh@gmail.com",
        defaultReplyTo: "sumyjaeh@gmail.com",
      },
    },
  },
})

