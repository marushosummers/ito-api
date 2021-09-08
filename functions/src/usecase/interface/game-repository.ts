import {Game} from "../../domain/entity/Game";

export interface IGameRepository {
    dealerId: string
    create(game: Game): Promise<void>
    quit(gameId: string): Promise<void>
}
