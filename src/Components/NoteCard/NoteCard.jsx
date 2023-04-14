import React , { useState}from 'react'
import style from "./NoteCard.module.css"
import {MdDelete} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"
import axios, { all } from "axios"

function NoteCard({notes, getAllNotes, setNotes}) {
  console.log(notes);
  let token = localStorage.getItem("userToken")
  const [allnotes, setAllNotes] = useState({"title":"","desc":"", "token":token,"NoteID":"",})

  //delete function 
 async function deleteNote(id){
    console.log(id);
    let delObj= {
      "NoteID":id,
      "token": token
      }
      console.log(delObj);
   
    let {data}= await axios.delete("https://sticky-note-fe.vercel.app/deleteNote", {data:delObj} )
    console.log(data);
    if(data.message == "deleted"){
      getAllNotes()

    }
  }

   function getNoteId(index){
    console.log(notes[index]);
    document.getElementById("title2").value = notes[index].title;
    document.getElementById("desc2").value = notes[index].desc; 
    setAllNotes({...allnotes,"NoteID":notes[index]._id})
    console.log(allnotes);

  }
 function getUserDataForEdit(e){
  setAllNotes({...allnotes,[e.target.name]:e.target.value})
  console.log(allnotes);
}
  async function editNote(e){
    e.preventDefault()
    let {data}= await axios.put("https://sticky-note-fe.vercel.app/updateNote", allnotes)
       if(data.message == "updated"){
      getAllNotes()

}

  }
  return (
    // display cards
    <>
    {notes? notes.map((note, index)=> <div key={note._id}className='col-md-4 my-5 text-capitalize'>
    <div className='note p-4 d-flex justify-content-between'>
    
   <div>
   <p className='fw-bolder' >{note.title}</p>
    <p className='my-2 fw-normal'>{note.desc}</p>
   </div>
   <div className='d-flex'>
    <a className='del p-2'  onClick={()=>deleteNote(note._id)} ><MdDelete/></a>
    <a className='edit p-2' data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>getNoteId(index)}><AiFillEdit/></a>
    </div>
    </div>
  
   </div>
   
    ): ""}

    {/* end of display cards */}


{/* <button type="button" class="btn btn-primary" >
  Launch demo modal
</button> */}

{/* edit modal  */}
<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">

<form id="edit-form" onSubmit={editNote} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input  onChange={getUserDataForEdit} id='title2' placeholder="Type Title" name="title" className="form-control" type="text" />
                            <textarea onChange={getUserDataForEdit} id='desc2' className="form-control my-2" placeholder="Type your note" name="desc" cols="30" rows="10"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                            <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>
                        </div>
                    </div>
                </div>
            </form>
</div>
    </>
  )
}

export default NoteCard