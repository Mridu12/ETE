import React from 'react'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

const Editor = ({value,onChange}) => {
  return (
    
    <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
        formats={["all"]}
        
      />
  )
}

export default Editor