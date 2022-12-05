const snippet = `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js"></script>
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<script>
  let video;
  let neuralNetwork;
  let handpose;

  let handposeResults = [];
  let neuralNetworkResult;

  //this function runs once when the webpage is loaded
  function setup() {
    //create canvas
    createCanvas(640, 480);
    textSize(32);
    fill(0, 255, 0);
    noStroke();

    //create webcam video element
    video = createCapture(VIDEO);
    video.hide();

    //load handpose model
    handpose = ml5.handpose(video, handposeReady);
    handpose.on("hand", gotHandposeResults);

    //load neural network model
    neuralNetwork = ml5.neuralNetwork({ task: "classification" });
    //Specify the path to the model files here
    const modelDetails = {
      model: "./model/model.json",
      metadata: "./model/model_meta.json",
      weights: "./model/model.weights.bin"
    };
    neuralNetwork.load(modelDetails, modelReady);
  }

  //callback function that is called when the handpose model is loaded
  function handposeReady() {
    console.log("Handpose model ready!");
  }
  //callback function that is called when the NeuralNetwork model is loaded
  function modelReady() {
    console.log("NeuralNetwork model loaded!");
  }
  //callback function that is called when the handpose model
  //got a hand prediction result
  function gotHandposeResults(results) {
    handposeResults = results;
  }
  //callback function that is called when the NeuralNetwork
  //model got a classification result
  function gotNeuralNetworkResults(error, results) {
    if (error) {
      console.error(error);
    } else {
      neuralNetworkResult = results;
    }
  }

  //this function runs in a infinite loop
  function draw() {
    //draw webcam video
    image(video, 0, 0, 640, 480);
    //if hand is detected
    if (handposeResults.length > 0) {
      //draw hand landmark predictions
      let landmarks = handposeResults[0].landmarks;
      for (let i = 0; i < landmarks.length; i++) {
        ellipse(landmarks[i][0], landmarks[i][1], 5, 5);
      }
      //convert hand landmark predictions to a 1D array
      let inputs = [];
      for (let i = 0; i < landmarks.length; i++) {
        inputs.push(landmarks[i][0]);
        inputs.push(landmarks[i][1]);
      }
      //classify the hand gesture
      neuralNetwork.classify(inputs, gotNeuralNetworkResults);
    }
    //draw the hand gesture classification and confidence result to canvas
    if (neuralNetworkResult) {
      let label = neuralNetworkResult[0].label;
      //confidence is converted to percentage
      let confidence = round(neuralNetworkResult[0].confidence * 100); 
      text("Label: " + label, 10, 50);
      text("Confidence: " + confidence + "%", 10, 100);
    }
  }
</script>
`;

export default snippet;