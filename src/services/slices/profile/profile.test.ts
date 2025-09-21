import { describe, test, expect, beforeAll, jest } from '@jest/globals';
import profileSlice, { signUp, signIn, getUser, updateUser, logout } from './profile';

// Мок localStorage
beforeAll(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
  });
});

// Мок cookie-функции
jest.mock('@utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const initialState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

const mockUser = { name: 'Test', email: 'test@test.com' };

const mockAuthResponse = {
  success: true,
  user: mockUser,
  accessToken: '',
  refreshToken: ''
};

describe('profileSlice reducer', () => {
  test('signUp.pending', () => {
    const nextState = profileSlice.reducer(initialState, signUp.pending('', undefined as any));
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('signUp.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      signUp.fulfilled(mockAuthResponse, '', undefined as any)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isAuthChecked).toBe(true);
  });

  test('signUp.rejected', () => {
    const action = signUp.rejected(new Error('Ошибка регистрации'), '', undefined as any);
    const nextState = profileSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Ошибка регистрации');
  });

  test('signIn.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      signIn.fulfilled(mockAuthResponse, '', undefined as any)
    );
    expect(nextState.user).toEqual(mockUser);
  });

  test('signIn.rejected', () => {
    const action = signIn.rejected(new Error('Ошибка входа'), '', undefined as any);
    const nextState = profileSlice.reducer(initialState, action);
    expect(nextState.error).toBe('Ошибка входа');
  });

  test('getUser.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      getUser.fulfilled({ success: true, user: mockUser }, '', undefined)
    );
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isAuthChecked).toBe(true);
  });

  test('updateUser.fulfilled', () => {
    const nextState = profileSlice.reducer(
      initialState,
      updateUser.fulfilled({ success: true, user: mockUser }, '', undefined as any)
    );
    expect(nextState.user).toEqual(mockUser);
  });

  test('logout.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const nextState = profileSlice.reducer(
      stateWithUser,
      logout.fulfilled({ success: true }, '', undefined)
    );
    expect(nextState.user).toBeNull();
    expect(nextState.isAuthChecked).toBe(true);
  });

  test('logout.rejected', () => {
    const action = logout.rejected(new Error('Ошибка выхода'), '', undefined);
    const nextState = profileSlice.reducer(initialState, action);
    expect(nextState.error).toBe('Ошибка выхода');
  });
});
