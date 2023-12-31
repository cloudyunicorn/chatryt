import Loader from '@/components/Loader';
import ToastMessage from '@/components/ToastMessage';
import { useAuth } from '@/context/authContext';
import { auth } from '@/firebase/firebase';
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io';
import { toast } from 'react-toastify';

const gProvider = new GoogleAuthProvider();

const Login = () => {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.push('/');
    }
  }, [currentUser, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, gProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const resetPassword = async () => {
    try {
      toast.promise(
        async () => {
          await sendPasswordResetEmail(auth, email);
        },
        {
          pending: 'Generating reset link',
          success: 'Reset email sent to your registered email Id',
          error: 'Wrong email Id',
        },
        {
          autoClose: 5000,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading || (!isLoading && currentUser) ? (
    <Loader />
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-c1">
      <ToastMessage />
      <div className="flex items-center justify-start flex-col sm:w-full">
        <div className="text-center">
          <div className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Chatryt</div>
          <div className="mb-10 text-c3">
            Connect and chat with anyone, anywhere
          </div>
          <div className="text-4xl font-bold">Login into your account</div>
        </div>
        <div className="flex items-center gap-2 w-full mt-10 mb-5 sm:flex-col sm:gap-5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px] sm:w-3/4"
            onClick={signInWithGoogle}
          >
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px] sm:w-3/4">
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoFacebook size={24} />
              <span>Login with Facebook</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="text-c3 font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>
        <form
          className="flex flex-col items-center gap-3 w-[500px] mt-5 sm:w-[80%]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            autoComplete="off"
          />
          <div className="text-right w-full text-c3">
            <span className="cursor-pointer" onClick={resetPassword}>
              Forget Password
            </span>
          </div>
          <button className="mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Login to Your Account
          </button>
        </form>

        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Not a member yet?</span>
          <Link
            href="/register"
            className="font-semibold text-white underline underline-offset-2 cursor-pointer"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
