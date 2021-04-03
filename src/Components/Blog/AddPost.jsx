import React, {useState} from "react";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {convertToHTML} from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.scss";
import {FilePond} from "react-filepond";
import {postBlogArticle} from "../../api/postBlogArticle";

const AddPost = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const submitPost = () => {
    postBlogArticle(title, convertedContent, files);
  }

  const renderPhotoBlock = () => {
    return (
      <div className="App">
        <FilePond
          onaddfile={(err, item) => {
            if (err) {
              return;
            }
            setFiles((file) => file.concat(item.getFileEncodeDataURL()));
          }}
          allowReorder={true}
          allowMultiple={true}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    );
  };

  return (
    <div className="add-blog-post">
      <div>
        <header className="add-blog-post__header">
          Add blog post
        </header>
      </div>
      <div className="input">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          placeholder="Title"
          onChange={handleTitleChange}
          required
        />
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {renderPhotoBlock()}
      <button className="btn btn-outline-primary align-content-center ml-4 btn-lg" onClick={submitPost}>SAVE</button>
    </div>
  )
}

export default AddPost;
