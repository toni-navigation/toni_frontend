// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { UsersControllerFindAllUsersData, UsersControllerFindAllUsersResponse, UsersControllerCreateUserData, UsersControllerCreateUserResponse, UsersControllerDeleteUserData, UsersControllerDeleteUserResponse, UsersControllerFindUserByIdData, UsersControllerFindUserByIdResponse, UsersControllerUpdateUserData, UsersControllerUpdateUserResponse, AuthenticationControllerLogoutData, AuthenticationControllerLogoutResponse, AuthenticationControllerGetUserData, AuthenticationControllerGetUserResponse, AuthenticationControllerLoginData, AuthenticationControllerLoginResponse, AuthenticationControllerConfirmEmailData, AuthenticationControllerForgotPasswordData, FavoritesControllerFindAllFavoritesData, FavoritesControllerFindAllFavoritesResponse, FavoritesControllerCreateFavoriteData, FavoritesControllerCreateFavoriteResponse, FavoritesControllerDeleteFavoriteData, FavoritesControllerDeleteFavoriteResponse, FavoritesControllerFindFavoriteByIdData, FavoritesControllerFindFavoriteByIdResponse, FavoritesControllerUpdateFavoriteData, FavoritesControllerUpdateFavoriteResponse } from './types.gen';

export const client = createClient(createConfig());

export const usersControllerFindAllUsers = <ThrowOnError extends boolean = false>(options?: Options<UsersControllerFindAllUsersData, ThrowOnError>) => {
    return (options?.client ?? client).get<UsersControllerFindAllUsersResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/users'
    });
};

export const usersControllerCreateUser = <ThrowOnError extends boolean = false>(options: Options<UsersControllerCreateUserData, ThrowOnError>) => {
    return (options?.client ?? client).post<UsersControllerCreateUserResponse, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/users'
    });
};

export const usersControllerDeleteUser = <ThrowOnError extends boolean = false>(options: Options<UsersControllerDeleteUserData, ThrowOnError>) => {
    return (options?.client ?? client).delete<UsersControllerDeleteUserResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/users/{userId}'
    });
};

export const usersControllerFindUserById = <ThrowOnError extends boolean = false>(options: Options<UsersControllerFindUserByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<UsersControllerFindUserByIdResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/users/{userId}'
    });
};

export const usersControllerUpdateUser = <ThrowOnError extends boolean = false>(options: Options<UsersControllerUpdateUserData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UsersControllerUpdateUserResponse, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/users/{userId}'
    });
};

export const authenticationControllerLogout = <ThrowOnError extends boolean = false>(options?: Options<AuthenticationControllerLogoutData, ThrowOnError>) => {
    return (options?.client ?? client).delete<AuthenticationControllerLogoutResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/authentication'
    });
};

export const authenticationControllerGetUser = <ThrowOnError extends boolean = false>(options?: Options<AuthenticationControllerGetUserData, ThrowOnError>) => {
    return (options?.client ?? client).get<AuthenticationControllerGetUserResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/authentication'
    });
};

export const authenticationControllerLogin = <ThrowOnError extends boolean = false>(options: Options<AuthenticationControllerLoginData, ThrowOnError>) => {
    return (options?.client ?? client).post<AuthenticationControllerLoginResponse, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/authentication'
    });
};

export const authenticationControllerConfirmEmail = <ThrowOnError extends boolean = false>(options: Options<AuthenticationControllerConfirmEmailData, ThrowOnError>) => {
    return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
        ...options,
        url: '/api/authentication/confirm-email'
    });
};

export const authenticationControllerForgotPassword = <ThrowOnError extends boolean = false>(options: Options<AuthenticationControllerForgotPasswordData, ThrowOnError>) => {
    return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/authentication/forgot-password'
    });
};

export const favoritesControllerFindAllFavorites = <ThrowOnError extends boolean = false>(options?: Options<FavoritesControllerFindAllFavoritesData, ThrowOnError>) => {
    return (options?.client ?? client).get<FavoritesControllerFindAllFavoritesResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/favorites'
    });
};

export const favoritesControllerCreateFavorite = <ThrowOnError extends boolean = false>(options: Options<FavoritesControllerCreateFavoriteData, ThrowOnError>) => {
    return (options?.client ?? client).post<FavoritesControllerCreateFavoriteResponse, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/favorites'
    });
};

export const favoritesControllerDeleteFavorite = <ThrowOnError extends boolean = false>(options: Options<FavoritesControllerDeleteFavoriteData, ThrowOnError>) => {
    return (options?.client ?? client).delete<FavoritesControllerDeleteFavoriteResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/favorites/{favoriteId}'
    });
};

export const favoritesControllerFindFavoriteById = <ThrowOnError extends boolean = false>(options: Options<FavoritesControllerFindFavoriteByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<FavoritesControllerFindFavoriteByIdResponse, unknown, ThrowOnError>({
        ...options,
        url: '/api/favorites/{favoriteId}'
    });
};

export const favoritesControllerUpdateFavorite = <ThrowOnError extends boolean = false>(options: Options<FavoritesControllerUpdateFavoriteData, ThrowOnError>) => {
    return (options?.client ?? client).patch<FavoritesControllerUpdateFavoriteResponse, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/favorites/{favoriteId}'
    });
};