const fs = require('fs');
const dotenv = require('dotenv');

const env = dotenv.parse(fs.readFileSync('.env'));

// ✅ Sort keys once
const sortedKeys = Object.keys(env).sort();

let yaml = '';
for (const key of sortedKeys) {
  yaml += `${key}: "${env[key]}"\n`;
}

fs.writeFileSync('.env.yaml', yaml);
console.log('✅ .env.yaml created');
