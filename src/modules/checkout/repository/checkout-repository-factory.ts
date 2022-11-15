import CheckoutGateway from "../gateway/checkout-gateway";
import CheckoutRepository from "./checkout-repository";

export default class CheckoutRepositoryFactory {
  static create(): CheckoutGateway {
    return new CheckoutRepository()
  }
}