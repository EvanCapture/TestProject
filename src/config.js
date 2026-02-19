const requiredEnvVars = ["GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_PRIVATE_KEY"];

function validateConfig() {
  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

function getGoogleCredentials() {
  validateConfig();
  return {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  };
}

module.exports = {
  getGoogleCredentials
};
