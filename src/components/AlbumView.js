import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function AlbumView() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Album Data Goes Here</p>
        </div>
    )

    const navButtons = () => {
        return(
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

return (
<div>
    {navButtons()}
    {allData}
    </div>
    )
}

export default AlbumView
