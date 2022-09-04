import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { storage } from '../../api/firebase';
import Spinner from 'react-bootstrap/Spinner';
import { ModalContext } from '../../context/ModalContext';
import { useContext } from 'react';

const ProfileAvatar = ({ userInformation }) => {
  const DEFAULT_AVATAR = 'avatars/default_avatars/default_avatar.png';
  const [userFolderRef, setUserFolderRef] = useState(null);
  const [allAvatarsRef, setAllAvatarsRef] = useState(null);
  const [defaultAvatarUrl, setDefaultAvatarUrl] = useState(null);
  const [allUserAvatars, setAllUserAvatars] = useState(null);
  const [newAvatarState, setNewAvatarState] = useState(null);

  const { activePage } = useContext(ModalContext);

  useEffect(() => {
    const fetchAvatar = () => {
      // Get the default avatar and set it as the default avatar url in the state
      const defaultAvatarRef = ref(storage, DEFAULT_AVATAR);
      getDownloadURL(defaultAvatarRef).then((url) => {
        setDefaultAvatarUrl(url);
      });

      // Get all the user folders in the avatars folder
      const allAvatarsRef = ref(storage, 'avatars');
      listAll(allAvatarsRef).then((folders) => {
        //Set the individual folders array in the state
        setUserFolderRef(folders);
      });

      setAllAvatarsRef(allAvatarsRef);
    };
    fetchAvatar();
  }, []);

  useEffect(() => {
    const assignAvatar = async () => {
      for (const folder of userFolderRef.prefixes) {
        if (folder.name === userInformation.userId) {
          const userFolderRef = ref(allAvatarsRef, folder.name);
          try {
            const allUserAvatars = await listAll(userFolderRef);
            if (allUserAvatars.items.length > 0) {
              setAllUserAvatars(allUserAvatars);
            }
            const avatarUrl = await getDownloadURL(allUserAvatars.items[0]);
            if (avatarUrl) {
              setDefaultAvatarUrl(avatarUrl);
            }
          } catch (error) {
            console.error('Error 2023 ocurred');
          }
        }
      }
    };
    if (userFolderRef) {
      assignAvatar();
    }
  }, [userFolderRef, allAvatarsRef, newAvatarState]);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!storage || !file) return;

    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        userId: userInformation.userId
      }
    };

    const storageRef = ref(storage, `avatars/${userInformation.userId}/${file.name}`);

    if (allUserAvatars) {
      const itemReference = allUserAvatars.items[0].fullPath;
      const avatarToDeleteRef = ref(storage, itemReference);
      deleteObject(avatarToDeleteRef)
        .then(() => {
          console.log('deleted avatar');
          setNewAvatarState(avatarToDeleteRef);
        })
        .catch((error) => {
          console.log('error deleting avatar', error);
        });
    }

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;

          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDefaultAvatarUrl(downloadURL);
        });
      }
    );
  };
  return (
    <aside className="modal-avatar-container">
      {defaultAvatarUrl ? (
        <img src={defaultAvatarUrl} alt="avatar" />
      ) : (
        <Spinner animation="grow" />
      )}
      {activePage === 'edit' && (
      <form onSubmit={formHandler}>
        <input type="file" id="avatar" accept=".png, .jpg, .jpeg" className="avatar-input" />
        <Button type="submit" className="avatar-button">
          Upload Avatar
        </Button>
      </form>
      )}
    </aside>
  );
};

ProfileAvatar.propTypes = {
  userInformation: PropTypes.object.isRequired
};

export default ProfileAvatar;
