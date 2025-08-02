interface IpaymentMethod {
  pay(amount: number): void;
}

class CreditCardPayment implements IpaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalPayment implements IpaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class Order {
  private paymentMethod: IpaymentMethod;

  constructor(paymentMethod: IpaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  processPayment(amount: number): void {
    this.paymentMethod.pay(amount);
  }
}

const creditCardPayment = new CreditCardPayment();
const order = new Order(creditCardPayment);
order.processPayment(100);
