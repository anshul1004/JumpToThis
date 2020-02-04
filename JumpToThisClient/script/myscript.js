
// let data = {
//     "videos" : [{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hen",
//                 "duration": "13-335"
//             }, {
//                 "name": "car",
//                 "duration": "445-535"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "duck",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "duck",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "bird",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hen",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "horn",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "assets/videoplayback.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         }
//     ]
// }

// let data = {
//     "videos" : [{
//             "url" : "https://storage.googleapis.com/bucket_jumper/antarctica.mp4",
//             "labels" : [{
//                 "name": "hen",
//                 "duration": "13-335"
//             }, {
//                 "name": "car",
//                 "duration": "445-535"
//             }]
//         },{
//             "url" : "https://storage.googleapis.com/bucket_jumper/bank.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "https://storage.googleapis.com/bucket_jumper/basketball.mp4",
//             "labels" : [{
//                 "name": "duck",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "https://storage.googleapis.com/bucket_jumper/chainsmokers.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "https://storage.googleapis.com/bucket_jumper/cricket.mp4",
//             "labels" : [{
//                 "name": "duck",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "https://storage.googleapis.com/bucket_jumper/dog.mp4",
//             "labels" : [{
//                 "name": "hat",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "https://storage.googleapis.com/bucket_jumper/train.mp4",
//             "labels" : [{
//                 "name": "bird",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         },{
//             "url" : "https://storage.googleapis.com/bucket_jumper/dance.mp4",
//             "labels" : [{
//                 "name": "hen",
//                 "duration": "23-35"
//             }, {
//                 "name": "car",
//                 "duration": "63-135"
//             }]
//         }
//     ]
// }

let kidMode = false;

let data = {
    "videos" : [train, basketball, dog, food, bank, cats, wrestling,antarctica, naruto, football , addicted]
}

function searchCourse() {
    let input = document.getElementById("myInput").value.toUpperCase().trim();
    filterCourseGrid(input);
}

function toggleKidMode() {
    kidMode = !kidMode;
}

function showVideoLableInfo(id, key) {
    var lables = data.videos[id].lables;
    var totalDuration = parseInt(document.getElementById("video_thumb_" + id).duration);
    var start = 0;

    var elem = document.getElementById("video_info_" + id);

    if (elem!=undefined) {
        elem.remove();
    }

    let videoInfo = createElemUtil("main_info_" + id, "video_info_" + id, "video_info", "div");
    let seekbar = createElemUtil(videoInfo.id, "seekbar" + id, "seekbar", "div");

    for (let j = 0 ; j<lables.length; j++) {
        if (lables[j].name.toUpperCase() == key) {
            let currStart = parseInt(lables[j].duration);
            let currEnd = parseInt(currStart + (1));

            if (start<currStart) {
                var seekbarNoLable = createElemUtil(seekbar.id, "seekbar_no_label_" + j + "_" + id, "seekbar_no_label", "div");
                seekbarNoLable.style.width = ((currStart-start)/totalDuration)*100 + "%";
            }

            var seekbarWithLable = createElemUtil(seekbar.id, "seekbar_"+ lables[j].name + "_" + currStart + "_label_" + j + "_" + id, "seekbar_with_label", "div");
            seekbarWithLable.style.width = ((currEnd-currStart)/totalDuration)*100 + "%";
            seekbarWithLable.setAttribute("onClick", "jumpToVideo(this.id)");
            start = currEnd;
        }
    }
}

function jumpToVideo(idString) {
    var idArr = idString.split("_");
    var idNum = idArr[idArr.length-1];
    var jumpTime = idArr[2];
    var elem = document.getElementById("video_thumb_" + idNum);
    elem.currentTime = jumpTime;
    elem.play();
}

function createCourseGrid(data) {

    let videos = data.videos;
    var courseGrid = createElemUtil("container", "course_grid", "course_grid", "div");

    for (let i=0;i<videos.length;i++) {
        let filter_div = createElemUtil(courseGrid.id, "filter_div_" + i, "filter_div", "div");
        let mainInfo = createElemUtil(filter_div.id, "main_info_" + i, "main_info", "div");
        let courseInfoBlock = createElemUtil(mainInfo.id, "course_info_block_" + i, "course_info_block", "div");
        let videoThumb = createElemUtil(courseInfoBlock.id, "video_thumb_" + i, "video_thumb", "video");
        videoThumb.controls = true;
        let videoSource = createElemUtil(videoThumb.id, "video_source_" + i, "video_source", "source");
        videoSource.setAttribute("src", videos[i].url);
        videoSource.setAttribute("type", "video/mp4");

        if (videos[i].explicit!=undefined) {

            var explicitArr = videos[i].explicit;

            videoThumb.ontimeupdate = function() {
                myFunction(explicitArr, this);
            };

            function myFunction(explicitArr, videoThumb) {
                console.log(explicitArr);
                console.log(explicitArr.indexOf(parseInt(videoThumb.currentTime)));
                console.log(parseInt(videoThumb.currentTime));
                console.log("kid mode" + kidMode);
                if ((explicitArr.indexOf(parseInt(videoThumb.currentTime)) == true || 
                    explicitArr.indexOf(parseInt(videoThumb.currentTime)) >=0) && kidMode) {
                    videoThumb.currentTime = videoThumb.currentTime + 4;
                }
            }
        }
        
    }
}

function filterCourseGrid(key) {

    let videos = data.videos;
    let len_videos = videos.length;
    let hiddenCount = 0;

    for (let i=0; i<len_videos; i++) {

        let len_lables = videos[i].lables.length;
        let keyExists = false;

        for (var j=0; j< len_lables ; j++) {
            if (videos[i].lables[j].name.toUpperCase()==key) {
                keyExists = true;
            }
        }

        if (!keyExists && key.length >= 3) {
            document.getElementById("filter_div_"+ i).style.display = "none";    
            hiddenCount++;
        } else {
            document.getElementById("filter_div_" +i).style.display = "flex";
            if (key.length >= 3) {
                showVideoLableInfo(i, key);
            } else {
                var elem = document.getElementById("video_info_" + i);
                if (elem!=undefined) {
                    elem.remove();
                }
            }
        }
    }

    console.log(hiddenCount)
    console.log(len_videos)

    if (hiddenCount == len_videos) {
        document.getElementById("no_results").style.display = "block";
    } else {
        document.getElementById("no_results").style.display = "none";
    }
}

createCourseGrid(data);