import { Component } from 'react';
import PaymentForm from './../components/PaymentForm';
import { donateToShelter } from './../services/shelter';

const StripePublicApiKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class ShelterDonation extends Component {
  state = {
    amount: 1,
    currency: 'EUR'
  };

  handlePaymentFormSubmission = async ({ token }) => {
    const id = this.props.match.params.id;
    const { amount, currency } = this.state;
    await donateToShelter(id, { token, amount, currency });
    this.props.history.push(`/shelter/${id}/donate/thank-you`);
  };

  handleDonationAmountChange = event => {
    const { valueAsNumber } = event.target;
    this.setState({ amount: valueAsNumber });
  };

  handleCurrencyChange = event => {
    const { value } = event.target;
    this.setState({ currency: value });
  };

  render() {
    return (
      <main>
        <header>
          <h1>Donate to Shelter</h1>
        </header>
        <PaymentForm
          publicKey={StripePublicApiKey}
          onSubmit={this.handlePaymentFormSubmission}
        >
          <div className="row">
            <div className="col">
              <label htmlFor="input-amount">Amount</label>
              <input
                id="input-amount"
                type="number"
                value={this.state.amount}
                onChange={this.handleDonationAmountChange}
                placeholder="0.00"
              />
            </div>
            <div className="col">
              <label htmlFor="input-currency">Currency</label>
              <select
                id="input-currency"
                value={this.state.currency}
                onChange={this.handleCurrencyChange}
              >
                <option value="EUR">Euros</option>
                <option value="USD">US Dollars</option>
              </select>
            </div>
          </div>
        </PaymentForm>
      </main>
    );
  }
}

export default ShelterDonation;
