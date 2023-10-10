import { useState, useContext, useRef } from "react";
import { UserContext } from "@/app";
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axiosConfig'
import Resizer from 'react-image-file-resizer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faEnvelope, faAddressCard, faMessage, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function Profile()
{
  const { user, setUser } = useContext(UserContext);
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

  function logout()
  {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate('/login');
  }

  function AltProfilePicture()
  {
    return (
      <div className="profile__box profile__picture profile__picture--alt">
        <FontAwesomeIcon icon={ faCircleQuestion }/>
        <span>Foto de perfil não disponível</span>
      </div>
    )
  }

  function ProfileActivities()
  {
    return (
      <div className="profile__box activities">
        <div 
          className="activities__header"
          children="Atividades recentes"
        />

        <div 
          className="activities__list"
          children="Nada para ver aqui."
        />
      </div>
    )
  }

  if (!user)
  {
    return (
      <div>
        carregando
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
      <div className="profile__lc">
        {
          user?.picture
          ? <img 
              src={ user.picture } 
              alt="" 
              className="profile__picture"
            />
          
          : <AltProfilePicture/>
        }

        <div 
          className="profile__box profile__btn profile__chat"
          onClick={ () => {navigate(`/user/${user.id}/chats`)} }
        >
          <FontAwesomeIcon icon={ faMessage }/>
          <span>MENSAGENS</span>
        </div>

        <div className="profile__box profile__info">
          <div className="profile__email">
            <span className="label"><FontAwesomeIcon icon={ faEnvelope }/> Email: </span>
            <span className="content">{ user?.email }</span>
          </div>

          {
            user.registration &&
            <div className="profile__registration">
              <span className="label"><FontAwesomeIcon icon={ faAddressCard }/> Matrícula: </span>
              <span className="content">{ user?.registration }</span>
            </div>
          }
        </div>

        <div 
          className="profile__box profile__btn profile__logout"
          onClick={ logout }
        >
          <FontAwesomeIcon icon={ faArrowRightToBracket }/>
          <span>SAIR</span>
        </div>
      </div>

      <div className="profile__rc">
        <div className="profile__box profile__data">
          <div 
            className="profile__name"
            children={ user?.name }
          />

          {
            user.program &&
            <div 
              onClick={ () => navigate(`/program/${user?.program.id}`) }
              className="profile__program"
              children={ user.program.name }
            />
          }

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

        <ProfileActivities/>
      </div>
    </div>
  );
}