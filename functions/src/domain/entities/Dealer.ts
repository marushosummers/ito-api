export class Dealer {
  private id: string
  private name: string
  private type: string

  public constructor(props: {id: string, name: string; type: string}) {
    const {id, name, type} = props;
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
