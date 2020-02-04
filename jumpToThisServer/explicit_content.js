

'use strict';
async function main() {
    // Imports the Google Cloud Video Intelligence library
    const video = require('@google-cloud/video-intelligence').v1;

    // Creates a client
    const client = new video.VideoIntelligenceServiceClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const gcsUri = 'gs://jumptothat20/videoplayback.mp4';

    const request = {
        inputUri: gcsUri,
        features: ['EXPLICIT_CONTENT_DETECTION'],
    };

    // Human-readable likelihoods
    const likelihoods = [
        'UNKNOWN',
        'VERY_UNLIKELY',
        'UNLIKELY',
        'POSSIBLE',
        'LIKELY',
        'VERY_LIKELY',
    ];

    // Detects unsafe content
    const [opertaion] = await client.annotateVideo(request);
    console.log('Waiting for operation to complete...');
    const [operationResult] = await opertaion.promise();
    // Gets unsafe content
    const explicitContentResults =
        operationResult.annotationResults[0].explicitAnnotation;
    console.log('Explicit annotation results:');
    explicitContentResults.frames.forEach(result => {
        if (result.timeOffset === undefined) {
            result.timeOffset = {};
        }
        if (result.timeOffset.seconds === undefined) {
            result.timeOffset.seconds = 0;
        }
        if (result.timeOffset.nanos === undefined) {
            result.timeOffset.nanos = 0;
        }
        console.log(
            `\tTime: ${result.timeOffset.seconds}` +
            `.${(result.timeOffset.nanos / 1e6).toFixed(0)}s`
        );
        console.log(
            `\t\tPornography likelihood: ${likelihoods[result.pornographyLikelihood]}`
        );
    })
};

main().catch(console.error);