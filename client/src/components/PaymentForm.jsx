import { Component } from 'react';

import {
  Elements,
  ElementsConsumer,
  CardElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './PaymentForm.scss';

const cardStyles = {
  base: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased'
  }
};

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripePromise: loadStripe(props.publicKey)
    };
  }

  handleFormSubmission = async (event, { elements, stripe }) => {
    event.preventDefault();
    if (!elements || !stripe) return;
    const cardElement = elements.getElement(CardElement);

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    const { paymentMethod, error } = result;

    if (error) {
      throw error;
    } else {
      const token = paymentMethod.id;
      this.props.onSubmit({ token });
    }
  };

  render() {
    return (
      <Elements stripe={this.state.stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => {
            return (
              <form
                onSubmit={event =>
                  this.handleFormSubmission(event, { elements, stripe })
                }
              >
                {this.props.children}
                <label>Credit Card Details</label>
                <div className="input--card">
                  <CardElement options={{ style: cardStyles }} />
                </div>
                <button>Donate Now</button>
              </form>
            );
          }}
        </ElementsConsumer>
      </Elements>
    );
  }
}

export default PaymentForm;
