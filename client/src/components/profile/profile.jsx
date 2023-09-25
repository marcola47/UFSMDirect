import { useState, useContext, useRef } from "react";
import { UserContext } from "@/app";
import Resizer from 'react-image-file-resizer';

export default function Profile()
{
  const { user } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);

  const pictureRef = useRef(null);

  function handleFileSelect(event)
  {
    const picture = event.target.files[0];

    try 
    {
      Resizer.imageFileResizer(picture, 500, 500, 'JPEG', 100, 0, (uri) => { setResizedImage(uri) }, 'base64');
      setSelectedImage(URL.createObjectURL(picture));
    } 
    
    catch (error) {
      console.error('Error resizing image:', error);
    }
  };

  return (
    <div className="profile">
      <input
        type="file"
        accept="image/*"
        onChange={ handleFileSelect }
        ref={ pictureRef }
        style={{ display: 'none' }}
      />

      <button 
        onClick={ () => pictureRef.current.click() }
        children="Choose Image"
      />

      {/* {
        selectedImage && 
        <div>
          <p>Selected Image:</p>
          <img src={ selectedImage } alt="Selected" width='500'/>
        </div>
      } */}

      {
        user?.picture &&
        <img src={ user.picture } alt="" className="user-picture"/>
      }
    </div>
  );
}