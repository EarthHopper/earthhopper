import React, { useEffect, useState, useRef } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { DateRangePicker } from "rsuite";
import { RiSearchLine } from "react-icons/ri";
import { useStateContext } from "@/context/store";

const SuggestionsBox = ({ results, onItemClick }) => (
  <div className="absolute z-50 mt-2 py-2 w-1/2 bg-darkgreen border border-gray-300 rounded-md shadow-lg">
    {results.map((result) => (
      <div
        key={result.id}
        className="px-4 py-2 cursor-pointer hover:bg-eucalyptus"
        onClick={() => onItemClick(result)}
      >
        {result.CapitalName} ({result.CountryName})
      </div>
    ))}
  </div>
);

const Home = () => {
  const [fuse, setFuse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const destinationRef = useRef(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { response, setResponse, removeResponse } = useStateContext();

  useEffect(() => {
    fetch("/api/data/serveCitiesData")
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        const fuseInstance = new Fuse(data, {
          keys: ["CountryName", "CapitalName"],
          threshold: 1
        });
        setFuse(fuseInstance);
      });
  }, []);

  useEffect(() => {
    if (fuse && searchTerm.trim() !== "") {
      const result = fuse.search(searchTerm, { limit: 5 });
      setSearchResults(result.map((item) => item.item));
    } else {
      setSearchResults([]);
    }
  }, [fuse, searchTerm]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFocus = (inputType) => {
    setShowSuggestions("destination");
  };

  const handleSuggestionClick = (suggestion) => {
    const value = suggestion.CapitalName;
    destinationRef.current.value = value;
    setShowSuggestions(false);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const destination = destinationRef.current.value;
    const [startDate, endDate] = dateRange;

    if (!destination || !startDate || !endDate) {
      setError("Please fill in all fields.");
      return;
    }

    const daysInBetween =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    if (daysInBetween > 3) {
      setError("Please select a maximum of 3 days.");
      return;
    }

    setLoading(true);

    fetch(
      `https://earthhopperapi-1-x8119342.deta.app/itinerary?city=${destination}&days_staying=${daysInBetween}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        window.location.href = "/itinerary";
      });
  };

  return (
    <>
      <div>
        {response ? (
          <div>
            <h1 className="text-sage text-4xl font-bold">
              You already have an itinerary!
            </h1>
            <div className="mt-10">
              <Link
                className="bg-darkgreen hover:bg-verdigris text-white p-4 rounded font-bold w-1/2"
                href="/itinerary"
              >
                Go back
              </Link>
              <button
                className="bg-red-600 hover:bg-red-800 text-white p-4 rounded font-bold ml-5"
                onClick={() => removeResponse()}
              >
                Delete itinerary
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-sage text-4xl font-bold">
              Find an eco-friendly holiday itinerary{" "}
              <span className="text-white">today.</span>
            </h1>
            <div>
              {error && (
                <div className="bg-red-600 text-white p-4 rounded font-bold mt-5">
                  {error}
                </div>
              )}
            </div>
            {loading ? (
              <div className="flex items-center justify-center my-5">
                <Spinner />
              </div>
            ) : (
              <form className="mt-5" onSubmit={handleSubmitForm}>
                <div className="md:flex md:space-x-4">
                  <div>
                    <label
                      htmlFor="destination"
                      className="block text-xl font-bold mb-2"
                    >
                      DESTINATION
                    </label>
                    <div className="relative">
                      <input
                        ref={destinationRef}
                        type="text"
                        name="destination"
                        id="destination"
                        className="border-2 border-sage bg-eucalyptus rounded-md py-3 px-10 block"
                        onFocus={() => handleFocus("destination")}
                        onChange={handleSearch}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
                        <RiSearchLine className="text-sage" />
                      </div>
                    </div>
                    {showSuggestions === "destination" &&
                      searchResults.length > 0 && (
                        <SuggestionsBox
                          results={searchResults}
                          onItemClick={handleSuggestionClick}
                        />
                      )}
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-xl font-bold mb-2"
                    >
                      DATES
                    </label>
                    <DateRangePicker
                      value={dateRange}
                      onChange={setDateRange}
                      cleanable
                      placement="auto"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 bg-darkgreen w-1/4 text-white py-3 px-10 rounded-md text-xl font-bold"
                >
                  Generate itinerary
                </button>
              </form>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col mt-10 text-lg font-bold">
        <span className="text-2xl mb-5">Carbon emissions</span>

        <div>
          <div className="w-full h-[7.5px] bg-sage mb-3">&nbsp;</div>
          <div className="p-5 bg-verdigris w-[90%]">
            <p className="text-5xl inline">90 kg</p>
            <p className="ml-2 text-md inline">
              Average daily CO2 emissions by traveler without EarthHopper
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="p-5 bg-verdigris w-[50%]">
            <p className="text-5xl inline">50 kg</p>
            <p className="ml-2 text-md inline">
              Itinerary generated by EarthHopper
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-sage text-4xl font-bold mt-10">
          What is our goal?
        </h1>
        <p className="text-lg mt-5">
          Our user-friendly platform empowers you to make informed choices, from
          carbon offset options to plastic-free travel essentials, ensuring
          every adventure aligns with your values. EarthHopper is your passport
          to a greener, brighter future - one where exploration and preservation
          go hand in hand.
        </p>
      </div>
    </>
  );
};

export default Home;
