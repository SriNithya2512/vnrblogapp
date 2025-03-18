import { useContext, useEffect, useState } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import home_icon from '../../assets/home_img.jpg'

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj)

  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // console.log("isSignedIn :", isSignedIn)
   console.log("User :", user)
  // console.log("isLolded :", isLoaded)



  async function onSelectRole(e) {
    //clear error property
    setError('')
    const selectedRole = e.target.value;
    const updatedUser = { ...currentUser, role: selectedRole };
    setCurrentUser(updatedUser);
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:4000/author-api/author', updatedUser)
        let { message, payload } = res.data;
        if (payload.isActive === true) {
          if (message === 'author') {
            setCurrentUser({ ...updatedUser, ...payload })
            localStorage.setItem("currentuser", JSON.stringify(payload))
          } else {
            setError(message);
          }
        } else {
          navigate('/none')
        }
      }
      if (selectedRole === 'user') {
        res = await axios.post('http://localhost:4000/user-api/user', updatedUser)
        let { message, payload } = res.data;
        if (payload.isActive === true) {
          if (message === 'user') {
            setCurrentUser({ ...updatedUser, ...payload })
            localStorage.setItem("currentuser", JSON.stringify(payload))
          } else {
            setError(message);
          }
        } else {
          navigate('/none')
        }
      }
      if (selectedRole === 'admin') {
        res = await axios.post('http://localhost:4000/admin-api/admin', updatedUser)
        let { message, payload } = res.data;
        if (message === 'admin') {
          setCurrentUser({ ...updatedUser, ...payload })
          localStorage.setItem('currentuser', JSON.stringify(payload))
          navigate(`/admin-profile/${updatedUser.email}`)
        } else {
          setError(message);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }


  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded])



  useEffect(() => {

    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      console.log("first")
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`)
    }
  }, [currentUser]);

  // console.log("cu",currentUser)
  //console.log("is loaded",isLoaded)

  return (
    <div className='container'>
      {
        isSignedIn === false && <div>
          <div className='d-flex pt-5'>
            <img src={home_icon} width='640px' alt="" />
            <div className='m-5'>
              <h1>Where Words Create Impact</h1>
              <p>Turn your thoughts into powerful stories and share them with the world.</p>
              <h6>Read. Write. Inspire.</h6>
              <div className='mt-3'>
                <button onClick={()=>navigate('/signin')} className='px-4 py-2 border-0 rounded-5 bg-dark-subtle'>Get Started</button>
                <button onClick={()=>navigate('/signin')} className='ms-3 px-4 py-2 border-0 bg-dark-subtle rounded-5'>Explore Now</button>
              </div>
            </div>
          </div>


        </div>
      }

      {
        isSignedIn === true &&
        <div>
          <div className='d-flex justify-content-evenly align-items-center bg-info p-3'>
            <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
            <p className="display-6">{user.firstName}</p>
            <p className="lead">{user.emailAddresses[0].emailAddress}</p>
          </div>
          <p className="lead">Select role</p>
          {error.length !== 0 && (
            <p
              className="text-danger fs-5"
              style={{ fontFamily: "sans-serif" }}
            >
              {error}
            </p>
          )}
          <div className='d-flex role-radio py-3 justify-content-center'>

            <div className="form-check me-4">
              <input type="radio" name="role" id="author" value="author" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="author" className="form-check-label">Author</label>
            </div>
            <div className="form-check me-4">
              <input type="radio" name="role" id="user" value="user" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="user" className="form-check-label">User</label>
            </div>
            <div className="form-check">
              <input type="radio" name="role" id="admin" value="admin" className="form-check-input" onChange={onSelectRole} />
              <label htmlFor="admin" className="form-check-label">Admin</label>
            </div>
          </div>
        </div>



      }
    </div>
  )
}

export default Home