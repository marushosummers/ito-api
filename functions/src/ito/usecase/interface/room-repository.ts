import {Room} from "../../domain/entity/Room";

export interface IRoomRepository {
    create(room: Room): Promise<void>
}
