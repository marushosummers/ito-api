export class Dealer {
  private name: string
  private type: string

  public constructor(props: {name: string; type: string}) {
    const {name, type} = props;
    this.name = name;
    this.type = type;
  }
}
