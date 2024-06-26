import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  const initialState = { username: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues(initialState)
    setUser(payload)
    {
      payload.type === 'user' ? navigate('/categories') : navigate('/myplaces')
    }
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder=" please enter your username"
            value={formValues.username}
            required
            className="inputFeild"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder=" please enter your password"
            value={formValues.password}
            required
            className="inputFeild"
          />
        </div>
        <button
          disabled={!formValues.username || !formValues.password}
          className="authButton"
        >
          SignIn
        </button>
      </form>
      <div className="signin-newaccount-container">
        <div>
          <Link to="/updatePassword">
            <div className="font">Forget your password?</div>
          </Link>
          <hr />
          <div className="font">Don't have an accout?</div>
          <div className="felxSignin">
            <Link to="/register/user">
              <h6 className="color"> Register as a user</h6>
            </Link>
            <h5>OR </h5>
            <Link to="/register/owner">
              <h6 className="color"> Register as an Owner</h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
