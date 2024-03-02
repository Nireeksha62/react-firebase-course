import { useEffect, useState } from 'react'
import { Auth } from './components/auth'
import { db,auth,storage } from './config/firebase'
import { collection, getDocs,addDoc, deleteDoc,doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

function App() {
  const [movieList,setMovieList]=useState([])

  //New movie state
  const [newMovieTiltle,setNewMovieTitle]=useState("");
  const [newReleaseDate,setReleaseDate]=useState("");
  const [isNewMovieOscar,setIsNewMovieOscar]=useState(true);

  const [updatedTitle,setupdatedTitle]=useState("");

  const [fileUpload,setFileUpload]=useState(null);

  const movieCollectionRef=collection(db,"movies")

  const getMovieList=async()=>{
    try{
    const data=await getDocs(movieCollectionRef);
    const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id}))
    setMovieList(filteredData);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    getMovieList();
  },[])

  const onSubmitMovie=async()=>{
    try{
    await addDoc(movieCollectionRef,{
      title:newMovieTiltle,
      releaseDate:newReleaseDate,
      receivedAnOscar: isNewMovieOscar,
      userId:auth?.currentUser?.uid});
      getMovieList();
    }catch(err){
      console.error(err);
    }
  }
  
const deleteMovie=async(id)=>{
    const movieDoc=doc(db,"movies",id)
    await deleteDoc(movieDoc);
    getMovieList();
}

const UpdateMovie=async(id)=>{
  const movieDoc=doc(db,"movies",id)
  await updateDoc(movieDoc,{title:updatedTitle});
  getMovieList();
}

const uploadFile=async()=>{
  if(!fileUpload) return;
  const filesFolderRef= ref(storage,`projectFiles/${fileUpload.name}`);
  try{await uploadBytes(filesFolderRef,fileUpload);
  }catch(err){
    console.error(err)
  }
}
  return (
    <>
        <h1>Firebase</h1>
        <Auth />
        <div>
          <input placeholder='Movie title....'
          onChange={(e)=> setNewMovieTitle(e.target.value)}></input>
          <input placeholder='Release Date...'
           type='number'
           onChange={(e)=> setReleaseDate(Number(e.target.value))}></input>
          <input type='checkbox'
          checked={isNewMovieOscar} onChange={(e)=> setIsNewMovieOscar(e.target.checked)}></input>
          <label>Received an Oscar</label>
          <button onClick={onSubmitMovie}>Submit Movie</button>
        </div>
        <div>
          {movieList.map((movie)=>(
            <div>
              <h1 style={{color:movie.receivedAnOscar?"green":"red"}}>{movie.title}</h1>
              <p>Date: {movie.releaseDate}</p>
              <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
              <input placeholder='New Title...'
              onChange={(e)=>{setupdatedTitle(e.target.value)}}></input>
              <button onClick={()=>UpdateMovie(movie.id)}>Update Title</button>
            </div>
          ))}
        </div>
        <div>
          <input type='file' onChange={(e)=>setFileUpload(e.target.files[0])}></input>
            <button onClick={uploadFile}>Upload File</button>
          
        </div>
    </>
  )
}

export default App
