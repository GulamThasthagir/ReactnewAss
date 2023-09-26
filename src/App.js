import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isTrue, setTrue] = useState(true);
  const [data, setDatas] = useState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [val, setVal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSubmit() {
    if (title === "" || body === "") {
      alert("Plz Enter the Value");
    } else {
      setTrue(true);
      const postData = { title, body };
      axios.post("http://localhost:3000/posts", postData)
        .then((response) => {
          axios
            .get("http://localhost:3000/posts")
            .then((response) => setPosts(response.data))
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
      setTitle("");
      setBody("");
    }
  }

  function handleDelete(id) {
    alert("Erase Your data in the Server");
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
        axios.get("http://localhost:3000/posts")
          .then((response) => setPosts(response.data))
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdate(post) {
    setDatas(post);
    setTrue(false);
    setVal(false);
    setTitle(post.title);
    setBody(post.body);
  }

  function singleUpdate() {
    setTrue(true);
    const data1 = { title, body };
    axios.put(`http://localhost:3000/posts/${data.id}`, data1)
      .then((response) => {
        axios.get(`http://localhost:3000/posts`).then((response) => {
          setPosts(response.data);
        });
      });
    setTitle("");
    setBody("");
  }

  function handleAdd() {
    setTrue(false);
    setVal(true);
    setBody("");
    setTitle("");
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => handleAdd()} className="buttonOne">For a Add</button>
        {isTrue ? (
          ""
        ) : (
          <div className="formBar">
            <input type="text"placeholder="Title"className="inputPart" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="Body" className="inputPart" value={body} onChange={(e) => setBody(e.target.value)} />
            {isTrue || val ? (
              <input type="button" value="Add" className="inputPart" onClick={handleSubmit}/>) :
               (<input type="button" value="Update" className="inputPart" onClick={singleUpdate}/>
            )}
          </div>
        )}
      </div>

      {isTrue
        ? posts.map((post) => (
            <div key={post.id}>
              <h3>Title: {post.title}</h3>
              <p>Body: {post.body}</p>
              <div className="btnPart">
                <button onClick={() => handleUpdate(post)} className="btnz">Update</button>
                <button onClick={() => handleDelete(post.id)} className="btnz">Delete</button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};
export default App