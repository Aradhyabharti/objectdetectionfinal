status = ""
object = [];



function preload() {
    img = loadImage("dog_cat.jpg");

}


function setup() {
    canvas = createCanvas(600, 600)
    canvas.center()
    object_detector = ml5.objectDetector('cocossd,', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}


function modelLoaded() {
    console.log("model is loaded")
    status = true;
    object_detector.detect(img, gotResult)
}



function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results)
        object = results
    }
}



function draw() {
    image(img, 0, 0, 600, 600)
    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "objects detected"

            fill('#00FFFF')
            stroke('#FF0000	')
              percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y)
            noFill()
            rect(object[i].x,object[i].y,object[i].width,object[i].height)

        }
    }
}