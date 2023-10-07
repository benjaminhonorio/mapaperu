import {
  MAX_DEPARTMENT_ZOOM,
  MAX_PROVINCE_ZOOM,
  MIN_DEPARTMENT_ZOOM,
  MIN_DISTRICT_ZOOM,
  MIN_PROVINCE_ZOOM,
} from './zoomConfig.js';

export const districtFill = {
  id: 'district',
  type: 'fill',
  source: 'districtData',
  paint: {
    'fill-color': 'transparent',
  },
};

export const districtOutline = {
  id: 'district_outline',
  type: 'line',
  source: 'districtData',
  paint: {
    'line-width': 2,
    'line-color': '#000',
  },
  minzoom: MIN_DISTRICT_ZOOM,
};

export const provinceFill = {
  id: 'province',
  type: 'fill',
  source: 'provinceData',
  paint: {
    'fill-color': 'transparent',
  },
};

export const provinceOutline = {
  id: 'province_outline',
  type: 'line',
  source: 'provinceData',
  paint: {
    'line-width': 2,
    'line-color': '#000',
  },
  minzoom: MIN_PROVINCE_ZOOM,
};

export const departmentFill = {
  id: 'department',
  type: 'fill',
  source: 'departmentData',
  paint: {
    'fill-color': 'transparent',
  },
  minzoom: MIN_DEPARTMENT_ZOOM,
};

export const departmentOutline = {
  id: 'department_outline',
  type: 'line',
  source: 'departmentData',
  paint: {
    'line-width': 2,
    'line-color': '#000',
  },
  minzoom: MIN_DEPARTMENT_ZOOM,
};

export const provinceCentroidLabel = {
  id: 'province_centroid_label',
  type: 'symbol',
  source: 'provinceCentroid',
  layout: {
    'text-field': '{name}',
    'text-size': {
      base: 1,
      stops: [
        [12, 12],
        [16, 16],
      ],
    },
    'text-padding': 3,
    'text-letter-spacing': 0.1,
    'text-max-width': 7,
    'text-transform': 'uppercase',
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': '#333',
    'text-halo-color': 'hsl(0, 0%, 100%)',
    'text-halo-width': 1.5,
    'text-halo-blur': 1,
  },
  maxzoom: MAX_PROVINCE_ZOOM,
  minzoom: MIN_PROVINCE_ZOOM,
};

export const departmentCentroidLabel = {
  id: 'department_centroid_label',
  type: 'symbol',
  source: 'departmentCentroid',
  layout: {
    'text-field': '{name}',
    'text-size': {
      base: 1,
      stops: [
        [12, 12],
        [16, 16],
      ],
    },
    'text-padding': 3,
    'text-letter-spacing': 0.1,
    'text-max-width': 7,
    'text-transform': 'uppercase',
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': '#333',
    'text-halo-color': 'hsl(0, 0%, 100%)',
    'text-halo-width': 1.5,
    'text-halo-blur': 1,
  },
  maxzoom: MAX_DEPARTMENT_ZOOM,
  minzoom: MIN_DEPARTMENT_ZOOM,
};

export const districtCentroidLabel = {
  id: 'district_centroid_label',
  type: 'symbol',
  source: 'districtCentroid',
  layout: {
    'text-field': '{name}',
    'text-size': {
      base: 1,
      stops: [
        [12, 12],
        [16, 16],
      ],
    },
    'text-padding': 3,
    'text-letter-spacing': 0.1,
    'text-max-width': 7,
    'text-transform': 'uppercase',
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': '#333',
    'text-halo-color': 'hsl(0, 0%, 100%)',
    'text-halo-width': 1.5,
    'text-halo-blur': 1,
  },
  minzoom: MIN_DISTRICT_ZOOM,
};

export const fixedDepartmentLabelStyle = {
  id: 'fixed_center_label',
  type: 'symbol',
  source: 'fixedDepartmentLabel',
  layout: {
    'text-field': '{name}',
    'text-size': {
      base: 1,
      stops: [
        [12, 12],
        [16, 16],
      ],
    },
    'text-padding': 3,
    'text-letter-spacing': 0.1,
    'text-max-width': 7,
    'text-transform': 'uppercase',
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': '#333',
    'text-halo-color': 'hsl(0, 0%, 100%)',
    'text-halo-width': 1.5,
    'text-halo-blur': 1,
  },
  maxzoom: MAX_DEPARTMENT_ZOOM,
  minzoom: MIN_DEPARTMENT_ZOOM,
};

export const fixedProvinceLabelStyle = {
  id: 'fixed_province_label',
  type: 'symbol',
  source: 'provinceLabel',
  layout: {
    'text-field': '{name}',
    'text-size': {
      base: 1,
      stops: [
        [12, 12],
        [16, 16],
      ],
    },
    'text-padding': 3,
    'text-letter-spacing': 0.1,
    'text-max-width': 7,
    'text-transform': 'uppercase',
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': '#333',
    'text-halo-color': 'hsl(0, 0%, 100%)',
    'text-halo-width': 1.5,
    'text-halo-blur': 1,
  },
  minzoom: MIN_PROVINCE_ZOOM,
  maxzoom: MAX_PROVINCE_ZOOM,
};

export const fixedDistrictLabelStyle = {
  id: 'fixed_district_label',
  type: 'symbol',
  source: 'districtLabel',
  layout: {
    'text-field': '{name}',
    'text-size': {
      base: 1,
      stops: [
        [12, 12],
        [16, 16],
      ],
    },
    'text-padding': 3,
    'text-letter-spacing': 0.1,
    'text-max-width': 7,
    'text-transform': 'uppercase',
    'text-allow-overlap': true,
  },
  paint: {
    'text-color': '#333',
    'text-halo-color': 'hsl(0, 0%, 100%)',
    'text-halo-width': 1.5,
    'text-halo-blur': 1,
  },
  minzoom: MIN_DISTRICT_ZOOM,
};
