import { PhotonFeature } from '@/services/api-photon';

export const getPhotonKey = (photonFeature: PhotonFeature) =>
  `${photonFeature.properties.osm_id}-${photonFeature.properties.osm_type}-${photonFeature.properties.osm_key}`;
