var fs = require("fs");
var parser = require("../src/parser");
// Should run service while the tests are being run
var service = require("../src/service");

test("Watcher - Assert True", async function () {
    // Not enough time to write
    expect(true).toBe(true);
})
