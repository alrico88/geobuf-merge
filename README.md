# geobuf-merge

Merge two geobuf-encoded GeoJSONs together

## Installation

Using npm `npm i geobuf-merge`

Using yarn `yarn add geobuf-merge`

## Usage

In CommonJS env

```javascript
const { mergeGeobufs } = require('geobuf-merge');
```

Using imports

```javascript
import { mergeGeobufs } from 'geobuf-merge';
```

Then

```javascript
import Pbf from 'pbf';
import { encode } from 'geobuf';

const pbf1 = encode({ "type": "Point", "coordinates": [-3.652954, 40.417678] }
, new Pbf());
const pbf2 = encode({ "type": "Point", "coordinates": [-4.042969, 39.863371] }
, new Pbf());

const mergedPbf = mergeGeobufs([pbf1, pbf2]);
```

`mergedPbf` is a Geobuf-encoded FeatureCollection including all PBFs to merge.

## Documentation

See [DOCS](./docs/modules.md)
