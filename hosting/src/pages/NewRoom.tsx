import { useContext } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import createRoom from "../hooks/repository/createRoom";

type Inputs = {
  roomName: string,
};

export function NewRoom() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log("createRoom", data);
    const room = await createRoom(state.uid, data.roomName);
    if (room) {
      console.log("room", room);
      dispatch({ type: "setRoom", payload: { ...state, room: room } });
      history.push(`/room/${room.id}`)
    } else {
      console.log("create Room Error")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>へやのなまえ</label>
      <input {...register("roomName", { required: true, minLength: 3, maxLength: 10  })} />
      {errors.roomName && <span>Invalid</span>}
      <input type="submit" />
    </form>
  );
}

export default NewRoom