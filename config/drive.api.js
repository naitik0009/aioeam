const {google} = require("googleapis");
const oauth2client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});