export default function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  // Check password
  if (!code || code !== process.env.VAULT_CODE) {
    // Wait 1 second to slow down brute force attempts
    return setTimeout(() => {
      res.status(401).json({ error: 'Incorrect code' });
    }, 1000);
  }

  // Decode the vault content from base64 env variable
  try {
    const decoded = Buffer.from(process.env.VAULT_CONTENT, 'base64').toString('utf-8');
    res.status(200).json({ content: decoded });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
