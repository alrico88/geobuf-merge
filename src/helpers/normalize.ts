import { decode } from 'geobuf';
import Pbf from 'pbf';
import type { FeatureCollection } from 'geojson';

export function normalizePbf(pbf: Uint8Array): FeatureCollection {
  const decoded = decode(new Pbf(pbf));

  if (decoded.type === 'FeatureCollection') {
    return decoded;
  } if (decoded.type === 'GeometryCollection') {
    return {
      type: 'FeatureCollection',
      features: decoded.geometries.map((geometry) => ({
        type: 'Feature',
        geometry,
        properties: {},
      })),
    };
  }

  return {
    type: 'FeatureCollection',
    features: [
      decoded.type === 'Feature' ? decoded : {
        type: 'Feature',
        geometry: decoded,
        properties: {},
      },
    ],
  };
}
