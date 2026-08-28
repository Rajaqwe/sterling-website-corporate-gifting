
const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const files = [
  { url: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Tata_Consultancy_Services.svg', name: 'tcs.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg', name: 'wipro.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', name: 'infosys.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/0/0e/Reliance_Industries.svg', name: 'reliance.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg', name: 'tata.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Tech_Mahindra_New_Logo.svg', name: 'techmahindra.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/7/75/Aditya_Birla_Group_Logo.svg', name: 'adityabirla.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg', name: 'india.svg' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded: ' + dest);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        console.log('Redirecting ' + url + ' to ' + response.headers.location);
        download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        reject(new Error('Failed to download ' + url + ' status ' + response.statusCode));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const f of files) {
    try {
      await download(f.url, path.join(dir, f.name));
    } catch (e) {
      console.error(e.message);
    }
  }
}
run();

