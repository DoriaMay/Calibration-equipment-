import React, { useState, useEffect } from 'react'
import { db, storage } from '../components/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';



const initialState = {
  Equipment_serial_number: "",
  Equipment_group: "",
  Calibration_date: "",
  Calibration_due_date: "", 
}

const AddEditUser = ({user}) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const {id} = useParams();

  const navigate = useNavigate();

  const {Equipment_serial_number, Equipment_group, Calibration_date, Calibration_due_date} = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);



  console.log ("form", form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Equipment_serial_number && Equipment_group && Calibration_date && Calibration_due_date ){
      if(!id){
        try{
          await addDoc(collection(db, "items"), {
            ...form,
            timesTamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          alert("Add Item's successfully");
        }catch (err) {
          console.log(err);
        } 
      } else{
        try{
          await updateDoc(doc(db, "items", id), {
            ...form,
            timesTamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          alert("upadete Item's successfully");
        }catch (err) {
          console.log(err);
        } 
      } 
    } else {
      return alert("All fields are mandatery to fill");
    }

    navigate("/Home")
  };

  return (
    <div className='container-fluid mt-5 mb-4 '>
      <div className='container'>
        <div className='col-12'>
          <div className='text-center heading py-2'>{id ? "Update Item's" : "Add Item's"}</div>
        </div>
        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-10 col-mb-8 col-lg-6'>
            <form className='row blog-form' id='blog-form' onSubmit={handleSubmit}>
              <div className='col-12 py-3'>
                <input 
                type="text"
                className="form-control input-text-box"
                placeholder="Equipment serial number"
                name='Equipment_serial_number'
                value={Equipment_serial_number}
                onChange={handleChange}
                />
              </div>
              <div className='col-12 py-3'>
              <input 
                type="text"
                className="form-control input-text-box"
                placeholder="Equipment group"
                name='Equipment_group'
                value={Equipment_group}
                onChange={handleChange}
                />
              </div>
              <div className='col-12 py-3'>
                <input 
                type="date"
                className="form-control input-text-box"
                placeholder="Calibration date"
                name='Calibration_date'
                value={Calibration_date}
                onChange={handleChange}
                />
              </div>
              <div className='col-12 py-3'>
                <input 
                type="date"
                className="form-control input-text-box"
                placeholder="Calibration due date"
                name='Calibration_due_date'
                value={Calibration_due_date}
                onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <input 
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className='col-12 py-3 text-center'>
                <button className='btn btn-add' type='submit' disabled={progress !== null && progress < 100}>
                 {id ? "Update" : "Submit"}
                 </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditUser