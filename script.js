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
  console.log(result);
});