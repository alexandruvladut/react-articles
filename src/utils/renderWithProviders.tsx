import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { RootState } from '../app/store';
import { articlesApi } from '../features/articles/articlesApi';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  preloadedState?: PreloadedState<RootState>;
}

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/', preloadedState = {
    auth: {
      user: null,
      token: null
    },
    authApi: {
      queries: {},
      mutations: {},
      provided: {},
      subscriptions: {},
      config: {
        refetchOnMountOrArgChange: 0,
        refetchOnReconnect: false,
        refetchOnFocus: false,
        reducerPath: 'authApi',
        online: false,
        focused: false,
        middlewareRegistered: false,
        keepUnusedDataFor: 0
      }
    },
    articlesApi: {
      queries: {},
      mutations: {},
      provided: {
        Articles: {}
      },
      subscriptions: {},
      config: {
        refetchOnMountOrArgChange: 0,
        refetchOnReconnect: false,
        refetchOnFocus: false,
        reducerPath: 'articlesApi',
        online: false,
        focused: false,
        middlewareRegistered: false,
        keepUnusedDataFor: 0
      }
    }
  }, ...renderOptions }: RenderWithProvidersOptions = {}
) => {

  const testStore = configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [articlesApi.reducerPath]: articlesApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, articlesApi.middleware),
  });

  return {
    ...render(
      <Provider store={testStore} >
        <MemoryRouter
          initialEntries={[route]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }} >
          <Routes>
            <Route path="*" element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>,
      renderOptions
    ),
    store: testStore,
  };
};
