import React, { useEffect, useState } from 'react';
import axios from 'axios'



const NSFW = () => {
  const [classificationResult, setClassificationResult] = useState(null);
  var answer ;
  const classifyImage = async (imageUrl) => {
    try {
      const data = JSON.stringify({
        url: imageUrl,
      });
  
  
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
  
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          answer = this.responseText;
          console.log(this.responseText);
          // Handle the NSFW classification result here
          // You can update the component state or take any other action based on the result
        }
      });
  
      xhr.open('POST', 'https://openmediadata.s3.eu-west-3.amazonaws.com/violence.jpeg');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('X-RapidAPI-Key', '5e00906437msh0bfd27ae14a8d01p1ab669jsnfb05e107a87d');
      xhr.setRequestHeader('X-RapidAPI-Host', 'nsfw-images-detection-and-classification.p.rapidapi.com');
  
      xhr.send(data);
    } catch (error) {
      console.error('Error classifying image:', error);
      return null; // Return null in case of an error
    }
  };



const classifyImage1 = async (imageUrl) => {
  try {
    const data = {
      url: imageUrl,
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '5e00906437msh0bfd27ae14a8d01p1ab669jsnfb05e107a87d',
      'X-RapidAPI-Host': 'nsfw-images-detection-and-classification.p.rapidapi.com',
      
    };

    const response = await axios.post('https://openmediadata.s3.eu-west-3.amazonaws.com/violence.jpeg', data, {
      headers: headers,
    });

    const answer = response.data;
    console.log(answer);
    // Handle the NSFW classification result here
    // You can update the component state or take any other action based on the result

    return answer; // Return the response data
  } catch (error) {
    console.error('Error classifying image:', error);
    return null; // Return null in case of an error
  }
};


  useEffect(() => {
    async function lol (){

        const options = {
          method: 'POST',
          url: 'https://nsfw-images-detection-and-classification.p.rapidapi.com/adult-content',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '5e00906437msh0bfd27ae14a8d01p1ab669jsnfb05e107a87d',
            'X-RapidAPI-Host': 'nsfw-images-detection-and-classification.p.rapidapi.com'
          },
          data: {
            url: 'https://cdn.discordapp.com/attachments/1185097325656416276/1185534587712053318/WhatsApp_Image_2023-12-16_at_15.32.59_c2985f55.jpg?ex=658ff61f&is=657d811f&hm=ea4f3125edc491789b157a252df0661fb14c78f1ef5ffa928df83da2ca035ecd&'
          }
        };
        
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    // Test image classification from URL
    const imageUrl = 'https://cdn.discordapp.com/attachments/1185097325656416276/1185534587712053318/WhatsApp_Image_2023-12-16_at_15.32.59_c2985f55.jpg?ex=658ff61f&is=657d811f&hm=ea4f3125edc491789b157a252df0661fb14c78f1ef5ffa928df83da2ca035ecd&';

    const fetchData = async () => {
      await lol(imageUrl);
      // Set the classification result if needed
    //   setClassificationResult(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>NSFW Image Classifier</h1>
      {/* Display the classification result */}
      <pre>{JSON.stringify(classificationResult, answer, 2)}</pre>
      {answer}
      <img src="https://cdn.discordapp.com/attachments/1184864067295395960/1185525496549756988/OIP.png?ex=658feda8&is=657d78a8&hm=75a4d4108be93e69d22888ccfc32d08bd8aea68b17a53fd651f0b84a096fe183&" alt="" />
      {/* Uncomment the following input if you want to test image classification from a file */}
      {/* <input type="file" id="fileInput" /> */}
    </div>
  );
};

export default NSFW;
