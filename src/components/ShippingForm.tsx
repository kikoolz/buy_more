import { SubmitHandler, useForm } from "react-hook-form";

import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push(`/cart?step=3`, { scroll: false });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      {/* NAME */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-800">
          Name
        </label>
        <input
          className="border-b border-gray-100 outline-none py-2 text-smtransition-all duration-300"
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-800">
          Email
        </label>
        <input
          className="border-b border-gray-50 outline-none py-2 text-smtransition-all duration-300"
          type="email"
          id="email"
          placeholder="example@mail.com"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      {/* PHONE */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-800">
          Phone
        </label>
        <input
          className="border-b border-gray-50 outline-none py-2 text-smtransition-all duration-300"
          type="tel"
          id="phone"
          placeholder="0123456789"
          {...register("phone")}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>
      {/* ADDRESS */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-800">
          Address
        </label>
        <input
          className="border-b border-gray-100 outline-none py-2 text-smtransition-all duration-300"
          type="text"
          id="address"
          placeholder="123 Main St"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div>
      {/* CITY */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-800">
          City
        </label>
        <input
          className="border-b border-gray-100 outline-none py-2 text-smtransition-all duration-300"
          type="text"
          id="city"
          placeholder="New York"
          {...register("city")}
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
      >
        Continue to Payment
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ShippingForm;
