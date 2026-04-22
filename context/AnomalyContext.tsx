import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

export type SavedAnomaly = {
  id: string;
  title: string;
  description: string;
  imageUri: string | null;
  createdAt: string;
};

export type AnomalyDraft = {
  title: string;
  description: string;
  imageUri: string | null;
};

type AnomalyContextValue = {
  anomalies: SavedAnomaly[];
  addAnomaly: (anomaly: Omit<SavedAnomaly, 'id' | 'createdAt'>) => void;
  draft: AnomalyDraft;
  setDraft: (draft: AnomalyDraft) => void;
};

const AnomalyContext = createContext<AnomalyContextValue | undefined>(undefined);

export function AnomalyProvider({ children }: PropsWithChildren) {
  const [anomalies, setAnomalies] = useState<SavedAnomaly[]>([]);
  const [draft, setDraft] = useState<AnomalyDraft>({
    title: '',
    description: '',
    imageUri: null,
  });

  const value = useMemo<AnomalyContextValue>(() => {
    return {
      anomalies,
      draft,
      setDraft,
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
  }, [anomalies, draft]);

  return <AnomalyContext.Provider value={value}>{children}</AnomalyContext.Provider>;
}

export function useAnomalies() {
  const context = useContext(AnomalyContext);

  if (!context) {
    throw new Error('useAnomalies must be used within an AnomalyProvider');
  }

  return context;
}