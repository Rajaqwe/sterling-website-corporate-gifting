const https = require('https');
https.get('https://en.wikipedia.org/wiki/Reliance_Industries', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const match = data.match(/upload\.wikimedia\.org\/wikipedia\/[^"]+\.svg/gi);
    console.log("Reliance:", [...new Set(match)]);
  });
});
https.get('https://en.wikipedia.org/wiki/Aditya_Birla_Group', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const match = data.match(/upload\.wikimedia\.org\/wikipedia\/[^"]+\.(?:svg|png)/gi);
    console.log("Aditya:", [...new Set(match)]);
  });
});
