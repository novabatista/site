import { Coordinate } from "@/address/address";

export function generateMapUrl(coord: Coordinate, zoom=17, color = 'black') {
  const { lat, lng } = coord;
  
  return [
    'https://www.google.com/maps/search/',
    '?api=1',
    `&query=${lat},${lng}`,
    `&zoom=${zoom}`,
    `&markers=color:${color}|${lat},${lng}`,
  ].join('');
}