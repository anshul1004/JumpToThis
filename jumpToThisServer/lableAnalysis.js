'use strict';

const fetch = require("node-fetch");

let lables = [];

let count = 0;

async function main(path = 'videos/addicted.mp4') {
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const path = 'Local file to analyze, e.g. ./my-file.mp4';
  const {
    StreamingVideoIntelligenceServiceClient,
  } = require('@google-cloud/video-intelligence').v1p3beta1;
  const fs = require('fs');

  // Instantiates a client
  const client = new StreamingVideoIntelligenceServiceClient();
  // Streaming configuration
  const configRequest = {
    videoConfig: {
      feature: 'STREAMING_LABEL_DETECTION',
    },
  };
  const readStream = fs.createReadStream(path, {
    highWaterMark: 5 * 1024 * 1024, //chunk size set to 5MB (recommended less than 10MB)
    encoding: 'base64',
  });
  //Load file content
  const chunks = [];
  readStream
    .on('data', chunk => {
      const request = {
        inputContent: chunk.toString(),
      };
      chunks.push(request);
    })
    .on('close', function() {


        
      // configRequest should be the first in the stream of requests
      stream.write(configRequest);
      for (let i = 0; i < chunks.length; i++) {
        stream.write(chunks[i]);
      }
      stream.end();
    });

  const stream = client.streamingAnnotateVideo().on('data', response => {
    //Gets annotations for video
    const annotations = response.annotationResults;
    const lables_obj = annotations.labelAnnotations;
    

    // let lables = [];

    lables_obj.forEach(lable => {
        var obj = {
            'name':lable.entity.description,
            'duration': lable.frames[0].timeOffset.seconds,
        }
        lables.push(obj);
    });
    

    console.log("count: " + count++);

      // console.log(
      //   `Label ${label.entity.description} occurs at: ${label.frames[0]
      //     .timeOffset.seconds || 0}` +
      //     `.${(label.frames[0].timeOffset.nanos / 1e6).toFixed(0)}s`
      // );
      // console.log(` Confidence: ${label.frames[0].confidence}`);

    // console.log(result);
  });
}
main(...process.argv.slice(2)).catch(console.error());

setTimeout(function() {
    var result =  {
        "lables": lables
    }
    // console.log(result)




        // file system module to perform file operations
    const fs = require('fs');
    
    // parse json
    // var jsonObj = JSON.parse(result);
    // console.log(jsonObj);
    
    // stringify JSON Object
    var jsonContent = JSON.stringify(result);
    // console.log(jsonContent);
    
    fs.writeFile("data/addicted.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });


    // function create(data) {
    //     let options = {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data)
    //     }
    //     return fetch("http://localhost:3000", options)
    //     .then((response) => response.json)
    //     .catch((err) => {
    //         console.log(err)
    //     });
    //   }
    // create(result);


}, 120000);
