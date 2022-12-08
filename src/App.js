import './App.css';
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

function App() {
  const [url, setUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // download the image at the given URL and store it in the "image-collection" folder
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // use the "FileSaver" library to save the image data to a file
        const fileName = 'image.png';
        const file = new File([blob], fileName, { type: 'image/png' });
        saveAs(file);

        // add the image URL to the list of image URLs
        setImageUrls([...imageUrls, url]);
      });

    setUrl('');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input type="text" value={url} onChange={handleChange} />
        </label>
        <input type="submit" value="Download" />
      </form>

      {/* show the last 5 images in the "image-collection" folder */}
      <div className="image-gallery">
        {imageUrls.slice(-6).map((imageUrl) => (
          <img src={imageUrl} alt="" />
        ))}
      </div>
    </div>
  );
}
export default App;


/* function App() {
  const [url, setUrl] = useState('');

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // download the image at the given URL and store it in the "image-collection" folder
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // use the "FileSaver" library to save the image data to a file
        const fileName = 'image.png';
        const file = new File([blob], fileName, { type: 'image/png' });
        saveAs(file);
      });

    setUrl('');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input type="text" value={url} onChange={handleChange} />
        </label>
        <input type="submit" value="Download" />
      </form>
    </div>
  );
}

export default App; */
