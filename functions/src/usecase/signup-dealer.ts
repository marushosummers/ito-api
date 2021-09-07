import {Dealer} from "../domain/entity/Dealer";
import {uuid} from "uuidv4";
import {IDealerRepository} from "./repository-interface/dealer-repository";

export class SignupDealer {
    private readonly dealerRepository: IDealerRepository
    public constructor(dealerRepository: IDealerRepository) {
      this.dealerRepository = dealerRepository;
    }
    public async signup(props: { type: string, name: string }): Promise<string> {
      // TODO: 重複したnameのDealerは作成しない処理を入れる
      const id: string = uuid();
      const type: string = props.type;
      const name: string = props.name;
      const dealer = new Dealer({id, type, name});
      await this.dealerRepository.create(dealer);
      return id;
    }
}
