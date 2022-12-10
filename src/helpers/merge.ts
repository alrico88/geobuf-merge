import type { FeatureCollection } from 'geojson';

export function mergeFeatureCollections(
  featureCollections: FeatureCollection[],
): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: featureCollections.flatMap((d) => d.features),
  };
}
