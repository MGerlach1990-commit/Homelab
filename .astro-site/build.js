const { execSync } = require('child_process');
execSync('npx astro build', { stdio: 'inherit' });
