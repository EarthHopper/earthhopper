import data from "@/../public/citiesdata.json";

export default function handler(req, res) {
    res.status(200).json(data);
}
