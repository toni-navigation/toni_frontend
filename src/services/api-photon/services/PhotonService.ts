/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhotonFeatureCollection } from '../models/PhotonFeatureCollection';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PhotonService {
    /**
     * Get coordinates for address
     * @returns PhotonFeatureCollection
     * @throws ApiError
     */
    public static geocoding({
        q,
        locationBiasScale,
        limit,
        osmTag,
        lang,
        lon,
        lat,
    }: {
        q: string,
        locationBiasScale?: string,
        limit?: number,
        osmTag?: string,
        lang?: string,
        lon?: number,
        lat?: number,
    }): CancelablePromise<PhotonFeatureCollection> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api',
            query: {
                'q': q,
                'location_bias_scale': locationBiasScale,
                'limit': limit,
                'osm_tag': osmTag,
                'lang': lang,
                'lon': lon,
                'lat': lat,
            },
        });
    }
    /**
     * Get address for coordinates
     * @returns PhotonFeatureCollection
     * @throws ApiError
     */
    public static reverse({
        lon,
        lat,
        limit,
        radius,
        distanceSort = true,
    }: {
        lon: number,
        lat: number,
        /**
         * Maximum number of features
         */
        limit?: number,
        /**
         * Maximum radius in km
         */
        radius?: number,
        distanceSort?: boolean,
    }): CancelablePromise<PhotonFeatureCollection> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reverse',
            query: {
                'lon': lon,
                'lat': lat,
                'limit': limit,
                'radius': radius,
                'distance_sort': distanceSort,
            },
        });
    }
}
