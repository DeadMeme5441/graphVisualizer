import React, { useState } from 'react';
import axios from 'axios'


const Upload = () => {

  const hiddenFileInput = React.useRef(null)

  const [selectedFile, setSelectedFile] = useState();

  const inputHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios.post('http://localhost:5000/upload', formData,
      {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        console.log("File uploaded")
      }).catch((e) => {
        console.log(e)
      })
  };

  return (
    <div className="container mx-auto flex flex-row">
      {selectedFile ? <button className="bg-red text-black font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmission}> Click to Upload.
      </button>
        : <button className="bg-black text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleClick}>Upload file.
        </button>
      }
      <input type="file" ref={hiddenFileInput} name="file" onChange={inputHandler} style={{ display: 'none' }} />
    </div>
  )
}

export default Upload;
