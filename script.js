const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const uploadButton = document.getElementById('upload-button');
let fileType = null;

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    preview.src = reader.result;
    fileType = file.type;
  });
  reader.readAsDataURL(file);
});

uploadButton.addEventListener('click', async () => {
  const imageBase64 = preview.src.split(',')[1];


  const response = await fetch('http://127.0.0.1:5001/image-query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: { data: imageBase64, format: fileType } })
  });
  const result = await response.json();
  console.log(result.result);

  
  let resultsContainer = document.querySelector('.results-container');

  // If the element doesn't exist, create it and append it to the body
  if (resultsContainer) {
    resultsContainer.remove();
  } 
  resultsContainer = document.createElement('div');
 resultsContainer.classList.add('results-container');


  // const resultsContainer = document.createElement('div');
  // resultsContainer.classList.add('results-container');

  result.result.results.forEach((res) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    const image = document.createElement('img');
    image.src = res.thumbnail_url;
    image.alt = res.description;
    image.classList.add('result-image');
    resultItem.appendChild(image);

    const title = document.createElement('h2');
    title.innerText = res.description;
    resultItem.appendChild(title);

    const tags = document.createElement('ul');
    tags.classList.add('result-tags');
    res.tags.forEach((tag) => {
      const li = document.createElement('li');
      li.innerText = tag;
      tags.appendChild(li);
    });
    resultItem.appendChild(tags);

    const score = document.createElement('p');
    score.innerText = `Score: ${res.score}`;
    resultItem.appendChild(score);

    resultsContainer.appendChild(resultItem);
  });
  const selectedDiv = document.querySelector('.global-caontainer');

  selectedDiv.appendChild(resultsContainer);
});
