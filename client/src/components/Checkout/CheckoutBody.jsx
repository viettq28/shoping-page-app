import CheckoutForm from "./CheckoutForm";
import CheckoutBill from "./CheckoutBill";

// Gồm CheckoutForm và CheckoutBill
const CheckoutBody = () => {
  return (
    <div className="my-6 mb-10 gap-6 tracking-widest">
      <p className="my-6 text-xl font-medium">BILLING DETAILS</p>
      <div className="flex gap-5">
        <CheckoutForm />
        <CheckoutBill />
      </div>
    </div>
  );
};
export default CheckoutBody;
