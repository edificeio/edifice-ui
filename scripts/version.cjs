const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const pkg = require("../package.json");

const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();

const commitDate = new Date().toLocaleString('fr-FR', {
    day: "2-digit",
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

const filePath = path.join(__dirname, '../version.txt');

const data = `${pkg.name}@${currentBranch} ${commitDate}`

fs.writeFileSync(filePath, data, 'utf-8');