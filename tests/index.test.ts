import Pbf from 'pbf';
import { encode, decode } from 'geobuf';
import type { FeatureCollection } from 'geojson';
import { test, expect } from 'vitest';
import { mergeGeobufs } from '../src';
import { mergeFeatureCollections } from '../src/helpers/merge';
import { normalizePbf } from '../src/helpers/normalize';

test('normalizePbf() returns a FeatureCollection', () => {
  const pbf = encode({ type: 'Point', coordinates: [0, 0] }, new Pbf());

  const normalized = normalizePbf(pbf);

  expect(normalized.type).toStrictEqual('FeatureCollection');
});

test('normalizePbf() returns a FeatureCollection with a single Feature', () => {
  const pbf = encode({ type: 'Point', coordinates: [0, 0] }, new Pbf());

  const normalized = normalizePbf(pbf);

  expect(normalized.features.length).toEqual(1);
  expect(normalized.features[0].geometry.type).toStrictEqual('Point');
});

test('mergeFeatureCollections() merges multiple FeatureCollections', () => {
  const featureCollection1: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {},
      },
    ],
  };
  const featureCollection2: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [0, 0] },
        properties: {},
      },
    ],
  };

  const merged = mergeFeatureCollections([
    featureCollection1, featureCollection2,
  ]);

  expect(merged.features.length).toEqual(2);
});

test('mergeGeobufs() merges multiple Pbf encoded geojson objects', () => {
  const pbf1 = encode({ type: 'Point', coordinates: [0, 0] }, new Pbf());
  const pbf2 = encode({ type: 'Point', coordinates: [0, 0] }, new Pbf());

  const merged = mergeGeobufs([pbf1, pbf2]);
  const decodedMerged = decode(new Pbf(merged)) as FeatureCollection;

  expect(decodedMerged.type).toStrictEqual('FeatureCollection');
  expect(decodedMerged.features.length).toEqual(2);
});
