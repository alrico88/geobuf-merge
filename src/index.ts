import Pbf from 'pbf';
import { encode } from 'geobuf';
import { normalizePbf } from './helpers/normalize';
import { mergeFeatureCollections } from './helpers/merge';

/**
 * Merge an array of geobufs together
 *
 * @export
 * @param {Uint8Array[]} geobufs
 * @return {Uint8Array[]} The merged geobuf
 */
export function mergeGeobufs(geobufs: Uint8Array[]): Uint8Array {
  const decoded = geobufs.map((geobuf) => normalizePbf(geobuf));

  return encode(mergeFeatureCollections(decoded), new Pbf());
}
