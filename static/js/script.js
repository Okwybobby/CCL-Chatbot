// Example POST method implementation:
// async function postData(url = "", data = {}) {
//   const response = await fetch(url, {
//     method: "POST", headers: {
//       "Content-Type": "application/json",
//     }, body: JSON.stringify(data),
//   });
//   return response.json();
// }

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


const handleKeyDown = async (event) => {
  if (event.ctrlKey && event.key === 'Enter') {


    
    questionInput = document.getElementById("questionInput").innerText;
    console.log("Clicked sendButton!!!", questionInput)

    document.getElementById("questionInput").innerText = "";
    document.querySelector(".right2").style.display = "block"
    document.querySelector(".right1").style.display = "none"

    // question1.innerHTML = questionInput;
    // question2.innerHTML = questionInput;

    // Get the answer and populate it! 
    let allresults = await postData("/api", { "question": questionInput })

    // Log allresults to understand its structure
    console.log("API Response:", allresults)

    console.dir(allresults)

    // Get the container element
    const container = document.getElementById('container');




    // Loop through 'allresults' array and create instances dynamically
    allresults.forEach(res => {

      console.log(`Question: ${res.question}, Answer: ${res.answer}`);

      // Create the first instance
      const box1 = document.createElement('div');
      box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
      box1.innerHTML = `
      <img class="w-9 ml-96" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${res.question}</span></div>
    `;

      // Create the second instance
      let box2 = document.createElement('div');
      box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
      box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 ml-96" src="https://chat.openai.com/favicon.ico" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm">CCL Bot</span></div>
          <div id="solution"><span class="text-sm">${res.answer}</span></div>
        </div>
      </div>
    `;

      // Append both instances to the container
      container.appendChild(box1);
      container.appendChild(box2);
    });


    // Get the existing element with id 'chatbox'
    const chatbox = document.getElementById('chatbox_space');

    // Insert the container above the 'chatbox' element
    chatbox.parentNode.insertBefore(container, chatbox);

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // Prevent the default behavior (new line in contenteditable)
    event.preventDefault();
  }
};


const handleKeyDown2 = async (event) => {
  if (event.ctrlKey && event.key === 'Enter') {


    
    questionInput = document.getElementById("questionInput2").innerText;
    console.log("Clicked sendButton!!!", questionInput)

    document.getElementById("questionInput2").innerText = "";
    // document.querySelector(".right2").style.display = "block"
    // document.querySelector(".right1").style.display = "none"

    // question1.innerHTML = questionInput;
    // question2.innerHTML = questionInput;

    // Get the answer and populate it! 
    let allresults = await postData("/api", { "question": questionInput })

    // Log allresults to understand its structure
    console.log("API Response:", allresults)

    console.dir(allresults)

    // Get the container element
    const container = document.getElementById('container');




    // Loop through 'allresults' array and create instances dynamically
    allresults.forEach(res => {

      console.log(`Question: ${res.question}, Answer: ${res.answer}`);

      // Create the first instance
      const box1 = document.createElement('div');
      box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
      box1.innerHTML = `
      <img class="w-9 ml-96" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${res.question}</span></div>
    `;

      // Create the second instance
      let box2 = document.createElement('div');
      box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
      box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 ml-96" src="https://chat.openai.com/favicon.ico" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm">CCL Bot</span></div>
          <div id="solution"><span class="text-sm">${res.answer}</span></div>
        </div>
      </div>
    `;

      // Append both instances to the container
      container.appendChild(box1);
      container.appendChild(box2);
    });


    // Get the existing element with id 'chatbox'
    const chatbox = document.getElementById('chatbox_space');

    // Insert the container above the 'chatbox' element
    chatbox.parentNode.insertBefore(container, chatbox);

    // await new Promise(resolve => setTimeout(resolve, 1000));
    // Prevent the default behavior (new line in contenteditable)
    event.preventDefault();
  }
};



sendButton.addEventListener("click", async () => {
  console.log("Clicked sendButton!!!")
  questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";
  document.querySelector(".right2").style.display = "block"
  document.querySelector(".right1").style.display = "none"

  // question1.innerHTML = questionInput;
  // question2.innerHTML = questionInput;

  // Get the answer and populate it! 
  let allresults = await postData("/api", { "question": questionInput })

  // Get the container element
  const container = document.getElementById('container');


  // Loop through 'allresults' array and create instances dynamically
  allresults.forEach(res => {

    console.log(`Question: ${res.question}, Answer: ${res.answer}`);

    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
      <img class="w-9 ml-96" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${res.question}</span></div>
    `;

    // Create the second instance
    let box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
    box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 ml-96" src="https://chat.openai.com/favicon.ico" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm">CCL Bot</span></div>
          <div id="solution"><span class="text-sm">${res.answer}</span></div>
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


  // results.forEach(result => {
  // Access each element in the array and perform actions
  // console.log(`Question: ${result.question}, Answer: ${result.answer}`);
  // Perform additional actions as needed

  // question1.innerHTML = result.question
  // solution.innerHTML = result.answer
  // });


})


sendButton2.addEventListener("click", async () => {
  console.log("Clicked sendButton!!!")
  questionInput = document.getElementById("questionInput2").value;
  document.getElementById("questionInput2").value = "";
  document.querySelector(".right2").style.display = "block"
  document.querySelector(".right1").style.display = "none"

  // question1.innerHTML = questionInput;
  // question2.innerHTML = questionInput;

  // Get the answer and populate it! 
  let allresults = await postData("/api", { "question": questionInput })

  // Get the container element
  const container = document.getElementById('container');


  // Loop through 'allresults' array and create instances dynamically
  allresults.forEach(res => {

    console.log(`Question: ${res.question}, Answer: ${res.answer}`);

    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
      <img class="w-9 ml-96" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${res.question}</span></div>
    `;

    // Create the second instance
    const box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');
    box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 ml-96" src="https://chat.openai.com/favicon.ico" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm">CCL Bot</span></div>
          <div id="solution"><span class="text-sm">${res.answer}</span></div>
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


  // results.forEach(result => {
  // Access each element in the array and perform actions
  // console.log(`Question: ${result.question}, Answer: ${result.answer}`);
  // Perform additional actions as needed

  // question1.innerHTML = result.question
  // solution.innerHTML = result.answer
  // });


})



proposal.addEventListener("click", async (e) => {
  e.preventDefault();


  // document.getElementById("questionInput2").value = "";
  document.querySelector(".right_proposal").style.display = "block"
  document.querySelector(".right2").style.display = "none"
  document.querySelector(".right1").style.display = "none"

  const container = document.getElementById('container_proposal');

  // alert('you clicked proposal')
  // Create the first instance
  const box1 = document.createElement('div');
  box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
  box1.innerHTML = `
     <img class="w-9 ml-96" src="static/Images/user.png" alt="">
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




document.getElementById('nextButton').addEventListener("click", async (e) => {
  e.preventDefault();

  // alert('Generate section')

  // Select all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Filter out checked checkboxes
  const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

  // Get the ids of checked checkboxes
  const checkedIds = checkedCheckboxes.map(checkbox => checkbox.id);

  let allresults = await postData("/next", { "sections": checkedIds })


  // Get the container element
  const container = document.getElementById('container_proposal');

  let isFirstIteration = true;
  // Loop through 'allresults' array and create instances dynamically
  allresults.forEach(res => {

    console.log(`Question: ${res.question}, Answer: ${res.answer}`);

    // Create the first instance
    const box1 = document.createElement('div');
    box1.classList.add('box1', 'm-auto', 'py-7', 'px-40', 'flex', 'justify-start', 'w-[35vw]', 'items-center', 'space-x-6');
    box1.innerHTML = `
      <img class="w-9 ml-96" src="static/Images/user.png" alt="">
      <div id="question2"><span class="text-sm">${res.question}</span></div>
    `;

    // Create the second instance
    const box2 = document.createElement('div');
    box2.classList.add('box2', 'bg-gray-600', 'py-7', 'px-40', 'flex', 'justify-start', 'w-max', 'items-center');

    if (isFirstIteration) {
      box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <img class="w-9 h-9 ml-96" src="https://chat.openai.com/favicon.ico" alt="">
        <div class="flex space-y-4 flex-col">
          <div id="question1"><span class="text-sm"><b>CCL Bot</b></span></div>
          <div id="solution"><span class="text-sm">${res.answer}</span></div>
        </div>
      </div>
    `;
      isFirstIteration = false;
    } else {
      box2.innerHTML = `
      <div class="box w-[35vw] flex justify-start space-x-6">
        <div class="w-9 h-9 ml-96">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="flex space-y-4 flex-col space-x-96 ">          
          <div id="solution"><span class="text-sm">${res.answer}</span></div>
        </div>
      </div>
    `;
    }




    // Append both instances to the container
    // container.appendChild(box1);
    container.appendChild(box2);
  });


  // Get the existing element with id 'chatbox'
  const chatbox = document.getElementById('next_proposal');

  // Insert the container above the 'chatbox' element
  chatbox.parentNode.insertBefore(container, chatbox);

});


// static/script.js

// async function callPythonFunction(data) {
// var data = {
//     param1: 'value1',
//     param2: 'value2'
// };

// $.ajax({
//   type: 'POST',
//   contentType: 'application/json;charset=UTF-8',
//   data: JSON.stringify(data),
//   url: '/call_python_function',
//   success: function (response) {
//     console.log('Result from Python function:', response.result);
//     return response.result
//   },
//   error: function (error) {
//     console.error('Error calling Python function:', error);
//   }
// });
// }
