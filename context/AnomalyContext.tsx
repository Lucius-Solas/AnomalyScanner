import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

export type SavedAnomaly = {
  id: string;
  title: string;
  description: string;
  imageUri: string | null;
  createdAt: string;
};

type AnomalyContextValue = {
  anomalies: SavedAnomaly[];
  addAnomaly: (anomaly: Omit<SavedAnomaly, 'id' | 'createdAt'>) => void;
};

const AnomalyContext = createContext<AnomalyContextValue | undefined>(undefined);

export function AnomalyProvider({ children }: PropsWithChildren) {
  const [anomalies, setAnomalies] = useState<SavedAnomaly[]>([]);

  const value = useMemo<AnomalyContextValue>(() => {
    return {
      anomalies,
      addAnomaly: (anomaly) => {
        setAnomalies((current) => [
          {
            id: String(Date.now()),
            createdAt: new Date().toISOString(),
            ...anomaly,
          },
          ...current,
        ]);
      },
    };
  }, [anomalies]);

  return <AnomalyContext.Provider value={value}>{children}</AnomalyContext.Provider>;
}

export function useAnomalies() {
  const context = useContext(AnomalyContext);

  if (!context) {
    throw new Error('useAnomalies must be used within an AnomalyProvider');
  }

  return context;
}