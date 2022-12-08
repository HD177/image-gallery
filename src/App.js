import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

function App() {
  const [url, setUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // download the image at the given URL and store it in the "image-collection" folder
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // check if the downloaded data is an image
        if (blob.type.startsWith('image/')) {
          // use the "FileSaver" library to save the image data to a file
          const fileName = 'image.png';
          const file = new File([blob], fileName, { type: 'image/png' });
          // saveAs(file);

          // add the image URL to the list of image URLs
          setImageUrls([...imageUrls, url]);
        } else {
          // show an error message if the downloaded data is not an image
          setErrorMessage('The URL does not point to an image.');
          console.error("failed");

          // hide the error message after 5 seconds
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        }
      });

    setUrl('');
  };

   // handle a click on the download button for an image
   const handleDownload = (event, imageUrl) => {
    event.preventDefault();

    // download the image at the given URL
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // use the "FileSaver" library to save the image data to a file
        const fileName = 'image.png';
        const file = new File([blob], fileName, { type: 'image/png' });
        saveAs(file);
      });
  };

  return (
    <div className="container">
     <div className="form-container">
      <form onSubmit={handleSubmit}>
          <label>
            Image URL:
          </label>
          <input type="text" value={url} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>

        {/* show the last 6 images in the "image-collection" folder */}
        <div className="image-gallery">
          {imageUrls.slice(-6).map((imageUrl) => (
            <div className="image-container">
              <div className="image-overlay">
                <img src={imageUrl} alt="" />
                <button className="" onClick={(event) => handleDownload(event, imageUrl)}>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="afdsfdspp">
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
      </div>
    </div>
    
  );

}
export default App;