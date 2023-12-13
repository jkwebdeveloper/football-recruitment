import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../../hooks/useAbortCallApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleUpdateProfile } from "../../redux/AuthSlice";
import toast from "react-hot-toast";
import { profileSchema } from "../../utils/Validations";
import PhoneInput from "react-phone-input-2";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const ManageAccount = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const { loading, user, token } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();

  const { AbortControllerRef } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      state: user?.state,
      city: user?.city,
      country: user?.country,
      phone: user?.phone,
    },
  });

  const onSubmit = (data) => {
    if (loading) return;
    const { name, phone, state, city, country } = data;
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    }

    const response = dispatch(
      handleUpdateProfile({
        name,
        phone,
        state,
        city,
        country,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          toast.success("Profile update successfully.");
        }
      });
    }
  };

  useEffect(() => {
    const countries = Country.getAllCountries();

    const usersCountry = countries.find((i) => i.name == user?.country);
    const state = State.getStatesOfCountry(usersCountry?.isoCode);

    const usersState = State.getAllStates().find(
      (i) => i?.name === user?.state
    );

    const city = City.getCitiesOfState(usersCountry?.isoCode, "GJ");
  }, []);

  // console.log(user);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white xl:p-5 p-3"
    >
      <p className="text-xl text-[#25324B] font-semibold">Manage Account</p>
      <div className="text-left md:space-y-2">
        <label className="label_text" htmlFor="email">
          Name
        </label>
        <input
          className="input_field"
          id="username"
          type="text"
          placeholder="John Adam"
          {...register("name")}
        />
        <span className="error">{errors?.name?.message}</span>
      </div>
      <div className="flex lg:flex-row flex-col w-full gap-3">
        <div className="text-left md:space-y-2 lg:w-1/2 w-full">
          <label className="label_text" htmlFor="email">
            Email id
          </label>
          <input
            className="input_field"
            id="username"
            type="email"
            placeholder="johnadma235@mail.com"
            defaultValue={user?.email}
            disabled
            readOnly
          />
          <span className="error">{errors?.email?.message}</span>
        </div>
        <div className="lg:w-1/2 w-full  md:space-y-2">
          <label className="label_text" htmlFor="phone">
            phone
          </label>
          <PhoneInput
            country={"us"}
            countryCodeEditable={false}
            enableSearch={true}
            inputProps={{
              name: "phone",
            }}
            onChange={(value) => setValue("phone", "+".concat(value).trim())}
            value={getValues("phone")}
            inputStyle={{
              width: "100%",
              // borderRadius: "6px",
              // border: "1px",
              padding: "1.2rem 0 1.2rem 3rem",
            }}
            disabled={loading}
            // dropdownStyle={{ background: "lightgray" }}
            // buttonStyle={{ border: "0px" }}
          />
          <span className="error">{errors?.phone?.message}</span>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col w-full gap-3">
        <div className="text-left space-y-1 w-full lg:w-1/2">
          <label htmlFor="city" className="label_text">
            Current city
          </label>
          <input
            type="text"
            name="city"
            className="input_field"
            placeholder="Enter your city"
            {...register("city")}
          />
          <span className="error">{errors?.city?.message}</span>
        </div>
        <div className="text-left space-y-1 w-full lg:w-1/2">
          <label htmlFor="state" className="label_text">
            Current state
          </label>
          <input
            type="text"
            name="state"
            className="input_field"
            placeholder="Enter your state"
            {...register("state")}
          />
          <span className="error">{errors?.state?.message}</span>
        </div>
      </div>
      <div className="text-left space-y-1 w-full">
        <label htmlFor="country" className="label_text">
          Current country
        </label>
        <input
          type="text"
          name="state"
          className="input_field"
          placeholder="Enter your state"
          {...register("country")}
        />
        <span className="error"> {errors?.country?.message}</span>
      </div>
      <div>
        <button type="submit" disabled={loading} className="blue_button">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ManageAccount;
