import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

function Game() {
  const { state　} = useContext(UserContext);
  const game = state.room.game
  return (
    <div>
      <h2>game</h2>
      <h3>id: {game.id}</h3>
      <h3>thema: {game.thema}</h3>
      <h3>status: {game.status}</h3>
      <hr />
      <h2>Field Card</h2>
      <h1>{getFieldCard(game.players)}</h1>
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

const getFieldCard = (players): number => {
  const playedCards = getPlayedCards(players);

  if (!playedCards.length) {
    return 0; // NOTE: まだ誰もPlayしていない場合は0を返す
  } else {
    return getMaxCard(playedCards).card;
  }
}

const getPlayedCards = (players): any[] => {
  return players.map((player) => player.cards).reduce((prev, cards) => prev.concat((cards.filter((card) => card.isPlayed))), []);
}

const getMaxCard = (cards) => {
  return cards.reduce((prev, current) => ((prev.card > current.card) ? prev : current));
}
