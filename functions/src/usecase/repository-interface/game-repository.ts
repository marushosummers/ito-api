import {Game} from "../../domain/entity/Game";

export interface IGameRepository {
    create(game: Game): Promise<void>
}
