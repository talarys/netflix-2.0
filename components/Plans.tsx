import { CheckIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

function Plans() {
  const { logout } = useAuth();
  const [plan, setPlan] = useState('premium');

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            className="cursor-pointer object-contain"
            width={150}
            height={100}
            alt="logo"
            src="/Netflix_logo.svg"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>
      <main className="pt-28 mx-auto max-w-4xl">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan thats right for you
        </h1>
        <div className="flex flex-col gap-y-2 pt-2">
          <div className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="w-7 h-7 text-[#e50914]" />
            Watch all you want. Ad-free.
          </div>
          <div className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="w-7 h-7 text-[#e50914]" />
            Recommendations just for you.
          </div>
          <div className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="w-7 h-7 text-[#e50914]" />
            Everything on Netflix for one low price.
          </div>
        </div>

        {/* Plans choices */}
        <div className="flex justify-between mt-10 gap-x-6 font-light">
          {/* Left text */}
          <div className="flex flex-col gap-y-6">
            <div className="h-[120px] w-[120px]" />
            <div>Monthly price</div>
            <div>Video quality</div>
            <div>Resolution</div>
            <div>Watch on your TV, computer, mobile phone and tablet</div>
          </div>
          {/* Right */}
          <div className="flex gap-x-14 text-center">
            {/* Basic */}
            <div
              className={`flex flex-col gap-y-6 items-center ${plan === 'basic' && 'text-[#e50914]'}`}
              onClick={() => setPlan('basic')}
            >
              <div className={`bg-[#ef6b72] !text-white flex items-center justify-center h-[120px] w-[120px] rounded-sm 
              ${plan === 'basic' && 'selectedPlan'}`}
              >
                Basic
              </div>
              <div>$7.99</div>
              <div>Good</div>
              <div>480p</div>
              <div><CheckIcon className="w-7 h-7" /></div>
            </div>
            {/* Standard */}
            <div
              className={`flex flex-col gap-y-6 items-center ${plan === 'standard' && 'text-[#e50914]'}`}
              onClick={() => setPlan('standard')}
            >
              <div className={`bg-[#ef6b72] !text-white flex items-center justify-center h-[120px] w-[120px] rounded-sm 
              ${plan === 'standard' && 'selectedPlan'}`}
              >
                Standard
              </div>
              <div>$12.99</div>
              <div>Better</div>
              <div>1080p</div>
              <div><CheckIcon className="w-7 h-7" /></div>
            </div>
            {/* Premium */}
            <div
              className={`flex flex-col gap-y-6 items-center ${plan === 'premium' && 'text-[#e50914]'}`}
              onClick={() => setPlan('premium')}
            >
              <div className={`bg-[#ef6b72] !text-white flex items-center justify-center h-[120px] w-[120px] rounded-sm 
              ${plan === 'premium' && 'selectedPlan'}`}
              >
                Premium
              </div>
              <div>$17.99</div>
              <div>Best</div>
              <div>4K+HDR</div>
              <div><CheckIcon className="w-7 h-7" /></div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[gray] mt-6">
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
        </p>
        <p className="text-xs text-[gray] mt-2">
          Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.
        </p>
        <button className="flex justify-center items-center mx-auto mt-4 bg-[#f6121d] py-3 px-[150px] text-xl rounded-sm">Next</button>
      </main>
    </div>
  );
}

export default Plans;
