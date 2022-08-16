import React from 'react';
import { LoadingButton } from '@mui/lab';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { Box, Link, TextField, Stack } from '@mui/material';
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"
function CreateIdea() {
    const initialValues = {
        title: "",
        ideaText: "",

      };
      let navigate=useNavigate();
      const validationSchema = Yup.object().shape({
        title: Yup.string().required("Tytuł jest wymagany"),
        ideaText: Yup.string().required("Musisz opisać pomysł"),
    
      });
    
      const onSubmit = (data) => {
        axios.post("http://localhost:3001/ideas", data, {headers:{
          accessToken: localStorage.getItem("accessToken")
        }}).then((response) => {
          if(response.data.error){
            console.log(response.data.error)
          }else{
            navigate(`/`)}
        });
      };
  return (
    <div className='createForm'>
        
        
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            
            <Form  className="formContainer">
                <h2>Stwórz nowy pomysł</h2>
                <label>Pomysł:</label>
                <ErrorMessage name="title" component="span" />
                <Field as={TextField} id="inputCreteIdea" label="Pomysł" name="title" placeholder="Title"/>
                <br/>
                <label>Opis Pomysłu:</label>
                <ErrorMessage name="ideaText" component="span" />
                <Field as={TextField} id="inputCreteIdea" label="Opis pomysłu" name="ideaText" placeholder="Idea"/>

                <button  type='submit'>Stwórz</button>
            </Form>

        </Formik>
    </div>
  )
}

export default CreateIdea