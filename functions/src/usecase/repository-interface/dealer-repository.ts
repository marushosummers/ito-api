import {Dealer} from "../../domain/entity/Dealer";

export interface IDealerRepository {
    create(dealer: Dealer): Promise<void>
}
