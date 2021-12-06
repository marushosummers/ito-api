import { useParams, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

import updateUser from "../hooks/repository/updateUser";
import addMember from "../hooks/repository/addMember";
import removeMember from "../hooks/repository/removeMember";

import Game from "../components/containers/Game";

import { doc, onSnapshot } from "firebase/firestore";
import { firestore, startGameFunction, playFunction } from '../firebase';

type Id = {
  id: string;
};

function Room() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext)
  const { id } = useParams<Id>();

  useEffect(() => {
    // TODO: hooksに切り出し
    const unsub = onSnapshot(doc(firestore, "rooms", id), (doc) => {
      dispatch({
        type: 'setRoom',
        payload: { room: { ...doc.data(), id: doc.id } }
      });
    });
    addMember(state.uid, id);
    return unsub;
  }, [dispatch, state.uid, id]);

  useEffect(() => {
    // roomIdをstateに保存
    if (!state.loginRoomId) {
      updateUser(state.uid, id)
    } else if (state.loginRoomId !== id) {
      history.push("/");
    }
  }, [history, state.loginRoomId, state.uid, id])

  const handleStart = () => {
    startGameFunction({
      roomId: id,
      members: state.room.members,
      thema: "test",
      maxCard: 100,
      handNum: 3
    });
  }

  const handlePlay = () => {
    playFunction({
      roomId: id,
      playerId: state.uid,
    });
  }

  const handleExit = () => {
    updateUser(state.uid, null);
    removeMember(state.uid, id);
    history.push("/")
  }

  return (
    <div>
      {
        state.loginRoomId === id &&
      <div>
          <p>パラメーターは{id}です</p>
          <button onClick={() => handleStart()}>
            ゲームを開始する
          </button>
          <button onClick={() => handlePlay()}>
            カードを出す
          </button>
          <button onClick={() => handleExit()}>
            部屋を退室する
          </button>
          <div>
            { state.room?.game && <Game />}
          </div>
        </div>
      }
    </div>
  );
}

export default Room;
