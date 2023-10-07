import * as turf from '@turf/turf';
import polylabel from 'polylabel';

export const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach(function (item) {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export const getVisualCenter = (feature, mapViewBound) => {
  if (feature?.geometry?.type == 'Polygon') {
    const intersection = turf.intersect(mapViewBound, feature.geometry);
    if (intersection) {
      const visualCenter = turf.point([0, 0]);
      if (intersection.geometry.coordinates.length > 1) {
        const intersections = [];
        intersection.geometry.coordinates.forEach(function (coordinate) {
          intersections.push(polylabel(coordinate));
        });
        visualCenter.geometry.coordinates = getCenter(intersections);
      } else {
        visualCenter.geometry.coordinates = polylabel(
          intersection.geometry.coordinates
        );
      }
      visualCenter.properties.name = feature.properties.name;
      visualCenter.properties.id = feature.properties.id;
      return visualCenter;
    }
  }
};

export const getCenter = (coordinates = []) => {
  const lngList = [];
  const latList = [];
  coordinates.forEach((coordinate) => {
    lngList.push(coordinate[0]);
    latList.push(coordinate[1]);
  });
  const meanLng = lngList.reduce((p, c) => p + c, 0) / lngList.length;
  const meanLat = latList.reduce((p, c) => p + c, 0) / latList.length;
  return [meanLng, meanLat];
};

export const getLabelFeatures = ({
  map,
  mapViewBound,
  layer = 'department',
  labelKey = 'name',
}) => {
  const features = map.queryRenderedFeatures({
    layers: [layer],
  });
  const visualCenterList = [];
  const fixedLabelFilter = ['!in', labelKey];

  const groups = groupBy(features, (feature) => feature.properties[labelKey]);

  groups.forEach((value, key) => {
    const centroid = turf.point(JSON.parse(value[0].properties.centroid));
    const isCentroidWithinBounds = turf.booleanContains(mapViewBound, centroid);
    if (!isCentroidWithinBounds) {
      fixedLabelFilter.push(key);
      const visualCenter = value.map((obj) =>
        getVisualCenter(obj, mapViewBound)
      );
      const cleared = visualCenter.filter(Boolean);
      if (cleared.length) {
        visualCenterList.push(cleared);
      }
    }
  });
  const centroidFeatures = [];

  visualCenterList.forEach((obj) => {
    const coordinatesList = [];
    obj.forEach(function (feature) {
      coordinatesList.push(feature.geometry.coordinates);
    });
    const center = getCenter(coordinatesList);
    const centerFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: center,
      },
      properties: {
        name: obj[0].properties.name,
        id: obj[0].properties.id,
      },
    };
    centroidFeatures.push(centerFeature);
  });
  return {
    fixedLabelFilter,
    centroidFeatures,
  };
};

export const getMapViewBounds = (map) => {
  const mapBounds = map.getBounds();
  const southWest = [mapBounds.getWest(), mapBounds.getSouth()];
  const northEast = [mapBounds.getEast(), mapBounds.getNorth()];
  const mapViewBound = turf.polygon([
    [
      southWest,
      [northEast[0], southWest[1]],
      northEast,
      [southWest[0], northEast[1]],
      southWest,
    ],
  ]);
  return mapViewBound;
};
