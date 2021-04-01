const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const CONFIGURATION_FILE = path.join(process.cwd(), 'configuration.yml');

if (!fs.existsSync(CONFIGURATION_FILE)) {
  console.error('Please copy configuration.example.yml to configuration.yml and modify it');
  throw new Error('Sorry, configuration file not found');
}

const configuration = yaml.load(fs.readFileSync(CONFIGURATION_FILE, 'utf8'));

module.exports = configuration;
