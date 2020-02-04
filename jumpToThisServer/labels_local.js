'use strict';
async function main() {
    // Imports the Google Cloud Video Intelligence library + Node's fs library
    const video = require('@google-cloud/video-intelligence').v1;
    const fs = require('fs');
    const util = require('util');

    // Creates a client
    const client = new video.VideoIntelligenceServiceClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const path = 'videos/antarctica.mp4';

    // Reads a local video file and converts it to base64
    const readFile = util.promisify(fs.readFile);
    const file = await readFile(path);
    const inputContent = file.toString('base64');

    // Constructs request
    const request = {
        inputContent: inputContent,
        features: ['LABEL_DETECTION'],
    };

    // Detects labels in a video
    const [operation] = await client.annotateVideo(request);

    console.log('Waiting for operation to complete...');

    const [operationResult] = await operation.promise();
    // Gets annotations for video
    const annotations = operationResult.annotationResults[0];

    const labels = annotations.segmentLabelAnnotations;
    labels.forEach(label => {
        console.log(`Label ${label.entity.description} occurs at:`);
        label.segments.forEach(segment => {
            const time = segment.segment;
            if (time.startTimeOffset.seconds === undefined) {
                time.startTimeOffset.seconds = 0;
            }
            if (time.startTimeOffset.nanos === undefined) {
                time.startTimeOffset.nanos = 0;
            }
            if (time.endTimeOffset.seconds === undefined) {
                time.endTimeOffset.seconds = 0;
            }
            if (time.endTimeOffset.nanos === undefined) {
                time.endTimeOffset.nanos = 0;
            }
            console.log(
                `\tStart: ${time.startTimeOffset.seconds}` +
                `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
            );
            console.log(
                `\tEnd: ${time.endTimeOffset.seconds}.` +
                `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
            );
            console.log(`\tConfidence: ${segment.confidence}`);
        });
    })
};

main().catch(console.error);