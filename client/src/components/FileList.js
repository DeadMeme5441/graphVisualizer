import React from 'react';
import axios from 'axios';


const FileList = () => {

  const [fileList, setFileList] = React.useState(null)

  React.useEffect(() => {
    axios.get("http://localhost:5000/files").then((response) => {
      setFileList(response.data)
    }
    )
  }, [])

  if (!fileList) return (
    <div>
      No files.
    </div>
  )



  return (
    <div className="container mx-auto">
      <h3>File List</h3>
      <ul>
        {
          fileList.files.map(file => {
            return (
              <div>
                <li>{file}</li>
              </div>
            )
          })
        }
      </ul>
    </div>
  )

}

export default FileList;
