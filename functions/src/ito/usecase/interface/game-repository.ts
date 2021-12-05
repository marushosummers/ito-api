import {Game} from "../../domain/entity/Game";

export interface IGameRepository {
    roomId: string
    save(game: Game): Promise<void>
}
