export class Dealer {
  public readonly id: string
  public readonly name: string
  public readonly type: string

  public constructor(props: {id: string, name: string; type: string}) {
    const {id, name, type} = props;
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
