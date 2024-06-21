import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Client from '../services/api'

const AddPlace = () => {
  let navigate = useNavigate()
  const [userId, setUserId] = useState('')
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) setUserId(storedUserId)
  }, [])

  const initialState = {
    placeName: '',
    placePoster: '',
    placePrice: '',
    placeDescription: '',
    placeLocation: '',
    category: '',
    offDays: [],
    workingTimeStart: '',
    workingTimeEnd: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    const { offDays } = formValues
    if (checked) {
      setFormValues({
        ...formValues,
        offDays: [...offDays, value]
      })
    } else {
      setFormValues({
        ...formValues,
        offDays: offDays.filter((day) => day !== value)
      })
    }
  }

  const convetTime = (time) => {
    const [timePart, modifier] = time.split(' ')
    let [hours, minutes] = timePart.split(':')

    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12
    }

    if (modifier === 'AM' && hours === '12') {
      hours = '00'
    }

    return `${hours}:${minutes}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { workingTimeStart, workingTimeEnd } = formValues
    const convertedStartTime = convetTime(workingTimeStart)
    const convertedEndTime = convetTime(workingTimeEnd)

    const formData = {
      ...formValues,
      workingTimeStart: convertedStartTime,
      workingTimeEnd: convertedEndTime
    }

    await Client.post(`/places/new/${userId}`, formData)
    setFormValues(initialState)
    navigate('/myPlaces')
  }

  return (
    <div className="addPlace col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="placeName">Place Name</label>
            <input
              onChange={handleChange}
              name="placeName"
              type="text"
              placeholder="Place Name"
              value={formValues.placeName}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="category">Place Category</label>
            <select
              name="category"
              id="category"
              value={formValues.category}
              onChange={handleChange}
            >
              <option value="Amusement Parks">Amusement Parks</option>
              <option value="Cinemas and Theaters">Cinemas and Theaters</option>
              <option value="Concert Halls and Music Venues">
                Concert Halls and Music Venues
              </option>
              <option value="Museums and Art Galleries">
                Museums and Art Galleries
              </option>
              <option value="Sports Arenas and Stadiums">
                Sports Arenas and Stadiums
              </option>
              <option value="Bowling Alleys and Arcades">
                Bowling Alleys and Arcades
              </option>
              <option value="Escape Rooms and Interactive Experiences">
                Escape Rooms and Interactive Experiences
              </option>
              <option value="Zoos and Aquariums">Zoos and Aquariums</option>
            </select>
          </div>

          <div className="input-wrapper">
            <label htmlFor="placePoster">Place Poster URL</label>
            <input
              onChange={handleChange}
              name="placePoster"
              type="text"
              placeholder="Place Poster URL"
              value={formValues.placePoster}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="placePrice">Place Price</label>
            <input
              onChange={handleChange}
              name="placePrice"
              type="number"
              placeholder="Place Price"
              value={formValues.placePrice}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="placeLocation">Place Location</label>
            <input
              onChange={handleChange}
              name="placeLocation"
              type="text"
              placeholder="Place Location"
              value={formValues.placeLocation}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="placeDescription">Place Description</label>
            <textarea
              onChange={handleChange}
              name="placeDescription"
              placeholder="Place Description"
              value={formValues.placeDescription}
              required
            />
          </div>

          <div className="input-wrapper">
            <label>Off Days</label>
            <div className="checkbox-group">
              {[
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
              ].map((day, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="offDays"
                    value={day}
                    checked={formValues.offDays.includes(day)}
                    onChange={handleCheckboxChange}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <div className="input-wrapper">
            <label>Working Hours</label>
            <div className="time-group">
              <label>From:</label>
              <input
                type="time"
                name="workingTimeStart"
                value={formValues.workingTimeStart}
                onChange={handleChange}
                required
              />
              <label>To:</label>
              <input
                type="time"
                name="workingTimeEnd"
                value={formValues.workingTimeEnd}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            disabled={
              !formValues.placeName ||
              !formValues.placePoster ||
              !formValues.placePrice ||
              !formValues.placeDescription ||
              !formValues.placeLocation
            }
          >
            Add Place
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddPlace
