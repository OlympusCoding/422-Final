var fs = require("fs");
var parser = require("../src/parser");
// Should run service while the tests are being run
var service = require("../src/service");
// Giving me error for unexpepcted token
var testData = require("../test_data/patient_data_1.csv");
const { fail } = require("assert");

test('Parser.ProcessChange - Valid CSV File Inputted - Expect JSON in ./Outbound and CSV in ./Processed', async function () {
    
    parser.processChange(testData);
    // Test to see if the output and processed files actually exist after running process change
    expect(fs.existsSync("./outbound/patient_data_1.json")).toBe(true);
    expect(fs.existsSync("./processed/patient_data_1.csv")).toBe(true);
});

test('Parser.ProcessChange - Invalid CSV File Inputted - Expect "Unparsable File"', async function () {
    const output = parser.processChange(testData);

    if (!output)
    {
        fail("Unexpected Success");
        return;
    }

    expect(output).toBe("Unparsable File");
});