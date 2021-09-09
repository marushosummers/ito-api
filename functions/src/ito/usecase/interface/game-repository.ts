import {Game} from "../../domain/entity/Game";

export interface IGameRepository {
    dealerId: string
    save(game: Game): Promise<void>
}
