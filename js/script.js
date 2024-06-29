// Step 1: All required variables
const showSentence = document.getElementById("show-sentence")
const textarea = document.getElementById("textarea")
const btn = document.getElementById("btn")
const score = document.getElementById("score")
const timer = document.getElementById("timer")
let startTime, endTime, totalTimeTaken, random, mistakes = 0, wrongWords = [];

// Step 2: Array of sentences
const sentences = [
  "The small village nestled between the mountains was known for its vibrant festivals, where locals and tourists alike gathered to celebrate with music, dance, and a feast of traditional foods.",
  "Every morning, the old man would walk to the park, sit on the same bench, and feed the pigeons, who had come to recognize him as a reliable source of food.",
  "The library, filled with ancient books and modern novels, was a place where people from all walks of life came to read, learn, and escape into different worlds.",
  "In the midst of the bustling city, there was a hidden garden, a serene oasis where one could hear the gentle sound of water flowing from a small fountain.",
  "As the sun set over the horizon, painting the sky with hues of orange and pink, the children played their last game of tag before heading home for dinner.",
  "The concert hall was packed with eager fans, their excitement palpable as they awaited the performance of the world-renowned pianist who had traveled from afar to share his music.",
  "She spent hours in her workshop, meticulously crafting each piece of jewelry by hand, infusing her creations with a blend of modern design and traditional craftsmanship.",
  "The scientist's groundbreaking research on renewable energy sources had the potential to revolutionize the way we think about and use power in our everyday lives.",
  "On weekends, the farmer's market came alive with vendors selling fresh produce, homemade jams, and artisanal crafts, creating a vibrant community space.",
  "Despite the rain pouring down outside, the cafe was warm and inviting, with the aroma of freshly brewed coffee and baked goods filling the air.",
  "The young artist painted with bold colors and dynamic strokes, her canvases capturing the raw emotion and energy of the scenes she depicted.",
  "The old, abandoned mansion at the edge of town was the subject of many ghost stories, sparking the curiosity and imagination of local children.",
  "Every summer, the coastal town hosted a sandcastle competition, drawing participants of all ages who transformed the beach into a temporary gallery of impressive sculptures.",
  "The entrepreneur's new startup aimed to provide affordable and accessible education to children in underserved communities, leveraging technology to bridge the gap.",
  "During the winter holidays, the town square was adorned with twinkling lights, a large Christmas tree, and stalls selling hot cocoa and festive treats.",
  "The marathon was a test of endurance and determination, with runners from around the world pushing themselves to the limit in pursuit of personal achievement and glory.",
  "She found solace in writing, pouring her thoughts and feelings into a journal that became a trusted confidant and source of clarity.",
  "The mountain trail was challenging, but the breathtaking view from the summit made every step of the arduous journey worthwhile.",
  "As the chef plated the final dish, a sense of pride washed over him, knowing that his culinary creations would bring joy to the diners.",
  "The new museum exhibit showcased ancient artifacts and modern art pieces side by side, illustrating the evolution of human creativity and expression across the ages.",
];

// Step 7: Add timer 
let intervalId, elapsedTime = 0;
const showTimer = ()=> {
  if (btn.innerText === "Done") {
    intervalId = setInterval(() => {
      elapsedTime ++;
      timer.innerText = elapsedTime;
      stopTest();
    }, 1000);
  } else if (btn.innerText === "Start") {
    clearInterval(intervalId)
    timer.innerText = "";
    elapsedTime = 0;
  }
}

// Step 9: Stop typing test after 30 secs

const stopTest = ()=> {
  if (elapsedTime === 30) {
    textarea.setAttribute("disabled", true);
    endTypingTest();
  }
}

// Step 4: Start Typing Test function
const startTypingTest = ()=> {
    score.innerText = ""
    random = Math.floor(Math.random() * sentences.length);
    showSentence.innerText = sentences[random]
    textarea.setAttribute("placeholder", sentences[random])
    // Getting time in milliseconds
    startTime = new Date().getTime();
    btn.innerText = "Done"
    showTimer();
}

// Step 5: End Typing Test function
const endTypingTest = ()=> {
    endTime = new Date().getTime();
    // Getting totalTimeTaken by subtracting startTime from endTime and divide by 1000 to convert milliseconds into seconds
    totalTimeTaken = (endTime - startTime) / 1000;
    calculateTypingSpeed(totalTimeTaken)
    showSentence.innerText = ""
    textarea.setAttribute("placeholder", "")
    textarea.value = ""
    btn.innerText = "Start"
    showTimer();
    mistakes = 0;
}

// Step 8: ErrorChecking 
const errorChecking = (words)=> {
  let sentence = sentences[random].trim().split(" ");
  for (let i = 0; i < words.length; i++) {
    if (sentence[i] !== words[i]) {
      mistakes++;
      wrongWords.push(words[i])
    }
  }
  return words.length;
}

// Step 6: Calculate Typing Speed function
const calculateTypingSpeed = (totalTimeTaken)=> {
  // EXP:- Trims all starting and ending spaces and assign text to the variable
  const typedText = textarea.value.trim();
  let actualWords = typedText.split(" ");
  // EXP:- actualWords = if typedText is null then 0 else the length of the typed text returned by function
  actualWords = typedText === "" ? 0 : errorChecking(actualWords);
  if (actualWords === 0) {
    score.innerText = "You wrote 0 words";
  } else {
    let typingSpeed = (actualWords / totalTimeTaken) * 60;
    score.innerText = `Your typing speed is ${Math.floor(
      typingSpeed
    )} words per minute. Your ${mistakes} words are wrong. You wrote ${
      actualWords - mistakes
    } correct words out of ${actualWords} and total time taken is ${Math.round(
      totalTimeTaken
    )} seconds.\n Your wrong words are '${wrongWords.join("' , ' ")}'`;
  }
}


// Step 3: Start/Done button event listener
btn.addEventListener("click", ()=> {
    if (btn.innerText.toLowerCase() == "start") {
        textarea.removeAttribute("disabled");
        startTypingTest();
    }
    else if (btn.innerText.toLowerCase() == "done") {
        textarea.setAttribute("disabled", true);
        endTypingTest();
    }
})

// Disable right click 
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});