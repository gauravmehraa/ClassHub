import React, { FormEvent, useState } from 'react'
import useAddNote from '../hooks/notes/useAddNote';
import useGetSubjects from '../hooks/subjects/useGetSubjects';

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { addNote, loading } = useAddNote();
  const { subjects } = useGetSubjects();

  const handleReset: any = async(e: FormEvent) => {
    setTitle("");
    setDescription("");
    setSubjectID("");
    setFile(null);
  }

  const handleSubmit: any = async(e: FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("subjectID", subjectID);
    if(description.trim() !== "") formData.append("description", description);
    if(file) formData.append("file", file);
    await addNote(formData);
    setTitle("");
    setDescription("");
    setSubjectID("");
    setFile(null);
  }

  return (
    <div>

      <h3 className="text-2xl text-center">Add Notes</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        
        <div className="mt-6">
          <label className="ml-2 font-semibold">Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
            autoComplete='false'
            autoCapitalize='true'
          />
        </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full mt-2 input input-bordered flex items-center focus:outline-none'
            autoComplete='false'
          />
        </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Subject</label>
          <select
            className="grow select select-bordered focus:outline-none ml-2"
            value={subjectID}
            autoComplete="off"
            onChange={(e) => setSubjectID(e.target.value)}
          >
            { typeof(subjects) !== "undefined" && subjects.map((subject: any) => (
              <option key={subject._id} value={subject._id}>{subject.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <label className="ml-2 font-semibold">Document</label>
          <input
            type='file'
            onChange={(e) => setFile(e.target.files![0])}
            className='w-full mt-2 file-input file-input-bordered flex items-center focus:outline-none'
            accept="application/msword, application/vnd.ms-powerpoint, application/pdf"
          />
        </div>
        
        <div className='mt-6 flex justify-end'>
          <button type='reset' className="btn m-2 btn-info"> Reset </button>
          <button type='submit' className="btn m-2 btn-success">
            { loading ? <span className='loading loading-spinner'></span>: "Save" }
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddNote
