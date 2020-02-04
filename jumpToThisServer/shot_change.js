'use strict';
async function main() {
    // Imports the Google Cloud Video Intelligence library
    const video = require('@google-cloud/video-intelligence').v1;
    const fs = require('fs');
    const util = require('util');

    // Creates a client
    const client = new video.VideoIntelligenceServiceClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const path = 'videoplayback.mp4';

    // Reads a local video file and converts it to base64
    const readFile = util.promisify(fs.readFile);
    const file = await readFile(path);
    const inputContent = file.toString('base64');

    // Constructs request
    const request = {
        inputContent: inputContent,
        features: ['SHOT_CHANGE_DETECTION'],
    };


    // Detects camera shot changes
    const [operation] = await client.annotateVideo(request);
    console.log('Waiting for operation to complete...');
    const [operationResult] = await operation.promise();
    // Gets shot changes
    const shotChanges = operationResult.annotationResults[0].shotAnnotations;
    console.log('Shot changes:');

    if (shotChanges.length === 1) {
        console.log(`The entire video is one shot.`);
    } else {
        shotChanges.forEach((shot, shotIdx) => {
            console.log(`Scene ${shotIdx} occurs from:`);
            if (shot.startTimeOffset === undefined) {
                shot.startTimeOffset = {};
            }
            if (shot.endTimeOffset === undefined) {
                shot.endTimeOffset = {};
            }
            if (shot.startTimeOffset.seconds === undefined) {
                shot.startTimeOffset.seconds = 0;
            }
            if (shot.startTimeOffset.nanos === undefined) {
                shot.startTimeOffset.nanos = 0;
            }
            if (shot.endTimeOffset.seconds === undefined) {
                shot.endTimeOffset.seconds = 0;
            }
            if (shot.endTimeOffset.nanos === undefined) {
                shot.endTimeOffset.nanos = 0;
            }
            // console.log(
            //     `\tStart: ${shot.startTimeOffset.seconds}` +
            //     `.${(shot.startTimeOffset.nanos / 1e6).toFixed(0)}s`
            // );

            var min = parseInt(shot.startTimeOffset.seconds / 60);
            var sec = shot.startTimeOffset.seconds % 60;

            console.log("Start in min: " + (min) + "." + (sec));

            // console.log(
            //     `\tEnd: ${shot.endTimeOffset.seconds}.` +
            //     `${(shot.endTimeOffset.nanos / 1e6).toFixed(0)}s`
            // );

            
            min = parseInt(shot.endTimeOffset.seconds / 60);
            sec = shot.endTimeOffset.seconds % 60;

            console.log("End in min: " + (min) + "." + (sec));

        });
    }
};

main().catch(console.error);