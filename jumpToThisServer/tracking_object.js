'use strict';
async function main() {
    // Imports the Google Cloud Video Intelligence library
    const Video = require('@google-cloud/video-intelligence');

    // Creates a client
    const video = new Video.VideoIntelligenceServiceClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const gcsUri = 'gs://jumptothat20/videoplayback.mp4';

    const request = {
        inputUri: gcsUri,
        features: ['OBJECT_TRACKING'],
        //recommended to use us-east1 for the best latency due to different types of processors used in this region and others
        locationId: 'us-east1',
    };
    // Detects objects in a video
    const [operation] = await video.annotateVideo(request);
    const results = await operation.promise();
    console.log('Waiting for operation to complete...');
    //Gets annotations for video
    const annotations = results[0].annotationResults[0];
    const objects = annotations.objectAnnotations;
    objects.forEach(object => {
        console.log(`Entity description:  ${object.entity.description}`);
        console.log(`Entity id: ${object.entity.entityId}`);
        const time = object.segment;
        console.log(
            `Segment: ${time.startTimeOffset.seconds || 0}` +
            `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s to ${time
                .endTimeOffset.seconds || 0}.` +
            `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
        );
        console.log(`Confidence: ${object.confidence}`);
        const frame = object.frames[0];
        const box = frame.normalizedBoundingBox;
        const timeOffset = frame.timeOffset;
        console.log(
            `Time offset for the first frame: ${timeOffset.seconds || 0}` +
            `.${(timeOffset.nanos / 1e6).toFixed(0)}s`
        );
        console.log(`Bounding box position:`);
        console.log(` left   :${box.left}`);
        console.log(` top    :${box.top}`);
        console.log(` right  :${box.right}`);
        console.log(` bottom :${box.bottom}`);
    });
};

main().catch(console.error);