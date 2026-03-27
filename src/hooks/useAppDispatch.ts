// src/hooks/useAppDispatch.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

// src/hooks/useAppSelector.ts
import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
