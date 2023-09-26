import { useState, useContext, useRef } from "react";
import { UserContext } from "@/app";
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axiosConfig'
import Resizer from 'react-image-file-resizer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons';

export default function Profile()
{
  const { user } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);

  const pictureRef = useRef(null);
  const navigate = useNavigate();

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

  function AltProfilePicture()
  {
    return (
      <div className="profile__picture profile__picture--alt">
        <FontAwesomeIcon icon={ faCircleQuestion }/>
        <span>Foto de perfil não disponível</span>
      </div>
    )
  }

  function ProfileActivities()
  {
    return (
      <div className="activities">

      </div>
    )
  }

  return (
    // <div className="profile">
    //   <input
    //     type="file"
    //     accept="image/*"
    //     onChange={ handleFileSelect }
    //     ref={ pictureRef }
    //     style={{ display: 'none' }}
    //   />

    //   <button 
    //     onClick={ () => pictureRef.current.click() }
    //     children="Choose Image"
    //   />

    //   {/* {
    //     selectedImage && 
    //     <div>
    //       <p>Selected Image:</p>
    //       <img src={ selectedImage } alt="Selected" width='500'/>
    //     </div>
    //   } */}
    // </div>

    <div className="profile">
      {
        user?.picture
        ? <img 
            src={ user.picture } 
            alt="" 
            className="profile__picture"
          />
        
        : <AltProfilePicture/>
      }

      <div className="profile__data">
        <div 
          className="profile__name"
          children={ user?.name }
        />

        <div 
          onClick={ () => navigate(`/program/${user?.program.id}`) }
          className="profile__program"
          children={ user?.program.name }
        />

        {
          user?.job &&
          <div 
            onClick={ () => navigate(`/job/${user?.job.id}`) }
            className="profile__job"
            children={ user?.job.name }
          />
        }

        <div 
          className="profile__bio"
          children={ user?.bio }
        />
      </div>

      <div className="profile__info">
        <div className="profile__email">
          <span className="label"><FontAwesomeIcon icon={ faEnvelope }/> Email: </span>
          <span className="content">{ user?.email }</span>
        </div>

        <div className="profile__registration">
          <span className="label"><FontAwesomeIcon icon={ faAddressCard }/> Matrícula: </span>
          <span className="content">{ user?.registration }</span>
        </div>
      </div>
    </div>
  );
}