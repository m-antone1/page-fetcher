const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

const fetcher = function (myUrl) {
  request(myUrl, (error, response, body) => {
    if(error) {
      console.log("Error:", error);
    };
    if(response.statusCode !== 200) {
      console.log(`Oops! Something's wrong! Status Code: ${response.statusCode}`);
    };
    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log(`File path invalid : ${error}`);

      } else {
        const stats = fs.statSync(filePath);
        console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
      }
    })
  });
}

fetcher(url);