import axios from 'axios';

const captcha = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'No CAPTCHA token provided' });
  }
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY environment variable is not configured.');
    return res.status(500).json({ error: 'reCAPTCHA service is misconfigured on the server.' });
  }

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    console.log('Google reCAPTCHA response:', response.data); // Debugging

    const { success, score, 'error-codes': errorCodes } = response.data;

    if (!success) {
      return res.status(400).json({
        error: 'CAPTCHA verification failed',
        errorCodes: errorCodes || ['Unknown error'],
      });
    }

    if (score && score < 0.5) {
      return res.status(400).json({ error: 'Low CAPTCHA score. Potential bot detected.' });
    }

    return res.status(200).json({ message: 'CAPTCHA verified successfully!' });
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return res.status(500).json({ error: 'Error verifying CAPTCHA', details: error.message });
  }
};

export default captcha;
