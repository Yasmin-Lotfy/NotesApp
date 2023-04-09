import React, { useEffect, useState } from 'react'
import style from "./Home.module.css"
import axios from "axios"
import jwt_decode from "jwt-decode";
import NoteCard from '../NoteCard/NoteCard';
import {AiOutlinePlusCircle} from "react-icons/ai"


function Home() {
console.log("hey");

  // get all notes
  useEffect(() => {
    getAllNotes()
  }, [])
  const [notes, setNotes] = useState([])
  
  let userToken = localStorage.getItem("userToken")
  let baseUrl ='https://sticky-note-fe.vercel.app/';
  var decoded = jwt_decode(userToken);
  // console.log(decoded);
  let notesObj = {
    "token":userToken,
    "userID":decoded._id
    }
    console.log(notesObj);
    const [newNote, setNewNote] = useState({"title":"","desc":"","citizenID":decoded._id,"token":userToken})


  async function getAllNotes(){
    console.log("hello");
    let {data}= await axios.post(baseUrl+"getUserNotes", notesObj)
    setNotes(data.Notes)
  }
  console.log(notes);
  function getNewNote(e){

    setNewNote({...newNote,[e.target.name]:e.target.value})

  }
  async function addNote(e){
    e.preventDefault()
    console.log(newNote);
    let {data}= await axios.post(`https://sticky-note-fe.vercel.app/addNote`, newNote)
    console.log(data);
    if(data.message == "success") {
      getAllNotes()

    }

  }


  return (
   <>
 
    <div className="container text-dark">
 
 <div className="d-flex justify-content-end">
 <button type="button" className="btn bg-white text-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
 < AiOutlinePlusCircle/> Add New Note
 </button>
 </div>
 
 
 
 <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <form id="edit-form" onSubmit={addNote} >
                 <div className="modal-dialog">
                     <div className="modal-content">
                         <div className="modal-header">
                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body">
                             <input  onChange={getNewNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                             <textarea onChange={getNewNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                         </div>
                         <div className="modal-footer">
                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                             <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Add Note</button>
                         </div>
                     </div>
                 </div>
             </form>
 </div>
     <div className="row">
     <NoteCard notes={notes} getAllNotes={getAllNotes}/>
    </div>
    </div>
  
  
   </>

  )
}

export default Home