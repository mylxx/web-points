import { createContext } from 'react';
import type { TypeFavoriteCoin } from '@/apis/markets';
import { CollectedStatus } from '@/enums/table';

interface collectedContextType {
  favoriteList?: TypeFavoriteCoin[];
  updateCollectedCoin?: (coin: TypeFavoriteCoin, type: CollectedStatus) => void;
  setFavoriteList?: (data: TypeFavoriteCoin[]) => void;
}

export const CollectedContext = createContext<collectedContextType>({});
