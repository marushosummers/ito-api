import {Dealer} from "../domain/entity/Dealer";
import {v4 as uuid} from "uuid";
import {IDealerRepository} from "./interface/dealer-repository";
import {IQueryService} from "./interface/query-service";

export class SignupDealer {
  private readonly dealerRepository: IDealerRepository
  private readonly qs: IQueryService;
  public constructor(dealerRepository: IDealerRepository, qs: IQueryService) {
    this.dealerRepository = dealerRepository;
    this.qs = qs;
  }
  public async signup(props: { type: string, name: string }): Promise<Dealer> {
    // NOTE: 同じnameのdealerは作れない
    const dealer = await this.qs.getDealerByName(props.name);
    if (dealer) {
      throw Error();
    }
    const id: string = uuid();
    const {type, name} = props;
    const newDealer = new Dealer({id, type, name});
    await this.dealerRepository.create(newDealer);
    return newDealer;
  }
}
