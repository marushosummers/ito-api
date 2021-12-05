import {Room} from "../domain/entity/Room";
import {v4 as uuid} from "uuid";
import {IRoomRepository} from "./interface/room-repository";
import {IQueryService} from "./interface/query-service";

export class CreateRoom {
  private readonly roomRepository: IRoomRepository
  private readonly qs: IQueryService;
  public constructor(roomRepository: IRoomRepository, qs: IQueryService) {
    this.roomRepository = roomRepository;
    this.qs = qs;
  }
  public async do(props: { type: string, uid: string }): Promise<Room> {
    const id: string = uuid();
    const {type, uid} = props;
    const newRoom = new Room({id, uid, type});
    await this.roomRepository.create(newRoom);
    return newRoom;
  }
}

