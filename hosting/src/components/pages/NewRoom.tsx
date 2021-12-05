import React, { useContext } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import createRoom from "../../hooks/repository/createRoom";

type Inputs = {
  roomName: string,
};

export function NewRoom() {
  const { state, dispatch } = useContext(UserContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log("submit", data);
    const room = await createRoom(state.uid, data.roomName);
    console.log("room", room);
    dispatch({ type: "setRoom", payload: { ...state, room: room } });
  }

  console.log(watch("roomName"))

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
