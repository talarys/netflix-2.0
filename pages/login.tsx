import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent brightness-90">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/splash_screen.jpg"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="/Netflix_logo.svg"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={165}
        height={150}
        alt="netflix logo"
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              defaultValue="john@doe.com"
              type="email"
              placeholder="Email"
              className={`input ${
                !errors.email && 'border-b-2 border-orange-500'
              }`}
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              defaultValue="12341234"
              type="password"
              {...register('password', { required: true, minLength: 8 })}
              placeholder="Password"
              className={`input ${
                errors.password && 'border-b-2 border-orange-500'
              }`}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 8 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
          type="submit"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?
          {' '}
          <button
            className="cursor-pointer text-white hover:underline"
            onClick={() => setLogin(false)}
            type="submit"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
