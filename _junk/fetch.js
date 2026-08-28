const https = require('https');
https.get('https://en.wikipedia.org/wiki/Tata_Consultancy_Services', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const match = data.match(/upload\.wikimedia\.org\/wikipedia\/[^"]+\.svg/gi);
    console.log([...new Set(match)]);
  });
});
