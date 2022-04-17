import fetch from 'node-fetch';

const url = "https://language.googleapis.com/v1beta2/documents:analyzeSentiment";
const text= "yay";

const doc = {
  content: text,
  type: 'PLAIN_TEXT',
};

const requestBuilding = {
  "document": doc,
  "encodingType": "UTF16"
};

async function test() {


  const response = await fetch(url, { method: 'POST' }, requestBuilding)
    .then(response => response.json())
    .then(response => {return response})

  return response;
}

console.log(test());
