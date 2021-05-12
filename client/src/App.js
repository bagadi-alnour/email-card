import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {
  const [formData, setformData] = useState({
    sender: "",
    subject: "",
    emailBody: "",
    receiver: "",
    imageUrl: "",
  });
  const onSubmit = (e) => {
    e.preventDefault()

    const {sender, subject, receiver, emailBody, imageUrl} = formData;
    console.log(formData)
    axios({
      method: "post",
      url: 'http://localhost:5000/api/email',
      data: {
        sender,
        subject,
        receiver,
        emailBody,
        imageUrl
      }
    }).then(response => {
      alert(response.statusText)
    }).catch(error => {
      console.log('error : ', error)
    })
  }


  const onChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value});
  };


  return (

      <div className="container">
        <div className="d-flex justify-content-center my-5 p-2">
          <form onSubmit={onSubmit} className="bg-light p-3 rounded">

            <div className="form-group">
              <h2 className="text-center text-dark mb-4 font-weight-bolder">
                <i className="fa fa-user fa-2x"/> <br/>
                Send Your email
              </h2>
            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="sender"
                     placeholder="name@example.com"
                     size="50"
                     name="sender"
                     onChange={(e) => onChange(e)}/>
              <label htmlFor="sender">Your email</label>
            </div>
            <div className="form-floating mb-3">

            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="receiver"
                     placeholder="Some subject"
                     size="50"
                     name="receiver"
                     onChange={(e) => onChange(e)}/>
              <label htmlFor="receiver">Email recipient</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="subject"
                     placeholder="Some subject"
                     size="50"
                     name="subject"
                     onChange={(e) => onChange(e)}/>
              <label htmlFor="subject">Email Subject</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="emailBody"
                     placeholder="Some msg"
                     size="50"
                     name="emailBody"
                     onChange={(e) => onChange(e)}/>
              <label htmlFor="emailBody">Email body</label>
            </div>


            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="imageUrl"
                     placeholder="Some subject"
                     size="50"
                     name="imageUrl"
                     onChange={(e) => onChange(e)}/>
              <label htmlFor="imageUrl">Paste your Image url here </label>
            </div>
            <div className="form-group">
              <div className="mt-2">

                <button
                    className="overlayLeftBtn form-control btn font-weight-bolder"
                    type="submit">
                  <span>Send</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

  );
}

export default App;
