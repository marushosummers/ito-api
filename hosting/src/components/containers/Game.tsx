import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

function Game() {
  const { state, dispatch } = useContext(UserContext);
  const game = state.room.game
  return (
    <div>
      <h2>game</h2>
      <h3>id: {game.id}</h3>
      <h3>thema: {game.thema}</h3>
      <h3>status: {game.status}</h3>
      <hr />
      <h2> players </h2>
      {game.players.map(player => <GamePlayer player={player} />)}
      <hr />
      <h2> my cards </h2>
      {game.players.map(player => player.id === state.uid && <OwnCards player={player} />)}
    </div>
  )
}

export default Game

function OwnCards(props) {
  return (
    <div>
      <h3>own: {props.player.id}</h3>
      {props.player.cards.map(card => <Card card={card} />)}
    </div>
  )
}

function GamePlayer(props) {
  return (
    <div>
      <h3>{props.player.id}</h3>
    </div>
  )
}

function Card(props) {
  return (
    <div>
      <h3>{props.card.id}</h3>
      <h3>{props.card.card}</h3>
      <h3>{String(props.card.isPlayed)}</h3>
    </div>
  )
}
