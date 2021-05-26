let video;
let label = "Attendere";
let classifier;
let modelURL1 = 'https://teachablemachine.withgoogle.com/models/MAObQ_P--/';
let Label="indossare mascherina";
let img;
let audio = new Audio('mascherina rilevata.mp3');
let audio1= new Audio('Indossare la mascherina.mp3');

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL1 + 'model.json');
}

function setup() {
  createCanvas(500, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  
  //Import Image (per importare un'immagine, eseguire l'istruzione a riga 21; img è il nuovo nome dell'immagine da inserire come primo elemento della funzione image: riga 49)
  
  ima=loadImage('aa.jpg');
  obbligo=loadImage('cc.jpg');
  sino=loadImage('bb.jpg');
  attesa=loadImage('attesa.jpg');
  
  
  // STEP 2: Start classifying
  classifyVideo();
}
// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  
  background(0);
  
  image(video, 0, 0); 

  // Pick an emoji, the "default" is train
  let emoji = "VERIFICA MASCHERINA IN CORSO...";
  let emojiColor = 'rgb(0,255,0)';


  if (label== "Mascherina_ok") {
    emoji = "Accesso consentito";
    image(ima,0, 20);
    audio.play();
    
  }
  if (label=="Mascherina_SINO") {
    emoji="Accesso negato";
    emojiColor = 'rgb(255,0,0)';
    image(sino,10, 20);
    audio1.play();
    
  }  
  else if (label == "MascherinaNO") { 
    emoji="Accesso negato"
    emojiColor = 'rgb(255,0,0)';
    image(obbligo, 10, 20);
    audio1.play();
  } 

  // Drawing the emoji
  textAlign(CENTER, CENTER);
  textSize(25);
  textStyle(BOLDITALIC);
  fill(emojiColor);
  text(emoji, width -250 , height - 100 );
}
// STEP 3: Get the classification!
function gotResults(error, results) {
  
  if (error) {
    console.error(error);
    return;
  }
  // Storing the label and classifying again!
  label = results[0].label;
  classifyVideo();
}
