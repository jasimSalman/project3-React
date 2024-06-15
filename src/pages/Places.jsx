import "../App.css"
import PlaceCard from "../components/PlaceCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Places = () => {
  const [placess, setPlaces] = useState([]) // Renamed from 'place' to 'places' for clarity
  const { id } = useParams()

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/categories/${id}/places`
        )

        setPlaces(res.data.place)
        console.log(res.data.place)
      } catch (err) {
        console.log("Error fetching places:", err)
      }
    }
    getPlaces(id)
  }, [id])

  return (
    <div className="placess">
      {placess.map((place) => (
        <PlaceCard
          key={place._id}
          id={place._id}
          name={place.placeName}
          poster={place.placePoster}
        />
      ))}
    </div>
  )
}

export default Places
