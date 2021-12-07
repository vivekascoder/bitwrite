/**
 * Component for ERC 20 transfer.
 */

import React from "react";
import PropTypes from "prop-types";

const tailwindClasses = {
  div: "bg-gray-900 m-2",
  innerDiv:
    "bg-pink-800 p-1.5 uppercase text-sm font-semibold text-white mb-3 text-center",
  input: "block w-full p-2 focus:outline-none",
};

const ERC20Transfer = (props) => {
  return (
    <form
      className={tailwindClasses.div}
      onSubmit={(e) => {
        e.preventDefault();
        props.transfer();
      }}
    >
      <div className={tailwindClasses.innerDiv}>
        <h1>Transfer $BIT</h1>
      </div>
      <div className="space-y-2 p-3">
        <input
          className={tailwindClasses.input}
          type="text"
          placeholder="Recipient"
          value={props.recipient}
          onChange={(e) => {
            props.setRecipient(e.target.value);
          }}
        />
        <input
          className={tailwindClasses.input}
          type="text"
          placeholder="Amount of $BIT"
          value={props.amount}
          onChange={(e) => {
            props.setAmount(e.target.value);
          }}
        />
        <input
          type="submit"
          value="Send"
          className="btn cursor-pointer text-xs"
        />
      </div>
    </form>
  );
};

PropTypes.ERC20Transfer = {
  recipient: PropTypes.string,
  amount: PropTypes.string,
  setRecipient: PropTypes.func,
  setAmount: PropTypes.func,
  transfer: PropTypes.func,
};

export default ERC20Transfer;
