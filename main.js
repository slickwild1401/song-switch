leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_status2

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();        
    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on("pose", gotPoses)
}

function draw() {
    image(video, 0, 0, 400, 400)
    fill("#FF0000");
    stroke("#FF0000");
    song_status = song1.isPlaying();
    console.log(song_status)
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song_status == false) {
            song1.play()
            document.getElementById("song").innerHTML = "Harry Potter"
        }
    }
    song_status2=song2.isPlaying();
    console.log(song_status);
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
       if(song_status2==false){
        song2.play()
        document.getElementById("song").innerHTML = "Peter Pan"
       }
    }
}

function ModelLoaded() {
    console.log("poseNet is initialized ")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist =" + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
    }
}