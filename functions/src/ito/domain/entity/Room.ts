export class Room {
  public readonly id: string
  public readonly uid: string
  public readonly type: string

  public constructor(props: {id: string, uid: string; type: string}) {
    const {id, uid, type} = props;
    this.id = id;
    this.uid = uid;
    this.type = type;
  }
}
