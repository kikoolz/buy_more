import { PaymentFormInputs, paymentFormSchema } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {};

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handlePaymentForm)}
    >
      {/* CARD HOLDER */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="cardHolder"
          className="text-sm font-semibold text-gray-800"
        >
          Card Holder
        </label>
        <input
          className="border-b border-gray-100 outline-none py-2 text-smtransition-all duration-300"
          type="text"
          id="cardHolder"
          placeholder="Enter your card holder"
          {...register("cardHolder")}
        />
        {errors.cardHolder && (
          <p className="text-red-500">{errors.cardHolder.message}</p>
        )}
      </div>
      {/* CARD NUMBER */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="cardNumber"
          className="text-sm font-semibold text-gray-800"
        >
          Card Number
        </label>
        <input
          className="border-b border-gray-100 outline-none py-2 text-smtransition-all duration-300"
          type="number"
          id="cardNumber"
          placeholder="Enter your card number"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      {/* EXPIRATION DATE */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="expirationDate"
          className="text-sm font-semibold text-gray-800"
        >
          Expiration Date
        </label>
        <input
          className="border-b border-gray-100 outline-none py-2 text-smtransition-all duration-300"
          type="number"
          id="expirationDate"
          placeholder="MM/YY"
          {...register("expirationDate")}
        />
        {errors.expirationDate && (
          <p className="text-red-500">{errors.expirationDate.message}</p>
        )}
      </div>
      {/* CVV */}
      <div className="flex flex-col gap-2">
        <label htmlFor="cvv" className="text-sm font-semibold text-gray-800">
          CVV
        </label>
        <input
          className="border-b border-gray-100 outline-none py-2 text-smtransition-all duration-300"
          type="number"
          id="cvv"
          placeholder="123"
          {...register("cvv")}
        />
        {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
      </div>
      {/* PAYMENT METHOD */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <Image
          src="/klarna.png"
          alt="klarna"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/cards.png"
          alt="cards"
          width={50}
          height={25}
          className="rounded-md"
        />
        <Image
          src="/stripe.png"
          alt="stripe"
          width={50}
          height={25}
          className="rounded-md"
        />
      </div>
      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        Confirm Payment
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

export default PaymentForm;
