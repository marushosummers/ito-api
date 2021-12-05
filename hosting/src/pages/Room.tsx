import { useParams, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import updateUser from "../hooks/repository/updateUser";
type Id = {
  id: string;
};

function Room() {
  const history = useHistory();
  const { state } = useContext(UserContext)
  const { id } = useParams<Id>();

  useEffect(() => {
    console.log("id", id);
    if (!state.loginRoomId) {
      updateUser(state.uid, id)
    } else if (state.loginRoomId !== id) {
      history.push("/");
    }
  })

  const handleExit = () => {
    updateUser(state.uid, null)
    history.push("/")
  }

  return (
    <div>
      {state.loginRoomId === id &&
      <div>
        <p>パラメーターは{id}です</p>
        <button onClick={() => handleExit()}>
          部屋を退室する
        </button>
      </div>}
    </div>
  );
}

export default Room
