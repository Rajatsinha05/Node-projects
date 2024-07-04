const Mochawesome = require('mochawesome');

module.exports = (on, config) => {
  on('after:run', (results) => {
    const outputDir = 'mochawesome-report';
    const options = {
      reportDir: outputDir,
      overwrite: false,
      html: false,
      json: true,
    };

    return Mochawesome.merge(options).then((report) => {
      Mochawesome.create(report, options).then(() => {
        console.log(`Total Marks: ${report.stats.passes} / ${report.stats.tests}`);
        console.log(`Number of Passed Tests: ${report.stats.passes}`);
      });
    });
  });
};
