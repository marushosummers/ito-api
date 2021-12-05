import { Link } from 'react-router-dom';


function RoomCard(props){
  const { room } = props
  return (
    <div>
      <Link to={`/room/${room.id}`} > {room.name} </Link>
    </div>
  )
}

export default RoomCard;
