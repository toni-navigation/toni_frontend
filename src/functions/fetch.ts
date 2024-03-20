import axios from 'axios';

import { LocationProps } from '@/types/Types';
import { ValhallaProps } from '@/types/Valhalla-Types';
import { VALHALLA_CONFIG } from '@/valhallaConfig';

const VALHALLA_URL = 'https://valhalla1.openstreetmap.de/';

const axiosValhallaInstance = axios.create({ baseURL: VALHALLA_URL });

export const fetchTripHandler = async (
    points: (LocationProps | undefined | null)[]
): Promise<ValhallaProps | null> => {
    const searchJson = {
        ...VALHALLA_CONFIG,
        locations: points.map((point) => ({ ...point, type: 'break' })),
    };

    return (
        await axiosValhallaInstance.get<ValhallaProps>(
            `route?json=${JSON.stringify(searchJson)}&language=de-DE`,
            {
                timeout: 5000,
            }
        )
    ).data;
};
