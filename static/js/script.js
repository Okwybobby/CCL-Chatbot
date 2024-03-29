// Example POST method implementation:
// async function postData(url = "", data = {}) {
//   const response = await fetch(url, {
//     method: "POST", headers: {
//       "Content-Type": "application/json",
//     }, body: JSON.stringify(data),
//   });
//   return response.json();
// }


// Declare questions globally
const nda_questions = [
  "What is the name of Client organisation?",
  "What is the Client's corporate address?",
  "What date was this agreement made?",
  "What is the client's service description.",
  "What is the client's email?"
];


let nda_answers_raw = localStorage.getItem('nda_answers');
let nda_answers = [];

if (nda_answers_raw) {
  try {
    nda_answers = JSON.parse(nda_answers_raw);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // Handle the error appropriately, e.g., set nda_answers to an empty array
    nda_answers = [];
  }
}


// Retrieve nda_index from localStorage or default to 0
let nda_index = parseInt(localStorage.getItem('nda_index')) || 0;


document.getElementById("sendButton").addEventListener("click", async function (event) {
  // Call the handleKeyDown function passing the event
  console.log("Button clicked!");
  // await handleKeyDown();
  questionInput = document.getElementById("questionInput").innerText;
  //console.log("Clicked sendButton!!!", questionInput)

  document.getElementById("questionInput").innerText = "";
  document.querySelector(".right2").style.display = "block"
  document.querySelector(".right1").style.display = "none"

  document.querySelector(".right_letter").style.display = "none"
  document.querySelector(".right_nda").style.display = "none"
  document.querySelector(".right_proposal").style.display = "none"

  // Parameters
  let params = {
    "sender_id": "1",
    "conversation_id": "1",
    "prompt": questionInput,
    "use_history": true
  };


  // Get the container element
  const container = document.getElementById('container');

  const box1 = document.createElement('div');
  box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
  // box1.innerHTML = `
  //   <img class="w-9 m-2" src="static/Images/user.png" alt="">
  //   <div class="flex space-y-4 flex-col">
  //     <div id="question_"><span class="text-sm"><b>You</b></span></div>
  //     <div id="question2"><span class="text-sm">${responseObject["Human"]}</span></div>
  //   </div>
  // `;
  box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div class="flex space-y-4 flex-col">
        <div id="question_"><span class="text-sm"><b>You</b></span></div>
        <div id="question2"><span class="text-sm">${questionInput}</span></div>
      </div>
    `;

  // Create the second instance
  let box2 = document.createElement('div');
  box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
  // box2.innerHTML = `
  //   <div class="box w-[35vw] flex justify-start space-x-6">
  //     <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
  //     <div class="flex space-y-4 flex-col">
  //       <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
  //       <div id="solution"><span class="text-sm">${responseObject["AI"]}</span></div>
  //     </div>
  //   </div>
  // `;
  box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
          <div id="solution" style="padding-right: 30px;"><span class="text-sm">Loading... </span></div>        
        <br>

        <div class="svg-container flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md api-svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path>
          </svg>  
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md copy-svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      </div>
    `;

  // Add click event for the copy-svg icon
  box2.querySelector('.copy-svg').addEventListener('click', function () {

    const solutionText = box2.querySelector('#solution').textContent;

    // Copy text to clipboard
    navigator.clipboard.writeText(solutionText)
      .then(() => {
        console.log('Text copied to clipboard:', solutionText);
        // You can add further handling or UI updates here if needed
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard:', err);
        // Handle errors or show a message to the user
      });
  });

  // Add click event for the api-svg icon
  box2.querySelector('.api-svg').addEventListener('click', function () {
    // Call your API here
    console.log('Calling API');
  });

  // Append both instances to the container
  container.appendChild(box1);
  container.appendChild(box2);

  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('chatbox_space');

  // Insert the container above the 'chatbox' element
  chatbox.parentNode.insertBefore(container, chatbox);

  //////////////////////////////////////////////////////////////////////////////////
  message = questionInput
  // Send a request to the Flask server with the user's message
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
    body: JSON.stringify({ messages: [{ "sender_id": "user1", "conversation_id": "1", "prompt": message, "use_history": true }] }),

  });

  // Create a new TextDecoder to decode the streamed response text
  const decoder = new TextDecoder();

  // Set up a new ReadableStream to read the response body
  const reader = response.body.getReader();
  let chunks = "";

  // Read the response stream as chunks and append them to the chat log
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks += decoder.decode(value);

    chunks = chunks.replace('\n', '<br>');
    // solution
    const soln = document.getElementById('solution');
    soln.innerHTML = chunks;
  }

  markdownText = document.getElementById("solution").innerText;
  const htmlText = markdownToHtml(markdownText);
  document.getElementById("solution").innerHTML = htmlText;

  event.preventDefault();
  console.log("DONE HERE!!");
});

document.getElementById("sendButton2").addEventListener("click", async function () {
  questionInput = document.getElementById("questionInput2").innerText;
  //console.log("Clicked sendButton!!!", questionInput)

  document.getElementById("questionInput2").innerText = "";

  // Parameters
  let params = {
    "sender_id": "1",
    "conversation_id": "1",
    "prompt": questionInput,
    "use_history": true
  };

  // Get the container element
  const container = document.getElementById('container');

  // Create the first instance
  let box1 = document.createElement('div');
  box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
  box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div class="flex space-y-4 flex-col">
          <div id="question_"><span class="text-sm"><b>You</b></span></div>
          <div id="question2"><span class="text-sm">${questionInput}</span></div>
      </div>         
    `;



  // Get all div elements on the page
  var allDivs = document.getElementsByTagName('div');

  // Initialize a counter for divs with id containing "solution"
  var solutionDivCount = 0;

  // Loop through all div elements
  for (var i = 0; i < allDivs.length; i++) {
    // Check if the current div's id contains the string "solution"
    if (allDivs[i].id && allDivs[i].id.indexOf('solution') !== -1) {
      solutionDivCount++;
    }
  }

  // Display the total count
  console.log('Total number of divs with id containing "solution":', solutionDivCount);



  // Create the second instance
  let box2 = document.createElement('div');
  box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
  box2.innerHTML = `
   <div class="box w-[35vw] flex justify-start space-x-6">
     <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
     <div class="flex space-y-4 flex-col">
       <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
       <div id=${"solution" + solutionDivCount.toString()} style="padding-right: 30px;"><span class="text-sm">Loading... </span></div>
       <br>

      <div class="svg-container flex">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md api-svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path>
        </svg>  
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md copy-svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
        </svg>
      </div>

     </div>
   </div>              
    `;



  // Add click event for the copy-svg icon
  box2.querySelector('.copy-svg').addEventListener('click', function () {
    // const solutionText = box2.querySelector('#solution').textContent;
    // Use the solutionText as needed, e.g., copy to clipboard
    // console.log('Copying:', solutionText);


    const solutionText = box2.querySelector('#solution' + solutionDivCount.toString()).textContent;

    // Copy text to clipboard
    navigator.clipboard.writeText(solutionText)
      .then(() => {
        console.log('Text copied to clipboard:', solutionText);
        // You can add further handling or UI updates here if needed
      })
      .catch(err => {
        console.error('Unable to copy text to clipboard:', err);
        // Handle errors or show a message to the user
      });


  });

  // Add click event for the api-svg icon
  box2.querySelector('.api-svg').addEventListener('click', function () {
    // Call your API here
    console.log('Calling API');
  });


  // Append both instances to the container
  container.appendChild(box1);
  container.appendChild(box2);


  // }


  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('chatbox_space');

  // Insert the container above the 'chatbox' element
  chatbox.parentNode.insertBefore(container, chatbox);

  // await new Promise(resolve => setTimeout(resolve, 1000));
  // Prevent the default behavior (new line in contenteditable)  

  //////////////////////////////////////////////////////////////////////////////////
  message = questionInput
  // Send a request to the Flask server with the user's message
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
    body: JSON.stringify({ messages: [{ "sender_id": "user1", "conversation_id": "1", "prompt": message, "use_history": true }] }),

  });

  // Create a new TextDecoder to decode the streamed response text
  const decoder = new TextDecoder();

  // Set up a new ReadableStream to read the response body
  const reader = response.body.getReader();
  let chunks = "";

  // Read the response stream as chunks and append them to the chat log
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks += decoder.decode(value);

    chunks = chunks.replace('\n', '<br>');
    // solution
    const soln = document.getElementById("solution" + solutionDivCount.toString());
    console.log("Element: solution" + solutionDivCount.toString());
    soln.innerHTML = chunks;
  }

  markdownText = document.getElementById("solution" + solutionDivCount.toString()).innerText;
  const htmlText = markdownToHtml(markdownText);
  document.getElementById("solution" + solutionDivCount.toString()).innerHTML = htmlText;

});


const sendButton = document.getElementById('sendButton_proposal');

// Attach click event listener to the button
sendButton.addEventListener('click', function () {

  // console.log('Sending message:')
  // alert('EEEE')                


  (async () => {
    // Select all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Filter out checked checkboxes
    const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    // Get the ids of checked checkboxes
    const checkedIds = checkedCheckboxes.map(checkbox => checkbox.id);

    //console.log('CheckIds: ')
    //console.dir(checkedIds)


    const elementToRemove = "default-checkbox";
    const indexToRemove = checkedIds.indexOf(elementToRemove);
    console.dir('checkedIds')
    console.dir(checkedIds)

    if (indexToRemove !== -1) {
      checkedIds.splice(indexToRemove, 1);
      //console.log(`Removed "${elementToRemove}" from the array.`);

    } else {
      console.log(`"${elementToRemove}" not found in the array.`);
    }


    let string_input = "\n based on this text input, "
    // const searchStrings = ["overview_template", "introduction", "problems", "executive_summary"];
    const searchStrings = [
      "about_cyphercrescent",
      "our_team",
      "our_commitment",
      "our_clients",
      "overview_template",
      "introduction",
      "problems",
      "proposed_solution",
      "importance",
      "benefits",
      "executive_summary"
    ]
    // const searchStrings = ["overview_template", "introduction", "problems", "executive_summary"];
    const searchStrings_index = [4, 5, 6, 10];

    questionInput = document.getElementById("questionInput_proposal").innerText;
    //console.log("Clicked sendButton!!!", questionInput)

    document.getElementById("questionInput_proposal").innerText = "";

    allresultsArray = []

    let allresults = ""

    // const index = myArray.indexOf(searchText);

    for (const searchString of checkedIds) {
      let indexIds = searchStrings.indexOf(searchString)
      // if (indexIds == 0) {
      //console.log(`${searchString} found in the array`);
      // string_input = questionInput + ".\n based on this text input, give me a sample text that shows how a company called cyphercrescent's Cutting-Edge Production Optimization System effectively address the manufacturing efficiency challenges faced by oil companies in their quest to optimize production, and what distinguishes this solution from others in the market?"

      // Parameters
      let params = {
        "section_id": indexIds,
        "template_index": 0,
        "context": questionInput
      };


      allresults = allresults + '<br><br>' + await postData("/proposal", params)

    }

    // Log allresults to understand its structure
    console.log("Proposal API Response:", allresults)
    console.dir(allresults)

    // Get the container element
    const container = document.getElementById('container_proposal');

    let isFirstIteration = true;
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
          <img class="w-9 m-2" src="static/Images/user.png" alt="">
          <div id="question2"><span class="text-sm">"dd"</span></div>
        `;

    // Create the second instance
    const box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');

    box2.innerHTML = `
          <div class="box w-[35vw] flex justify-start space-x-6">
            <div class="w-9 h-9 m-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="flex space-y-4 flex-col space-x-96 ">          
              <div id="solution" style="padding-right: 30px;"><span class="text-sm">${allresults}</span></div>
            </div>
          </div>
        `;
    // }




    // Append both instances to the container      
    container.appendChild(box2);
    // });


    // Get the existing element with id 'chatbox'
    const chatbox = document.getElementById('next_proposal');

    // Insert the container above the 'chatbox' element
    chatbox.parentNode.insertBefore(container, chatbox);

  })();

});



async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error in postData:", error);
  }
}

function markdownToHtml(markdown) {
  // Convert Markdown headings
  markdown = markdown.replace(/^#\s*(.*)$/gm, '<h1>$1</h1>');
  markdown = markdown.replace(/^##\s*(.*)$/gm, '<h2>$1</h2>');
  markdown = markdown.replace(/^###\s*(.*)$/gm, '<h3>$1</h3>');
  markdown = markdown.replace(/^####\s*(.*)$/gm, '<h4>$1</h4>');
  markdown = markdown.replace(/^#####\s*(.*)$/gm, '<h5>$1</h5>');
  markdown = markdown.replace(/^######\s*(.*)$/gm, '<h6>$1</h6>');

  // Convert Markdown bold and italic
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert Markdown code block
  markdown = markdown.replace(/```(\w*)\s([\s\S]*?)```/g, '<pre><code class="$1">$2</code></pre>');

  // Convert Markdown inline code
  markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert Markdown horizontal rule
  markdown = markdown.replace(/^\s*[-*_](\s*[-*_]){2,}\s*$/gm, '<hr>');

  // Convert Markdown unordered list
  markdown = markdown.replace(/^\s*[*+-]\s(.*)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/<\/li>\s*<li>/g, '</li><li>');
  markdown = '<ul>' + markdown + '</ul>';

  // Convert Markdown ordered list
  markdown = markdown.replace(/^\s*\d+\.\s(.*)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/<\/li>\s*<li>/g, '</li><li>');
  markdown = '<ol>' + markdown + '</ol>';

  // Convert Markdown paragraph
  markdown = markdown.replace(/^\s*(.*)$/gm, '<p>$1</p>');

  return markdown;
}

const handleKeyDown = async (event) => {

  // if (event.ctrlKey && event.key === 'Enter') {
  if (event.shiftKey && event.key === 'Enter') {
    console.log('Shift + Enter pressed');
    return;
  }

  if (event.key === 'Enter') {
    console.log('Enter pressed!!!');
    questionInput = document.getElementById("questionInput").innerText;
    //console.log("Clicked sendButton!!!", questionInput)

    document.getElementById("questionInput").innerText = "";
    document.querySelector(".right2").style.display = "block"
    document.querySelector(".right1").style.display = "none"

    document.querySelector(".right_letter").style.display = "none"
    document.querySelector(".right_nda").style.display = "none"
    document.querySelector(".right_proposal").style.display = "none"

    // Parameters
    let params = {
      "sender_id": "1",
      "conversation_id": "1",
      "prompt": questionInput,
      "use_history": true
    };





    // Get the container element
    const container = document.getElementById('container');


    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    // box1.innerHTML = `
    //   <img class="w-9 m-2" src="static/Images/user.png" alt="">
    //   <div class="flex space-y-4 flex-col">
    //     <div id="question_"><span class="text-sm"><b>You</b></span></div>
    //     <div id="question2"><span class="text-sm">${responseObject["Human"]}</span></div>
    //   </div>
    // `;
    box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div class="flex space-y-4 flex-col">
        <div id="question_"><span class="text-sm"><b>You</b></span></div>
        <div id="question2"><span class="text-sm">${questionInput}</span></div>
      </div>
    `;

    // Create the second instance
    let box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
    // box2.innerHTML = `
    //   <div class="box w-[35vw] flex justify-start space-x-6">
    //     <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
    //     <div class="flex space-y-4 flex-col">
    //       <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
    //       <div id="solution"><span class="text-sm">${responseObject["AI"]}</span></div>
    //     </div>
    //   </div>
    // `;
    box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
          <div id="solution" style="padding-right: 30px;"><span class="text-sm">Loading... </span></div>        
        <br>

        <div class="svg-container flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md api-svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path>
          </svg>  
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md copy-svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      </div>
    `;


    // Add click event for the copy-svg icon
    box2.querySelector('.copy-svg').addEventListener('click', function () {
      // const solutionText = box2.querySelector('#solution').textContent;
      // Use the solutionText as needed, e.g., copy to clipboard
      // console.log('Copying:', solutionText);


      const solutionText = box2.querySelector('#solution').textContent;

      // Copy text to clipboard
      navigator.clipboard.writeText(solutionText)
        .then(() => {
          console.log('Text copied to clipboard:', solutionText);
          // You can add further handling or UI updates here if needed
        })
        .catch(err => {
          console.error('Unable to copy text to clipboard:', err);
          // Handle errors or show a message to the user
        });


    });

    // Add click event for the api-svg icon
    box2.querySelector('.api-svg').addEventListener('click', function () {
      // Call your API here
      console.log('Calling API');
    });

    // Append both instances to the container
    container.appendChild(box1);
    container.appendChild(box2);
    // });
    // };


    // Get the existing element with id 'chatbox'
    const chatbox = document.getElementById('chatbox_space');

    // Insert the container above the 'chatbox' element
    chatbox.parentNode.insertBefore(container, chatbox);



    //////////////////////////////////////////////////////////////////////////////////
    message = questionInput
    // Send a request to the Flask server with the user's message
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
      body: JSON.stringify({ messages: [{ "sender_id": "user1", "conversation_id": "1", "prompt": message, "use_history": true }] }),

    });

    // Create a new TextDecoder to decode the streamed response text
    const decoder = new TextDecoder();

    // Set up a new ReadableStream to read the response body
    const reader = response.body.getReader();
    let chunks = "";

    // Read the response stream as chunks and append them to the chat log
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks += decoder.decode(value);

      chunks = chunks.replace('\n', '<br>');
      // solution
      const soln = document.getElementById('solution');
      soln.innerHTML = chunks;
    }

    markdownText = document.getElementById("solution").innerText;
    const htmlText = markdownToHtml(markdownText);
    document.getElementById("solution").innerHTML = htmlText;

    ///////////////////////////////////////////////////////////////////////////////////

    // Create a new TextDecoder to decode the streamed response text
    // const decoder = new TextDecoder();

    // // Set up a new ReadableStream to read the response body
    // const reader = response.body.getReader();
    // let chunks = "";

    // // Read the response stream as chunks and append them to the chat log
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   chunks += decoder.decode(value);
    //   box2.innerHTML = chunks;
    // }

    // Prevent the default behavior (new line in contenteditable)
    event.preventDefault();

  }
};


const handleKeyDown2 = async (event) => {
  // if (event.ctrlKey && event.key === 'Enter') {
  if (event.shiftKey && event.key === 'Enter') {
    console.log('Shift + Enter pressed');
    return;
  }

  if (event.key === 'Enter') {
    questionInput = document.getElementById("questionInput2").innerText;
    //console.log("Clicked sendButton!!!", questionInput)

    document.getElementById("questionInput2").innerText = "";

    // Parameters
    let params = {
      "sender_id": "1",
      "conversation_id": "1",
      "prompt": questionInput,
      "use_history": true
    };

    // Log allresults to understand its structure
    //console.log("API Response:", allresults)

    //console.dir(allresults)

    // let responseObject = allresults

    // Get an array of keys
    // const keysArray = Object.keys(responseObject);

    // Get an array of values
    // const valuesArray = Object.values(responseObject);

    // Output the arrays
    //console.log('Keys:', keysArray);
    //console.log('Values:', valuesArray);

    // Get the container element
    const container = document.getElementById('container');

    // for (let key in responseObject) {
    //console.log(`Question: ${key}, Answer: ${responseObject[key]}`);



    // Create the first instance
    let box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
   <img class="w-9 m-2" src="static/Images/user.png" alt="">
   <div class="flex space-y-4 flex-col">
      <div id="question_"><span class="text-sm"><b>You</b></span></div>
      <div id="question2"><span class="text-sm">${questionInput}</span></div>
   </div>         
`;



    // Get all div elements on the page
    var allDivs = document.getElementsByTagName('div');

    // Initialize a counter for divs with id containing "solution"
    var solutionDivCount = 0;

    // Loop through all div elements
    for (var i = 0; i < allDivs.length; i++) {
      // Check if the current div's id contains the string "solution"
      if (allDivs[i].id && allDivs[i].id.indexOf('solution') !== -1) {
        solutionDivCount++;
      }
    }

    // Display the total count
    console.log('Total number of divs with id containing "solution":', solutionDivCount);



    // Create the second instance
    let box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
    box2.innerHTML = `
   <div class="box w-[35vw] flex justify-start space-x-6">
     <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
     <div class="flex space-y-4 flex-col">
       <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
       <div id=${"solution" + solutionDivCount.toString()} style="padding-right: 30px;"><span class="text-sm">Loading... </span></div>
       <br>

      <div class="svg-container flex">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md api-svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path>
        </svg>  
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md copy-svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
        </svg>
      </div>

     </div>
   </div>              
`;



    // Add click event for the copy-svg icon
    box2.querySelector('.copy-svg').addEventListener('click', function () {
      // const solutionText = box2.querySelector('#solution').textContent;
      // Use the solutionText as needed, e.g., copy to clipboard
      // console.log('Copying:', solutionText);


      const solutionText = box2.querySelector('#solution' + solutionDivCount.toString()).textContent;

      // Copy text to clipboard
      navigator.clipboard.writeText(solutionText)
        .then(() => {
          console.log('Text copied to clipboard:', solutionText);
          // You can add further handling or UI updates here if needed
        })
        .catch(err => {
          console.error('Unable to copy text to clipboard:', err);
          // Handle errors or show a message to the user
        });


    });

    // Add click event for the api-svg icon
    box2.querySelector('.api-svg').addEventListener('click', function () {
      // Call your API here
      console.log('Calling API');
    });


    // Append both instances to the container
    container.appendChild(box1);
    container.appendChild(box2);


    // }


    // Get the existing element with id 'chatbox'
    const chatbox = document.getElementById('chatbox_space');

    // Insert the container above the 'chatbox' element
    chatbox.parentNode.insertBefore(container, chatbox);

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // Prevent the default behavior (new line in contenteditable)  

    //////////////////////////////////////////////////////////////////////////////////
    message = questionInput
    // Send a request to the Flask server with the user's message
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
      body: JSON.stringify({ messages: [{ "sender_id": "user1", "conversation_id": "1", "prompt": message, "use_history": true }] }),

    });

    // Create a new TextDecoder to decode the streamed response text
    const decoder = new TextDecoder();

    // Set up a new ReadableStream to read the response body
    const reader = response.body.getReader();
    let chunks = "";

    // Read the response stream as chunks and append them to the chat log
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks += decoder.decode(value);

      chunks = chunks.replace('\n', '<br>');
      // solution
      const soln = document.getElementById("solution" + solutionDivCount.toString());
      soln.innerHTML = chunks;
    }

    markdownText = document.getElementById("solution" + solutionDivCount.toString()).innerText;
    const htmlText = markdownToHtml(markdownText);
    document.getElementById("solution" + solutionDivCount.toString()).innerHTML = htmlText;

    ///////////////////////////////////////////////////////////////////////////////////


    event.preventDefault();
    // }
  };
}

const handleKeyDown_letter = async (event) => {
  // if (event.ctrlKey && event.key === 'Enter') {

  if (event.shiftKey && event.key === 'Enter') {
    console.log('Shift + Enter pressed');
    return;
  }

  if (event.key === 'Enter') {

    questionInput = document.getElementById("questionInput_letter").innerText;
    //console.log("Clicked sendButton!!!", questionInput)

    document.getElementById("questionInput_letter").innerText = "";

    // Get the answer and populate it! 
    // let allresults = await postData("/letter", { "context": questionInput })

    // Log allresults to understand its structure
    //console.log("API Response:", allresults)

    //console.dir(allresults)

    // Get the container element
    const container = document.getElementById('container_letter');

    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${questionInput}</span></div>
    `;

    let uniqueId = `solution-${Date.now()}`;

    // Create the second instance
    let box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
    box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm">CCL Bot</span></div>
          <div id="${uniqueId}"><span class="text-sm">Loading... </span></div>

          <br>

        <div class="svg-container flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md api-svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path>
          </svg>  
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md copy-svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
          </svg>
        </div>
        </div>
      </div>
    `;

    // Append both instances to the container
    container.appendChild(box1);
    container.appendChild(box2);
    // });

    // Add click event for the copy-svg icon
    box2.querySelector('.copy-svg').addEventListener('click', function () {
      // const solutionText = box2.querySelector('#solution').textContent;
      // Use the solutionText as needed, e.g., copy to clipboard
      // console.log('Copying:', solutionText);


      const solutionText = box2.querySelector('#solution').textContent;

      // Copy text to clipboard
      navigator.clipboard.writeText(solutionText)
        .then(() => {
          console.log('Text copied to clipboard:', solutionText);
          // You can add further handling or UI updates here if needed
        })
        .catch(err => {
          console.error('Unable to copy text to clipboard:', err);
          // Handle errors or show a message to the user
        });


    });

    // Get the existing element with id 'chatbox'
    const chatbox = document.getElementById('container_letter');

    // Insert the container above the 'chatbox' element
    chatbox.parentNode.insertBefore(container, chatbox);


    message = questionInput
    // Send a request to the Flask server with the user's message
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
      body: JSON.stringify({ messages: [{ "sender_id": "user1", "conversation_id": "1", "prompt": message, "use_history": true }] }),

    });


    // Create a new TextDecoder to decode the streamed response text
    const decoder = new TextDecoder();

    // Set up a new ReadableStream to read the response body
    const reader = response.body.getReader();
    let chunks = "";

    // Read the response stream as chunks and append them to the chat log
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks += decoder.decode(value);
      // solution

      // Split the chunks by newline characters
      // chunks = chunks.split('\n');

      // Replace '\n' with '<br>' in the chunks
      chunks = chunks.replace('\n', '<br>');

      // Append each line with appropriate HTML formatting
      // for (let i = 0; i < lines.length - 1; i++) {
      //   const line = lines[i];
      //   const p = document.createElement('p');
      //   p.textContent = line;
      //   soln.appendChild(p);
      // }

      // Update chunks with the last incomplete line
      // chunks = lines[lines.length - 1];

      const soln = document.getElementById(uniqueId);
      soln.innerHTML = chunks;
    }

    markdownText = document.getElementById(uniqueId).innerText;
    const htmlText = markdownToHtml(markdownText);
    document.getElementById(uniqueId).innerHTML = htmlText;

    // Prevent the default behavior (new line in contenteditable)
    event.preventDefault();
  }
};





const handleKeyDown_proposal = async (event) => {
  // if (event.ctrlKey && event.key === 'Enter') {

  if (event.shiftKey && event.key === 'Enter') {
    console.log('Shift + Enter pressed');
    return;
  }

  if (event.key === 'Enter') {
    // alert('Generate section')

    // Select all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Filter out checked checkboxes
    const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    // Get the ids of checked checkboxes
    const checkedIds = checkedCheckboxes.map(checkbox => checkbox.id);

    //console.log('CheckIds: ')
    //console.dir(checkedIds)


    const elementToRemove = "default-checkbox";
    const indexToRemove = checkedIds.indexOf(elementToRemove);
    console.dir('checkedIds')
    console.dir(checkedIds)

    if (indexToRemove !== -1) {
      checkedIds.splice(indexToRemove, 1);
      //console.log(`Removed "${elementToRemove}" from the array.`);

    } else {
      console.log(`"${elementToRemove}" not found in the array.`);
    }


    // 4  - overview_template
    // 5  - introduction
    // 6  - problems
    // 10  - executive_summary

    let string_input = "\n based on this text input, "
    // const searchStrings = ["overview_template", "introduction", "problems", "executive_summary"];
    const searchStrings = [
      "about_cyphercrescent",
      "our_team",
      "our_commitment",
      "our_clients",
      "overview_template",
      "introduction",
      "problems",
      "proposed_solution",
      "importance",
      "benefits",
      "executive_summary"
    ]
    // const searchStrings = ["overview_template", "introduction", "problems", "executive_summary"];
    const searchStrings_index = [4, 5, 6, 10];

    questionInput = document.getElementById("questionInput_proposal").innerText;
    //console.log("Clicked sendButton!!!", questionInput)

    document.getElementById("questionInput_proposal").innerText = "";

    allresultsArray = []

    let allresults = ""

    // const index = myArray.indexOf(searchText);

    // for (const searchString of checkedIds) {
    //   let indexIds = searchStrings.indexOf(searchString)
    //   // if (indexIds == 0) {
    //   //console.log(`${searchString} found in the array`);
    //   // string_input = questionInput + ".\n based on this text input, give me a sample text that shows how a company called cyphercrescent's Cutting-Edge Production Optimization System effectively address the manufacturing efficiency challenges faced by oil companies in their quest to optimize production, and what distinguishes this solution from others in the market?"

    //   // Parameters
    //   let params = {
    //     "section_id": indexIds,
    //     "template_index": 0,
    //     "context": questionInput
    //   };


    //   // // allresults = allresults + '<br><br>' + await postData("/proposal", params)





    //   // Get an array of keys
    //   // const keysArray = Object.keys(responseObject);

    //   // Get an array of values
    //   // const valuesArray = Object.values(responseObject);

    //   // Output the arrays
    //   //console.log('Keys:', keysArray);
    //   //console.log('Values:', valuesArray);


    //   // for (let key in responseObject) {
    //   //   allresultsArray.push(responseObject[key])
    //   // }
    //   // } 

    //   // else {
    //   //   allresults = await postData("/next", { "sections": checkedIds })
    //   //   // break;      
    //   //   allresultsArray.push(...allresults)
    //   // }


    // }

    // Log allresults to understand its structure
    // console.log("Proposal API Response:", allresults)
    // console.dir(allresults)

    //console.log('allresultsArray:.......')
    //console.log(allresultsArray)


    // Get the container element
    const container = document.getElementById('container_proposal');

    let isFirstIteration = true;
    // Loop through 'allresults' array and create instances dynamically
    // allresults.forEach(res => {

    //console.log(`Question: ${res.question}, Answer: ${res.answer}`);

    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
        <img class="w-9 m-2" src="static/Images/user.png" alt="">
        <div id="question2"><span class="text-sm">"dd"</span></div>
      `;

    // Create the second instance
    const box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');


    //   if (isFirstIteration) {
    //     box2.innerHTML = `
    //   <div class="box w-[35vw] flex justify-start space-x-6">
    //     <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
    //     <div class="flex space-y-4 flex-col">
    //       <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
    //       <div id="solution"><span class="text-sm">${allresults}</span></div>
    //     </div>
    //   </div>
    // `;
    //     isFirstIteration = false;
    //   } else {
    box2.innerHTML = `
        <div class="box w-[35vw] flex justify-start space-x-6">
          <div class="w-9 h-9 m-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div class="flex space-y-4 flex-col space-x-96 ">          
            <div id="solution" style="padding-right: 30px;"><span class="text-sm"> </span></div>

        <br>
        <div class="svg-container flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md api-svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path>
          </svg>  
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md copy-svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
          </svg>
        </div>

          </div>
        </div>
      `;
    // }

    // Add click event for the copy-svg icon
    box2.querySelector('.copy-svg').addEventListener('click', function () {
      // const solutionText = box2.querySelector('#solution').textContent;
      // Use the solutionText as needed, e.g., copy to clipboard
      // console.log('Copying:', solutionText);


      const solutionText = box2.querySelector('#solution').textContent;

      // Copy text to clipboard
      navigator.clipboard.writeText(solutionText)
        .then(() => {
          console.log('Text copied to clipboard:', solutionText);
          // You can add further handling or UI updates here if needed
        })
        .catch(err => {
          console.error('Unable to copy text to clipboard:', err);
          // Handle errors or show a message to the user
        });


    });


    // Append both instances to the container      
    container.appendChild(box2);
    // });


    // Get the existing element with id 'chatbox'
    const chatbox = document.getElementById('next_proposal');

    // Insert the container above the 'chatbox' element
    chatbox.parentNode.insertBefore(container, chatbox);


    message = questionInput
    let chunks = "";

    for (const searchString of checkedIds) {
      let indexIds = searchStrings.indexOf(searchString)

      chunks = chunks + '<br>' + '<br>';

      // if (indexIds == 0) {
      //console.log(`${searchString} found in the array`);
      // string_input = questionInput + ".\n based on this text input, give me a sample text that shows how a company called cyphercrescent's Cutting-Edge Production Optimization System effectively address the manufacturing efficiency challenges faced by oil companies in their quest to optimize production, and what distinguishes this solution from others in the market?"

      // Parameters
      let params = {
        "section_id": indexIds,
        "template_index": 0,
        "context": questionInput
      };


      // // allresults = allresults + '<br><br>' + await postData("/proposal", params)

      // Send a request to the Flask server with the user's message
      const response = await fetch("/proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
        body: JSON.stringify(params),
        // body: JSON.stringify({ messages: [{ "sender_id": "user1", "conversation_id": "1", "prompt": message, "use_history": true }] }),

      });

      // Create a new TextDecoder to decode the streamed response text
      const decoder = new TextDecoder();

      // Set up a new ReadableStream to read the response body
      const reader = response.body.getReader();


      // Read the response stream as chunks and append them to the chat log
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks += decoder.decode(value);

        chunks = chunks.replace('\n', '<br>');

        // solution
        const soln = document.getElementById('solution');
        soln.innerHTML = chunks;
        // allresults = allresults + '<br><br>' + await postData("/proposal", params)
      }

      markdownText = document.getElementById("solution").innerText;
      const htmlText = markdownToHtml(markdownText);
      document.getElementById("solution").innerHTML = htmlText;

      // Get an array of keys
      // const keysArray = Object.keys(responseObject);

      // Get an array of values
      // const valuesArray = Object.values(responseObject);

      // Output the arrays
      //console.log('Keys:', keysArray);
      //console.log('Values:', valuesArray);


      // for (let key in responseObject) {
      //   allresultsArray.push(responseObject[key])
      // }
      // } 

      // else {
      //   allresults = await postData("/next", { "sections": checkedIds })
      //   // break;      
      //   allresultsArray.push(...allresults)
      // }


    }



    event.preventDefault();


  }

}


const handleKeyDown_nda = async (event) => {

  let nda_index = parseInt(localStorage.getItem('nda_index'))
  let nda_questions_2 = ""

  // if (event.ctrlKey && event.key === 'Enter') {

  if (event.shiftKey && event.key === 'Enter') {
    console.log('Shift + Enter pressed');
    return;
  }

  if (event.key === 'Enter') {
    // if (event.key === 'Enter') {

    questionInput = document.getElementById("questionInput_nda").innerText;
    questionInput = questionInput.replace(/\n/g, '');

    //console.log("Clicked NDA sendButton!!!", questionInput)

    // document.getElementById("questionInput_nda").innerText = "";

    // Loop through each child div element and remove it
    while (document.getElementById("questionInput_nda").firstElementChild != null) {

      document.getElementById("questionInput_nda").removeChild(document.getElementById("questionInput_nda").firstElementChild)
    }
    document.getElementById("questionInput_nda").innerText = "";


    nda_questions_2 = nda_questions[nda_index]

    let nda_answers_raw = localStorage.getItem('nda_answers');
    let nda_answers = [];

    if (nda_answers_raw) {
      try {
        nda_answers = JSON.parse(nda_answers_raw);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // Handle the error appropriately, e.g., set nda_answers to an empty array
        nda_answers = [];
      }
    }


    //console.log('nda_index>>>>', nda_index)

    // Add a new string to the array
    nda_answers.push(questionInput);

    // Save the updated array back to localStorage
    localStorage.setItem('nda_answers', JSON.stringify(nda_answers));
    nda_index += 1
    localStorage.setItem('nda_index', nda_index);


    ///////////////////////////////////////////////////////

    let box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
    box2.innerHTML = `
       <div class="box w-[35vw] flex justify-start space-x-6">
         <img class="w-9 h-9 m-2" src="static/Images/user.png" alt="">
         <div class="flex space-y-4 flex-col">
           <div id="question1"><span class="text-sm">You</span></div>
           <div id="solution" style="padding-right: 30px;"><span class="text-sm">${questionInput}</span></div>
         </div>
       </div>
     `;


    ///////////////////////////////////////////////////////

    let container = document.getElementById('container_nda');

    let box1 = document.createElement('div');



    container.appendChild(box2);
    container.appendChild(box1);

    // Get the existing element with id 'chatbox'
    const chatbox2 = document.getElementById('next_nda');

    chatbox2.parentNode.insertBefore(container, chatbox2);

    console.log('ALL_ANSWERS:>>>')
    console.log(nda_answers)

    console.log('NDA_QUESTIONS::::', nda_questions[nda_index])

    if (nda_index == 5) {
      console.log('nda_answers:::>>>>>')
      console.log(nda_answers)

      // document.getElementById('question2').innerText = allresults
      box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
      box1.innerHTML = `
        <img class="w-9 m-2" src="static/Images/cclbot.png" alt="">
        <div id="solution_nda" style="padding-right: 30px;"><span class="text-sm">... </span></div>
      `;

      // Append both instances to the container      
      container.appendChild(box1);

      // let allresults = await postData("/nda", { "answers": nda_answers })
      //console.log(allresults)

      message = questionInput
      // Send a request to the Flask server with the user's message
      const response = await fetch("/nda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
        // {'answers': ['sddsf', 'sdsdf', 'sdfds', 'sdfsd', 'sdfsd']}
        body: JSON.stringify({ "answers": nda_answers }),
      });

      // Create a new TextDecoder to decode the streamed response text
      const decoder = new TextDecoder();

      // Set up a new ReadableStream to read the response body
      const reader = response.body.getReader();
      let chunks = "";




      //   box2.innerHTML = `
      //   <div class="box w-[35vw] flex justify-start space-x-6">
      //     <div class="w-9 h-9 m-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      //     <div class="flex space-y-4 flex-col space-x-96 ">          
      //       <div id="solution"><span class="text-sm"> </span></div>

      //   <br>
      //   <div class="svg-container flex">
      //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md api-svg">
      //       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path>
      //     </svg>  
      //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md copy-svg">
      //         <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path>
      //     </svg>
      //   </div>

      //     </div>
      //   </div>
      // `;
      // }    


      // Read the response stream as chunks and append them to the chat log
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks += decoder.decode(value);

        chunks = chunks.replace('\n', '<br>');

        // console.log(chunks)
        // solution
        const soln = document.getElementById('solution_nda');
        soln.innerHTML = chunks;
      }

      markdownText = document.getElementById("solution_nda").innerText;
      const htmlText = markdownToHtml(markdownText);
      document.getElementById("solution_nda").innerHTML = htmlText;

    } else {
      box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
      box1.innerHTML = `
        <img class="w-9 m-2" src="static/Images/cclbot.png" alt="">
        <div id="question2"><span class="text-sm">Q: ${nda_questions[nda_index]}</span></div>
      `;
    }

    // Get the existing element with id 'chatbox'
    const chatbox3 = document.getElementById('container_nda');

    // Insert the container above the 'chatbox' element
    chatbox3.parentNode.insertBefore(container, chatbox3);

  }


};



newChat.addEventListener("click", async () => {
  location.reload();

})

sendButton.addEventListener("click", async () => {
  //console.log("Clicked sendButton!!!")
  questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";
  document.querySelector(".right2").style.display = "block"
  document.querySelector(".right1").style.display = "none"
  document.querySelector(".right_letter").style.display = "none"
  document.querySelector(".right_nda").style.display = "none"
  document.querySelector(".right_proposal").style.display = "none"


  // Get the answer and populate it! 
  let allresults = await postData("/api", { "question": questionInput })

  // Get the container element
  const container = document.getElementById('container');


  // Loop through 'allresults' array and create instances dynamically
  allresults.forEach(res => {

    //console.log(`Question: ${res.question}, Answer: ${res.answer}`);

    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${res.question}</span></div>
    `;

    // Create the second instance
    let box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
    box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm">CCL Bot</span></div>
          <div id="solution" style="padding-right: 30px;"><span class="text-sm">${res.answer}</span></div>
        </div>
      </div>
    `;

    // Append both instances to the container
    container.appendChild(box1);
    container.appendChild(box2);
  });


  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('chatbox');

  // Insert the container above the 'chatbox' element
  chatbox.parentNode.insertBefore(container, chatbox);


})



// sendButton2.addEventListener("click", async () => {
//   //console.log("Clicked sendButton!!!")
//   questionInput = document.getElementById("questionInput2").value;
//   document.getElementById("questionInput2").value = "";
//   document.querySelector(".right2").style.display = "block"
//   document.querySelector(".right1").style.display = "none"

//   document.querySelector(".right_letter").style.display = "none"
//   document.querySelector(".right_nda").style.display = "none"
//   document.querySelector(".right_proposal").style.display = "none"

//   // Get the answer and populate it! 
//   let allresults = await postData("/api", { "question": questionInput })

//   // Get the container element
//   const container = document.getElementById('container');


//   // Loop through 'allresults' array and create instances dynamically
//   allresults.forEach(res => {

//     //console.log(`Question: ${res.question}, Answer: ${res.answer}`);

//     // Create the first instance
//     const box1 = document.createElement('div');
//     box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
//     box1.innerHTML = `
//       <img class="w-9 m-2" src="static/Images/user.png" alt="">
//       <div id="question2"><span class="text-sm">${res.question}</span></div>
//     `;

//     // Create the second instance
//     const box2 = document.createElement('div');
//     box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
//     box2.innerHTML = `
//       <div class="box w-[35vw] flex justify-start space-x-6">
//         <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
//         <div class="flex space-y-4 flex-col">
//           <div id="question1"><span class="text-sm">CCL Bot</span></div>
//           <div id="solution" style="padding-right: 30px;"><span class="text-sm">${res.answer}</span></div>
//         </div>
//       </div>
//     `;

//     // Append both instances to the container
//     container.appendChild(box1);
//     container.appendChild(box2);
//   });


//   // Get the existing element with id 'chatbox'
//   const chatbox = document.getElementById('chatbox');

//   // Insert the container above the 'chatbox' element
//   chatbox.parentNode.insertBefore(container, chatbox);


// })



proposal.addEventListener("click", async (e) => {
  e.preventDefault();

  document.querySelector(".right_proposal").style.display = "block"
  document.querySelector(".right2").style.display = "none"
  document.querySelector(".right1").style.display = "none"

  const container = document.getElementById('container_proposal');


  // Create the first instance
  const box1 = document.createElement('div');
  box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
  box1.innerHTML = `
     <img class="w-9 m-2" src="static/Images/user.png" alt="">
     <div id="question2"><span class="text-sm">Please enter a brief description of the proposal, highlighting the problems you want to solve, as well as the benefits of your solution.</span></div>
   `;

  container.appendChild(box1);

  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('next_proposal');

  chatbox.parentNode.insertBefore(container, chatbox);


})


document.getElementById('default-checkbox').addEventListener('change', function () {
  var checkboxes = document.querySelectorAll('.itemsrow input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = document.getElementById('default-checkbox').checked;
  });
});



letter.addEventListener("click", async () => {
  //console.log("Clicked Letter!!!")
  // questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";
  document.querySelector(".right2").style.display = "none"
  document.querySelector(".right_letter").style.display = "block"
  document.querySelector(".right1").style.display = "none"
  document.querySelector(".right_proposal").style.display = "none"
  document.querySelector(".right_nda").style.display = "none"

  // Get the container element
  const container = document.getElementById('container_letter');

  // Create the first instance
  const box1 = document.createElement('div');
  box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
  box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">Please enter a brief description of the letter</span></div>
    `;


  container.appendChild(box1);

  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('next_letter');

  chatbox.parentNode.insertBefore(container, chatbox);


})


nda.addEventListener("click", async () => {
  //console.log("Clicked nda!!!")
  // questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";
  document.querySelector(".right2").style.display = "none"
  document.querySelector(".right_letter").style.display = "none"
  document.querySelector(".right_nda").style.display = "block"
  document.querySelector(".right1").style.display = "none"
  document.querySelector(".right_proposal").style.display = "none"


  // Get the container element
  const container = document.getElementById('container_nda');

  nda_index = 0
  localStorage.setItem('nda_index', 0);

  // Create the first instance
  const box1 = document.createElement('div');
  box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
  box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm"> ${nda_questions[nda_index]}</span></div>
    `;


  container.appendChild(box1);

  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('next_nda');

  chatbox.parentNode.insertBefore(container, chatbox);


})

document.getElementById('default-checkbox').addEventListener('change', function () {
  var checkboxes = document.querySelectorAll('.itemsrow input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = document.getElementById('default-checkbox').checked;
  });
});




document.getElementById('nextButton').addEventListener("click", async (e) => {
  e.preventDefault();

  // Select all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Filter out checked checkboxes
  const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

  // Get the ids of checked checkboxes
  const checkedIds = checkedCheckboxes.map(checkbox => checkbox.id);

  console.log('CheckIds: ')
  console.dir(checkedIds)


  const elementToRemove = "default-checkbox";
  const indexToRemove = checkedIds.indexOf(elementToRemove);

  if (indexToRemove !== -1) {
    checkedIds.splice(indexToRemove, 1);
    //console.log(`Removed "${elementToRemove}" from the array.`);
    //console.dir(checkedIds)
  } else {
    console.log(`"${elementToRemove}" not found in the array.`);
  }


  // 4  - overview_template
  // 5  - introduction
  // 6  - problems
  // 10  - executive_summary

  let string_input = "\n based on this text input, "
  const searchStrings = ["overview_template", "introduction", "problems", "executive_summary"];
  const searchStrings_index = [4, 5, 6, 10];

  questionInput = document.getElementById("questionInput_proposal").innerText;
  console.log("Clicked sendButton!!!", questionInput)

  document.getElementById("questionInput_proposal").innerText = "";

  allresultsArray = []

  // const index = myArray.indexOf(searchText);

  for (const searchString of checkedIds) {
    // if (checkedIds.includes(searchString)) {
    let indexIds = searchStrings.indexOf(searchString)
    if (indexIds == 0) {
      console.log(`${searchString} found in the array`);
      string_input = questionInput + ".\n based on this text input, give me a sample text that shows how a company called cyphercrescent's Cutting-Edge Production Optimization System effectively address the manufacturing efficiency challenges faced by oil companies in their quest to optimize production, and what distinguishes this solution from others in the market?"

      // Parameters
      let params = {
        "sender_id": "11112222",
        "conversation_id": "1",
        "prompt": string_input,
        "use_history": true
      };


      let allresults = await postData("/api", params)

      // Log allresults to understand its structure
      //console.log("API Response:", allresults)
      //console.dir(allresults)

      let responseObject = allresults

      // Get an array of keys
      const keysArray = Object.keys(responseObject);

      // Get an array of values
      const valuesArray = Object.values(responseObject);

      // Output the arrays
      //console.log('Keys:', keysArray);
      //console.log('Values:', valuesArray);


      for (let key in responseObject) {

        console.log(`Question: ${res.Human}, Answer: ${res.AI}`);
        console.log(`Question: ${key}, Answer: ${responseObject[key]}`);
        allresultsArray.push(responseObject[key])
      }
    } else {
      //console.log(`${searchString} not found in the array`);
      allresults = await postData("/next", { "sections": checkedIds })
      // break;      
      allresultsArray.push(...allresults)
    }


  }

  //console.log('allresultsArray:.......')
  //console.log(allresultsArray)


  // Get the container element
  const container = document.getElementById('container_proposal');

  let isFirstIteration = true;
  // Loop through 'allresults' array and create instances dynamically
  allresults.forEach(res => {

    //console.log(`Question: ${res.question}, Answer: ${res.answer}`);

    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
      <img class="w-9 m-2" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${res.question}</span></div>
    `;

    // Create the second instance
    const box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');


    if (isFirstIteration) {
      box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 m-2" src="static/Images/cclbot.png" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
          <div id="solution" style="padding-right: 30px;"><span class="text-sm">${res.answer}</span></div>
        </div>
      </div>
    `;
      isFirstIteration = false;
    } else {
      box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <div class="w-9 h-9 m-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="flex space-y-4 flex-col space-x-96 ">          
          <div id="solution" style="padding-right: 30px;"><span class="text-sm">${res.answer}</span></div>
        </div>
      </div>
    `;
    }




    // Append both instances to the container
    container.appendChild(box2);
  });


  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('next_proposal');

  // Insert the container above the 'chatbox' element
  chatbox.parentNode.insertBefore(container, chatbox);

});



function showSvg(element) {
  const svgId = element.querySelector('svg[class="icon-md"]').id;
  document.getElementById(svgId).style.display = 'inline-block';
}

function hideSvg(element) {
  const svgId = element.querySelector('svg[class="icon-md"]').id;
  document.getElementById(svgId).style.display = 'none';
}


async function deleteChat(element) {
  const parentDiv = element.closest('.chat');
  const index = parentDiv.dataset.index;

  // Make a POST request with the index data to your Python API
  let allresults = await postData("/api", index)
}


window.addEventListener('beforeunload', function (event) {
  var confirmationMessage = 'Are you sure you want to leave?'
  //console.log(confirmationMessage)

  localStorage.setItem('nda_answers', [])
});


function toggleDivVisibility() {
  const menuDiv = document.getElementById('menu');

  // Check the current state
  const currentState = menuDiv.getAttribute('data-headlessui-state');

  // Toggle the visibility and apply animation
  if (currentState === 'closed') {
    // Show the div with animation
    menuDiv.style.opacity = '1';
    menuDiv.style.transform = 'translateY(0)';
    menuDiv.setAttribute('data-headlessui-state', 'open');
  } else {
    // Hide the div with animation
    menuDiv.style.opacity = '0';
    menuDiv.style.transform = 'translateY(-100%)';
    menuDiv.setAttribute('data-headlessui-state', 'closed');
  }
}

// Example: Call toggleDivVisibility when you want to toggle the div
document.getElementById('headlessui-menu-button').addEventListener("click", async (e) => {
  toggleDivVisibility();
})