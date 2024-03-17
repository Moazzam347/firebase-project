import React, {useEffect, useState} from "react";
import {Auth} from "./components/Auth";
import "./App.css";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {db, auth, storage} from "./config/firebase";
import {ref, uploadBytes} from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newMovieRating, setnewMovieRating] = useState(0);
  const [newMovieReleasedDate, setnewMovieReleasedDate] = useState(0);
  const [newMovieAward, setnewMovieAward] = useState(false);
  const [updateTitle, setupdateTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, "movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.log("error fetching movie data: ", error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        rating: newMovieRating,
        award: newMovieAward,
        releasedDate: newMovieReleasedDate,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log("error creating movie: ", error);
    }
  };

  const deleteMovie = async id => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log("error deleting movie: ", error);
    }
  };

  const updateMovie = async id => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {title: updateTitle});
    getMovieList();
  };

  const onFileUpload = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `firebaseProject/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log("error uploading file: ", error);
    }
  };
  return (
    <div className='App'>
      <Auth />

      <div>
        <input
          type='text'
          placeholder='Movie title...'
          onChange={e => setnewMovieTitle(e.target.value)}
        />
        <input
          type='number'
          placeholder='Movie rating...'
          onChange={e => setnewMovieRating(e.target.value)}
        />
        <input
          type='number'
          placeholder='Movie released date...'
          onChange={e => setnewMovieReleasedDate(e.target.value)}
        />
        <label>Received an Award</label>
        <input
          type='checkbox'
          checked={newMovieAward}
          onChange={e => setnewMovieAward(e.target.checked)}
        />
        <button onClick={onSubitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map(item => (
          <div key={item.id}>
            <h1 style={{color: item.award ? "green" : "red"}}>{item.title}</h1>
            <p>Rating: {item.rating} </p>
            <p>Released Date: {item.releasedDate} </p>
            <button onClick={() => deleteMovie(item.id)}>Delete</button>
            <input
              onChange={e => setupdateTitle(e.target.value)}
              type='text'
              placeholder='New title'
            />
            <button onClick={() => updateMovie(item.id)}>Update</button>
          </div>
        ))}
      </div>

      <div>
        <input
          onChange={e => setFileUpload(e.target.files[0])}
          type='file'
        />
        <button onClick={onFileUpload}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
