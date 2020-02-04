
async function main() {
// Imports the Google Cloud Video Intelligence library
const Video = require('@google-cloud/video-intelligence').v1p2beta1;
// Creates a client
const video = new Video.VideoIntelligenceServiceClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const gcsUri = 'gs://jumptothat20/videoplayback.mp4';

const request = {
  inputUri: gcsUri,
  features: ['TEXT_DETECTION'],
};
// Detects text in a video
const [operation] = await video.annotateVideo(request);
const results = await operation.promise();
console.log('Waiting for operation to complete...');
// Gets annotations for video
const textAnnotations = results[0].annotationResults[0].textAnnotations;
textAnnotations.forEach(textAnnotation => {
  console.log(`Text ${textAnnotation.text} occurs at:`);
  textAnnotation.segments.forEach(segment => {
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
    segment.frames.forEach(frame => {
      const timeOffset = frame.timeOffset;
      if (timeOffset.seconds === undefined) {
        timeOffset.seconds = 0;
      }
      if (timeOffset.nanos === undefined) {
        timeOffset.nanos = 0;
      }
      console.log(
        `Time offset for the frame: ${timeOffset.seconds}` +
          `.${(timeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(`Rotated Bounding Box Vertices:`);
      frame.rotatedBoundingBox.vertices.forEach(vertex => {
        console.log(`Vertex.x:${vertex.x}, Vertex.y:${vertex.y}`);
      });
    });
  });
})
}

main().catch(console.error);