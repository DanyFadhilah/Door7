"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("tradeable");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const getTopGainers = (): Coin[] => {
    return [...coins]
      .filter((coin) => coin.price_change_percentage_24h > 0)
      .sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      )
      .slice(0, 12);
  };

  const tabs = ["tradeable", "gainers"];
  return (
    <>
      <Navbar />
      <div className="bg-black p-3">
        <div className="bg-[url('/bg.png')] h-[700px] bg-no-repeat bg-cover rounded-2xl flex gap-10 justify-between sm:px-30 sm:p-30 p-10 items-center">
          <div className="flex flex-col gap-5 items-center text-center sm:items-center lg:items-start sm:text-center lg:text-left">
            <p className="text-5xl sm:text-6xl font-bold w-3/4 text-white">
              Invest for your future
            </p>
            <p className="text-md sm:text-xl text-gray-400 font-medium w-3/4">
              Trusted by millions to buy, sell, and manage crypto seamlessly.
            </p>
            <div className="flex gap-5 flex-col items-center sm:flex-col md:flex-row">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-5">
                  <EnvelopeIcon className="h-5 w-5 text-white" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="satoshi@nakamoto.com"
                  className="w-full sm:w-[380px] pl-13 pr-3 py-3 h-[56px] placeholder-gray-300 border border-[#717387] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]"
                />
              </div>

              <button className="bg-white text-black px-[32px] py-[18px] rounded-3xl w-[130px] h-[56px] cursor-pointer">
                Sign Up
              </button>
            </div>

            <div className="flex gap-5 items-center">
              <Image src="/qr.png" alt="qr code" width={88} height={88} />
              <span className="text-left text-white">
                Scan to Download App iOS & Android
              </span>
            </div>
          </div>
          <Image
            src="/phone.png"
            alt="phone"
            width={506}
            height={600}
            className="w-[500px] h-auto hidden sm:hidden lg:block"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 py-[180px] px-10 sm:px-38 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-5">
            <div className="flex flex-col text-white justify-between border border-1 lg:w-full rounded-xl p-[24px] justify-between h-[193.5px] w-full sm:w-[278.5px] md:w-[220px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)] hover:bg-[#4AFF96] hover:text-[#003717] duration-300">
              <p>All time volume</p>
              <p className="text-6xl">$5.4T</p>
            </div>

            <div className="flex flex-col text-white justify-between border border-1 lg:w-full rounded-xl p-[24px] justify-between h-[193.5px] w-full sm:w-[278.5px] md:w-[220px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)] hover:bg-[#4AFF96] hover:text-[#003717] duration-300">
              <p>Users active</p>
              <p className="text-6xl">62M+</p>
            </div>

            <div className="flex flex-col text-white justify-between border border-1 lg:w-full rounded-xl p-[24px] justify-between h-[193.5px] w-full sm:w-[278.5px] md:w-[220px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)] hover:bg-[#4AFF96] hover:text-[#003717] duration-300">
              <p>Supported countries</p>
              <p className="text-6xl">180</p>
            </div>

            <div className="flex flex-col text-white justify-between border border-1 lg:w-full rounded-xl p-[24px] justify-between h-[193.5px] w-full sm:w-[278.5px] md:w-[220px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)] hover:bg-[#4AFF96] hover:text-[#003717] duration-300">
              <p>24H trading volume (USD)</p>
              <p className="text-6xl">$2.6B</p>
            </div>
          </div>

          <div className="flex flex-col gap-10 p-10 sm:p-22 md:p-5 lg:items-center md:items-center">
            <p className="text-2xl font-bold sm:text-5xl text-center xl:text-left md:text-4xl text-white">
              Trusted by millions
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 bg-[#ffffff15] py-[8px] pl-[10px] pr-[20px] text-left rounded-md items-center">
                <Image
                  src="/icon-ai.png"
                  alt="icon-ai"
                  width={32}
                  height={32}
                />
                <p className="text-sm text-white">
                  AI for investors Investment research and insights
                </p>
              </div>

              <div className="flex gap-2 bg-[#ffffff15] py-[8px] pl-[10px] pr-[20px] text-left rounded-md items-center">
                <Image
                  src="/headphone.png"
                  alt="icon-headphone"
                  width={32}
                  height={32}
                />
                <p className="text-sm text-white">
                  24/7 customer support, always here for you
                </p>
              </div>

              <div className="flex gap-2 bg-[#ffffff15] py-[8px] pl-[10px] pr-[20px] text-left rounded-md items-center">
                <Image
                  src="/stat.png"
                  alt="icon-stats"
                  width={32}
                  height={32}
                />
                <p className="text-sm text-white">
                  Trade like a Pro with our easy-to-use Trading Tools
                </p>
              </div>

              <div className="flex gap-2 bg-[#ffffff15] py-[8px] pl-[10px] pr-[20px] text-left rounded-md items-center">
                <Image src="/coin.png" alt="icon-coin" width={32} height={32} />
                <p className="text-sm text-white">
                  Crypto journey with Web3 and crypto payments
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[url('/gradient.png')] sm:pt-70 mt-[-50px] sm:mt-[-180px] lg:mt-[-300px] md:mt-[-50px] md:pt-0 lg:pt-40 text-center xl:text-left bg-no-repeat bg-cover flex flex-col gap-5 sm:gap-10 px-10 sm:px-38">
          <p className="text-2xl sm:text-5xl font-bold md:text-4xl text-white">
            Trade spot and margin. <br /> All in one powerful interface.
          </p>

          <p className="text-gray-400 text-sm sm:text-md">
            Door7 products run on the powerful Door7 Protocol, the largest
            crypto marketplace.
          </p>

          <div className="relative p-[3px] bg-gradient-to-r from-[#999999]/10 to-[#FFFFFF]/10 rounded-md overflow-hidden">
            <Image
              src="/trade.png"
              alt="trade"
              width={1000}
              height={1000}
              className="w-full border border-[#999999] rounded-md"
            />
            <div className="absolute bottom-0 left-0 right-0 w-full h-[50px] sm:h-[160px] md:h-[60px] backdrop-blur-xl bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center px-10 sm:px-38 xl:text-left text-center">
          <p className="text-2xl sm:text-5xl font-bold md:text-4xl text-white">
            Why Door7?
          </p>
          <p className="text-gray-400 sm:text-md text-sm">
            Simply and securely buy, sell, and manage hunreds of
            cryptocurrencies.
          </p>
          <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 md:grid-cols-1 gap-5 mt-10">
            <div className=" flex flex-col items-center justify-between gap-2 border border-1 rounded-xl pt-[24px] pb-[40px] px-[24px] h-[400px] w-[300px] lg:w-[350px] sm:w-[364px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]">
              <div>
                <p className="text-lg text-white">Send and receive crypto</p>
                <p className="text-md text-gray-400">
                  Transfer crypto securely and instantly with ease.
                </p>
              </div>
              <Image
                src="/send.png"
                alt="send"
                width={1000}
                height={1000}
                className="w-full mt-15"
              />
            </div>

            <div className=" flex flex-col items-center justify-between gap-2 border border-1 rounded-xl pt-[24px] pb-[40px] px-[24px] h-[400px] w-[300px] lg:w-[350px] sm:w-[364px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]">
              <div>
                <p className="text-lg text-white">
                  Stay updated with crypto news
                </p>
                <p className="text-md text-gray-400">
                  Get the latest market trends and insights in one place.
                </p>
              </div>
              <Image
                src="/comp.png"
                alt="computer"
                width={1000}
                height={1000}
                className="w-[224.73px]"
              />
            </div>

            <div className=" flex flex-col items-center justify-between gap-2 border border-1 rounded-xl pt-[24px] pb-[40px] px-[24px] h-[400px] w-[300px] lg:w-[350px] sm:w-[364px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]">
              <div>
                <p className="text-lg text-white">
                  Loyalty program built for everyone
                </p>
                <p className="text-md text-gray-400">
                  Earn rewards effortlessly by engaging with our platform.
                </p>
              </div>
              <Image
                src="/loyalty.png"
                alt="loyalty"
                width={1000}
                height={1000}
                className="w-[224.73px]"
              />
            </div>

            <div className=" flex flex-col items-center justify-between gap-2 border border-1 rounded-xl pt-[24px] pb-[40px] px-[24px] h-[400px] w-[300px] lg:w-[350px] sm:w-[364px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]">
              <div>
                <p className="text-lg text-white">
                  Deposit and withdraw at any time
                </p>
                <p className="text-md text-gray-400">
                  Enjoy quick and secure deposits and withdrawls anytime.
                </p>
              </div>
              <Image
                src="/depo.png"
                alt="deposit"
                width={1000}
                height={1000}
                className="w-[224.73px]"
              />
            </div>

            <div className="group flex flex-col items-center justify-between gap-2 border border-1 rounded-xl pt-[24px] pb-[40px] px-[24px] h-[400px] w-[300px] lg:w-[350px] sm:w-[364px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]">
              <div>
                <p className="text-lg text-white">Earn rewards for learning</p>
                <p className="text-md text-gray-400">
                  Expand your crypto knowledge and get rewarded for it.
                </p>
              </div>
              <Image
                src="/earn.png"
                alt="earn"
                width={1000}
                height={1000}
                className="w-[224.73px]"
              />
            </div>

            <div className="group flex flex-col items-center justify-between gap-2 border border-1 rounded-xl pt-[24px] pb-[40px] px-[24px] h-[400px] w-[300px] lg:w-[350px] sm:w-[364px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)]">
              <div>
                <p className="text-lg text-white">
                  Save your assets, earn bonuses
                </p>
                <p className="text-md text-gray-400">
                  Secure your holdings while earning passive rewards.
                </p>
              </div>
              <Image
                src="/save.png"
                alt="save"
                width={1000}
                height={1000}
                className="w-[224.73px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center p-10 sm:p-38">
          <p className="text-2xl sm:text-5xl font-bold text-center md:text-4xl text-white">
            Explore crypto like Bitcoin, <br /> Ethereum, and Dogecoin
          </p>
          <p className="text-gray-400 text-center">
            Simply and securely buy, sell, and manage hunreds of
            cryptocurrencies.
          </p>
          <div className="flex bg-[#333333] p-[4px] rounded-3xl">
            {tabs.map((tab) => {
              const isActive = activeTab === tab && hoveredTab === null;
              const isHovered = hoveredTab === tab;

              return (
                <button
                  key={tab}
                  className={`w-[120px] h-[44px] font-semibold rounded-3xl transition-all duration-200 cursor-pointer
                ${
                  isActive || isHovered
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                }`}
                  onClick={() => setActiveTab(tab)}
                  onMouseEnter={() => setHoveredTab(tab)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  {tab === "tradeable" ? "Tradeable" : "Top Gainers"}
                </button>
              );
            })}
          </div>
          <div className="mt-6 text-white">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
                {(activeTab === "tradeable"
                  ? coins.slice(0, 12)
                  : getTopGainers()
                ).map((coin) => (
                  <div
                    key={coin.id}
                    className="flex flex-col justify-between p-[20px] w-[176.67px] h-[175px] bg-[linear-gradient(to_top,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.1)_100%)] rounded-2xl border border-amber-50/20"
                  >
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      className="w-[40px] h-[40px] mb-2"
                      width={1000}
                      height={1000}
                    />
                    <div>
                      <p className="font-semibold truncate overflow-hidden whitespace-nowrap">
                        {coin.name}
                      </p>
                      <p
                        className={`text-sm ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-[#4AFF96]"
                            : "text-red-400"
                        }`}
                      >
                        ${coin.current_price}
                      </p>
                    </div>
                    <p
                      className={`text-sm font-medium text-black px-[8px] py-[3px] rounded-xl w-fit ${
                        coin.price_change_percentage_24h >= 0
                          ? "bg-[#4AFF96]"
                          : "bg-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="px-[24px] py-[14px] w-[119px] h-[48px] bg-white text-black rounded-3xl cursor-pointer">
            See More
          </button>
        </div>

        <div className="flex flex-col gap-5 items-center p-10 sm:px-38">
          <p className="text-2xl sm:text-5xl lg:text-4xl md:text-2xl text-center text-white font-semibold">
            “I&rsquo;ve tried several trading platforms, but this one stands
            out. The intuitive UI, real-time analytics, and secure wallet make
            it my go-to for crypto trading. Staking has never been this easy!”
          </p>

          <div className="flex gap-4 items-center">
            <Image src="/profile.png" alt="profile" width={48} height={48} />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-md text-white">James Harden</p>
              <p className="text-sm text-white">DeFi Investor</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
