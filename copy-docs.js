const fs = require('fs-extra');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, 'docs-site/build');
const destDir = path.join(__dirname, 'public/docs');

// Function to copy files
const copyFiles = async (source, destination) => {
  try {
    await fs.copy(source, destination);
    console.log(`Files copied from ${source} to ${destination}`);
  } catch (err) {
    console.error(`Error copying files: ${err}`);
    process.exit(1);
  }
};

// Ensure the destination directory exists and copy the files
copyFiles(sourceDir, destDir);
