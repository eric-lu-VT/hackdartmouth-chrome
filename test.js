let request = new XMLHttpRequest();

const text= "yay";

const doc = {
  content: text,
  type: 'PLAIN_TEXT',
};

const requestBuilding = {
  "document": doc,
  "encodingType": "UTF16"
};



request.open("POST", "https://language.googleapis.com/v1beta2/documents:analyzeSentiment");
request.send(requestBuilding);