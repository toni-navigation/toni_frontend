import { photonValue } from '@/functions/photonValue';
import { CreatePhotonFeatureDto } from '@/services/api-backend';

export const inputButtonOutput = (
  location: CreatePhotonFeatureDto | null | undefined
) => {
  if (location === undefined) {
    return '';
  }
  if (location === null) {
    return 'Mein Standort';
  }

  return photonValue(location);
};
