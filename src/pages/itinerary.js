import { useStateContext } from "@/context/store";
import MapPage from "@/components/GoogleMap";
import Spinner from "@/components/Spinner";

const Itinerary = () => {
  const { response } = useStateContext();

  if (!response) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const {
    recommendations,
    locations,
    earthhopper_emissions,
    average_emissions
  } = response;

  const locationsData = locations.map((location) => ({
    title: location.place_name,
    position: {
      lat: parseFloat(location.place_coordinates.lat),
      lng: parseFloat(location.place_coordinates.lng)
    }
  }));

  return (
    <>
      <div className="my-10">
        <h1 className="text-4xl font-bold mb-5">Emissions</h1>
        <div>
          <div
            className="p-5 bg-verdigris w-full"
          >
            <p className="text-5xl">{average_emissions} kg</p>
            <p className="ml-2 text-md">Without EarthHopper</p>
          </div>
        </div>
        <div className="mt-3">
          <div
            style={{ width: `${parseInt((earthhopper_emissions * 100) / average_emissions)}%` }}
            className="p-5 bg-verdigris"
          >
            <p className="text-5xl">{earthhopper_emissions} kg</p>
            <p className="ml-2 text-md">With EarthHopper</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold">Activities</h1>
        <br />
        <div className="flex flex-wrap">
          {recommendations.map((recommendation) => {
            const carbonEmissions =
              recommendation.carbon_emissions < 1
                ? `${Math.round(recommendation.carbon_emissions * 1000)} g`
                : `${recommendation.carbon_emissions} kg`;

            return (
              <div key={recommendation.activity} className="w-1/2 p-4 flex">
                <div className="border rounded p-4 bg-darkgreen flex-grow">
                  <p className="text-xl mb-2">
                    <span className="font-bold">{recommendation.activity}</span>
                  </p>
                  <p className="text-base">
                    <span className="font-bold">Start Time: </span>
                    {recommendation.start_time}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-bold">Carbon Emissions: </span>
                    <span>{carbonEmissions}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold">Locations</h1>
        <br />
        <div className="flex flex-wrap">
          {locations.map((location) => (
            <div key={location.place_name} className="w-1/2 p-4 flex">
              <div className="border rounded p-4 bg-darkgreen flex-grow">
                <p className="text-xl mb-2">
                  <span className="font-bold">{location.place_name}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        {!locations.length && <div>No locations available</div>}
        {locations.length > 0 && (
          <MapPage
            center={locationsData[0].position}
            zoom={10}
            markers={locationsData}
          />
        )}
      </div>
    </>
  );
};

export default Itinerary;
