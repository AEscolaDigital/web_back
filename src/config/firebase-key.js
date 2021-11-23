module.exports = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: "9446cf149fd9fee4552d694a741a8f9b264fb893",
  private_key:  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,"\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: "109601539718281508759",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8dg6g%40school-12606.iam.gserviceaccount.com"
};