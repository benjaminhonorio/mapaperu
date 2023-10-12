import * as turf from '@turf/turf';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef, useState } from 'react';
import MapLibre, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  NavigationControl,
  ScaleControl,
  Source,
} from 'react-map-gl/maplibre';
import centrosDepartamentos from './assets/centrosDepartamentos.json';
import centrosDistritos from './assets/centrosDistritos.json';
import centrosProvincias from './assets/centrosProvincias.json';
import departamentos from './assets/departamentos.json';
import distritos from './assets/distritos.json';
import style from './assets/mapStyle.json';
import provincias from './assets/provincias.json';

import {
  departmentCentroidLabel,
  departmentFill,
  departmentHighlight,
  departmentOutline,
  districtCentroidLabel,
  districtFill,
  districtHighlight,
  districtOutline,
  fixedDepartmentLabelStyle,
  fixedDistrictLabelStyle,
  fixedProvinceLabelStyle,
  provinceCentroidLabel,
  provinceFill,
  provinceHighlight,
  provinceOutline,
} from './layerStyles.js';

import {
  INITIAL_ZOOM,
  MAX_DEPARTMENT_ZOOM,
  MAX_PROVINCE_ZOOM,
  MIN_DEPARTMENT_ZOOM,
  MIN_DISTRICT_ZOOM,
  MIN_PROVINCE_ZOOM,
} from './zoomConfig.js';

import { getLabelFeatures, getMapViewBounds } from './utils';

const EMPTY_FEATURE = {
  type: 'FeatureCollection',
  features: [],
};

const DISTRICT = 'district';
const PROVINCE = 'province';
const DEPARTMENT = 'department';
const KEY = 'name';
const OUTLINE = (name) => `${name}_outline`;
const NOT_IN_FILTER = ['!in', KEY];
const EQUALS_NAME_FILTER = ['==', KEY, ''];

const defaultView = {
  latitude: -9.061119,
  longitude: -78.57901,
  zoom: INITIAL_ZOOM,
};

const interactiveLayerIds = [
  OUTLINE(DEPARTMENT),
  DEPARTMENT,
  OUTLINE(PROVINCE),
  PROVINCE,
  OUTLINE(DISTRICT),
  DISTRICT,
];

function App() {
  const mapRef = useRef(null);
  const layerRef = useRef(DEPARTMENT);
  const [viewState, setViewState] = useState(defaultView);
  const [depCentroid, setDepCentroid] = useState(EMPTY_FEATURE);
  const [depLabelFilter, setDepLabelFilter] = useState(NOT_IN_FILTER);
  const [depHighlightedFilter, setDepHighlightedFilter] =
    useState(EQUALS_NAME_FILTER);
  const [provCentroid, setProvCentroid] = useState(EMPTY_FEATURE);
  const [provLabelFilter, setProvLabelFilter] = useState(NOT_IN_FILTER);
  const [provHighlightedFilter, setProvHighlightedFilter] =
    useState(EQUALS_NAME_FILTER);
  const [distCentroid, setDistCentroid] = useState(EMPTY_FEATURE);
  const [distLabelFilter, setDistLabelFilter] = useState(NOT_IN_FILTER);
  const [distHighlightedFilter, setDistHighlightedFilter] =
    useState(EQUALS_NAME_FILTER);

  const onClick = (e) => {
    const map = e.target;
    const features = map.queryRenderedFeatures(e.point, {
      layers: [layerRef.current],
    });
    const feature = features[0];
    if (feature) {
      map.fitBounds(turf.bbox(feature.geometry));
      switch (feature.source) {
        case 'departmentData':
          setDepHighlightedFilter(['==', 'name', feature.properties.name]);
          layerRef.current = PROVINCE;
          break;
        case 'provinceData':
          setProvHighlightedFilter(['==', 'name', feature.properties.name]);
          layerRef.current = DISTRICT;
          break;
        case 'districtData':
          setDistHighlightedFilter(['==', 'name', feature.properties.name]);
          layerRef.current = DEPARTMENT;
          break;
        default:
          break;
      }
    }
  };

  const onContextMenu = (e) => {
    const map = e.target;
    map.fitBounds([-84.6356535, -18.3984472, -68.6519906, -0.0392818]);
    setDepHighlightedFilter(['==', 'name', '']);
    setProvHighlightedFilter(['==', 'name', '']);
    setDistHighlightedFilter(['==', 'name', '']);
    layerRef.current = DEPARTMENT;
  };

  const onMoveEnd = async (e) => {
    const map = e.target;
    const zoom = map.getZoom();
    const mapViewBound = getMapViewBounds(map);
    await new Promise((res) => setTimeout(res, 300));
    if (zoom > MIN_DEPARTMENT_ZOOM && zoom < MAX_DEPARTMENT_ZOOM) {
      const { fixedLabelFilter, centroidFeatures } = getLabelFeatures({
        map,
        mapViewBound,
        layer: DEPARTMENT,
        labelKey: KEY,
      });
      setDepLabelFilter(fixedLabelFilter);
      setDepCentroid((prev) => ({
        ...prev,
        features: centroidFeatures,
      }));
    } else if (zoom > MIN_PROVINCE_ZOOM && zoom < MAX_PROVINCE_ZOOM) {
      const { fixedLabelFilter, centroidFeatures } = getLabelFeatures({
        map,
        mapViewBound,
        layer: PROVINCE,
        labelKey: KEY,
      });
      setProvLabelFilter(fixedLabelFilter);
      setProvCentroid((prev) => ({
        ...prev,
        features: centroidFeatures,
      }));
    } else if (zoom > MIN_DISTRICT_ZOOM) {
      const { fixedLabelFilter, centroidFeatures } = getLabelFeatures({
        map,
        mapViewBound,
        layer: DISTRICT,
        labelKey: KEY,
      });
      setDistLabelFilter(fixedLabelFilter);
      setDistCentroid((prev) => ({
        ...prev,
        features: centroidFeatures,
      }));
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MapLibre
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={style}
        interactiveLayerIds={interactiveLayerIds}
        onClick={onClick}
        onMoveEnd={onMoveEnd}
        onContextMenu={onContextMenu}
      >
        <Source id="departmentData" type="geojson" data={departamentos}>
          <Layer {...departmentFill} />
          <Layer {...departmentOutline} />
        </Source>
        <Source
          id="fixedDepartmentLabel"
          type="geojson"
          data={centrosDepartamentos}
        >
          <Layer {...fixedDepartmentLabelStyle} filter={depLabelFilter} />
        </Source>
        <Source id="departmentCentroid" type="geojson" data={depCentroid}>
          <Layer {...departmentCentroidLabel} />
        </Source>
        <Source id="provinceData" type="geojson" data={provincias}>
          <Layer {...provinceFill} />
          <Layer {...provinceOutline} />
        </Source>
        <Source id="fixedProvinceLabel" type="geojson" data={centrosProvincias}>
          <Layer {...fixedProvinceLabelStyle} filter={provLabelFilter} />
        </Source>
        <Source id="provinceCentroid" type="geojson" data={provCentroid}>
          <Layer {...provinceCentroidLabel} />
        </Source>
        <Source id="districtData" type="geojson" data={distritos}>
          <Layer {...districtFill} />
          <Layer {...districtOutline} />
        </Source>
        <Source id="fixedDistrictLabel" type="geojson" data={centrosDistritos}>
          <Layer {...fixedDistrictLabelStyle} filter={distLabelFilter} />
        </Source>
        <Source id="districtCentroid" type="geojson" data={distCentroid}>
          <Layer {...districtCentroidLabel} />
        </Source>
        <Layer {...districtHighlight} filter={distHighlightedFilter} />
        <Layer {...provinceHighlight} filter={provHighlightedFilter} />
        <Layer {...departmentHighlight} filter={depHighlightedFilter} />
        <ScaleControl />
        <FullscreenControl />
        <GeolocateControl />
        <NavigationControl />
      </MapLibre>
    </div>
  );
}

export default App;
