import { startGameFunction } from "../firebase";

const startGame = async (): Promise<void> => {
  startGameFunction().then((result) => {
    const data: any = result.data;
  });
}

export default startGame
