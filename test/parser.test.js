var fs = require("fs");
var parser = require("../src/parser");
var service = require("../src/service");

beforeAll(async () => {
    service.runService();
});

test('Parser.ProcessChange - Valid CSV File Inputted - Expect JSON in ./Outbound and CSV in ./Processed', async function () {
    var testData = require("../test_data/patient_data_1.csv");
    parser.processChange(testData);

    expect(fs.existsSync("./outbound/patient_data_1.json")).toBe(true);
    expect(fs.existsSync("./processed/patient_data_1.csv")).toBe(true);
});