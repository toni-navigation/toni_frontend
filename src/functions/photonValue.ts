import { CreatePhotonFeatureDto } from '@/services/api-backend';
import { PhotonFeature } from '@/services/api-photon';

export function photonValue(feature: PhotonFeature | CreatePhotonFeatureDto) {
  let value = '';
  if (feature.properties.name) {
    value += `${feature.properties.name}, `;
  }
  if (feature.properties.street) {
    value += `${feature.properties.street}${!feature.properties.housenumber ? ', ' : ''}`;
  }
  if (feature.properties.street && feature.properties.housenumber) {
    value += ` ${feature.properties.housenumber}, `;
  }
  if (feature.properties.city) {
    value += `${feature.properties.city}`;
  } else if (feature.properties.country) {
    value += `${feature.properties.country}`;
  }

  return value;
}
