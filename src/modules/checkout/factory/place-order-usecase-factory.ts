import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory"
import InvoiceFactory from "../../invoice/factory/invoice-factory"
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory"
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory"
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory"
import CheckoutRepositoryFactory from "../repository/checkout-repository-factory"
import PlaceOrderUseCase from "../usecase/place-order/place-order-usecase"

export default class PlaceOrderUseCaseFactory {
  static create(): PlaceOrderUseCase {
    const invoiceFacade = InvoiceFactory.creatInvoiceFacadeFactory()
    const clientFacade = ClientAdmFacadeFactory.create()
    const productFacade = ProductAdmFacadeFactory.create()
    const catalogFacade = StoreCatalogFacadeFactory.create()
    const paymentFacade = PaymentFacadeFactory.create()
    const checkoutRepository = CheckoutRepositoryFactory.create()

    return new PlaceOrderUseCase({
      clientFacade,
      productFacade,
      catalogFacade,
      paymentFacade,
      invoiceFacade,
      checkoutRepository,
    })
  }
}