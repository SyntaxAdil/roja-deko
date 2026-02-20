export default async function handler(req, res) {
  const { lat, lon, api_key } = req.query;
  const response = await fetch(
    `https://islamicapi.com/api/v1/ramadan/?lat=${lat}&lon=${lon}&api_key=${api_key}`
  );
  const data = await response.json();
  res.status(200).json(data);
}