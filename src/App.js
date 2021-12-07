import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: ["EUR", "USD", "CHF"],
      currency: "EUR",
      amount: "",
      mid: 0,
    };
  }

  handleSelect = (e) => {
    this.setState({
      currency: e.target.value,
    });
  };

  handleInput = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const amount = this.state.amount;
    if (!amount) {
      return alert("Wartość nie może być pusta!");
    } else {
      fetch(
        `https://api.nbp.pl/api/exchangerates/rates/a/${this.state.currency}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            mid: data.rates[0].mid,
          });
        });
    }
  };

  render() {
    const { currencies, amount, mid } = this.state;
    return (
      <div className="wrapper">
        <h1>Przelicznik walut</h1>

        <form className="currency-form">
          <input
            type="number"
            name="value"
            placeholder="Ile chcesz przeliczyć?"
            value={amount}
            onChange={this.handleInput}></input>
          <select name="base" onChange={this.handleSelect}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <div className="convert">
            <button className="convertButton" onClick={this.handleClick}>
              Przelicz
            </button>
          </div>
        </form>
        <form className="result-form">
          <input
            className="result"
            type="text"
            name="result"
            value={"Otrzymasz  " + (amount * mid).toFixed(2) + " PLN"}
            disabled={true}></input>
        </form>
      </div>
    );
  }
}

export default App;
