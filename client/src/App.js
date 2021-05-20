import './App.css';
import {useState} from "react";
import axios from "axios";
import {Formik, Form, ErrorMessage, Field} from "formik"
import * as Yup from 'yup';

import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";


const validationSchema = Yup.object().shape({
    sender: Yup.string("required").email().required("Your email is required"),
    subject: Yup.string("The subject is required").required("Subject is required"),
    emailBody: Yup.string("Email body is required").required("Email body is required"),
    imageUrl: Yup.string("Required").required("Image url is required")
})

function App() {
    const [initialValues, setInitialValues] = useState({
        sender: "",
        subject: "",
        emailBody: "",
        imageUrl: "",
    });
    const [isSent, setIsSent] = useState(false);
    const [msg, setMsg] = useState();
    const [tags, setTags] = useState([])

    const handleSubmit = async (values) => {
        initialValues.receivers = tags;
        setInitialValues({...initialValues});
        try {
            const res = await axios.post('http://localhost:5000/api/email', {tags, values})
            console.log(res.data)
            setMsg("Your email has been sent successfully")
            setIsSent(true)
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className="container">
            <div className="d-flex justify-content-center my-5 p-2">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <Form className="bg-light p-3 rounded">
                        <div className="form-group">
                            <h2 className="text-center text-dark mb-4 font-weight-bolder">
                                <i className="fa fa-user fa-2x"/> <br/>
                                Send Your email
                            </h2>
                            <p className="text-center">{msg && msg}</p>
                        </div>

                        <div className="form-floating mb-3">
                            <Field type="text" className="form-control"
                                   id="sender"
                                   placeholder="name@example.com"
                                   size="50"
                                   name="sender"/>
                            <label htmlFor="sender">Your email</label>
                            <ErrorMessage className="text-danger" name="sender" component="small"/>
                        </div>
                        <div className="form-floating mb-3">
                        </div>
                        <div className="form-floating mb-3">
                            <ReactTagInput
                                className="form-control input-lg"
                                tags={tags}
                                name="receivers"
                                onChange={(newTags) => setTags(newTags)}
                            />

                        </div>
                        <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="subject"
                                   placeholder="Some subject"
                                   size="50"
                                   name="subject"/>
                            <label htmlFor="subject">Email Subject</label>
                            <ErrorMessage className="text-danger" name="subject" component="small"/>
                        </div>

                        <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="emailBody"
                                   placeholder="Some msg"
                                   size="50"
                                   name="emailBody"/>
                            <label htmlFor="emailBody">Email body</label>
                            <ErrorMessage className="text-danger" name="emailBody" component="small"/>
                        </div>


                        <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="imageUrl"
                                   placeholder="Some subject"
                                   size="50"
                                   name="imageUrl"/>
                            <label htmlFor="imageUrl">Paste your Image url here </label>
                            <ErrorMessage className="text-danger" name="imageUrl" component="small"/>
                        </div>
                        <div className="form-group">
                            <div className="mt-2">
                                <button disabled={isSent}
                                        className="overlayLeftBtn form-control btn font-weight-bolder"
                                        type="submit">
                                    <span>Send</span>
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>

    );
}


export default App;
