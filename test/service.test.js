const fs = require('fs');
const path = require('path');
const config = require('../src/config.json');

var service = require('../src/service');

// Getting full paths for all three directories
const watched = path.join(__dirname, config.watched);
const output = path.join(__dirname, config.output);
const processed = path.join(__dirname, config.processed);

test('Service - No Folders Exist - Expect Watched, Output, and Processed Folders', async function () {

    // Could not fully get working, however logic should be working 
    // if I could get the service to not have a tantrum when I tried to run it from testing environment

    // Remove Folders if they exist
    if (fs.existsSync(watched)) {
        fs.rmdirSync(watched);
    }
    if (fs.existsSync(output)) {
        fs.rmdirSync(output);
    }
    if (fs.existsSync(processed)) {
        fs.rmdirSync(processed);
    }

    

    expect(fs.existsSync(watched)).toBe(true);
    expect(fs.existsSync(output)).toBe(true);
    expect(fs.existsSync(processed)).toBe(true);
});

