import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import nookies from "nookies";

import { decrypt, encrypt } from "../../services/crypt";

import {
  GameContext as GameContextT,
  GameData,
  IncreaseCommitsOptions,
  IncreaseExpOptions,
} from "./types";

const GameContext = React.createContext({} as GameContextT);

const initialData: GameData = {
  experience: 0,
  experiencePerClick: 1,
  experiencePerSecond: 0,
  commits: 0,
  commitsPerSecond: 0,
  developersName: "Developer's name",
  commitsPerClick: 0.1,
  pendingProjects: [],
  workingProjects: [],
};

const store = (data: GameData) => {
  const encrypted = encrypt(data);

  nookies.set(undefined, "data", encrypted, {
    maxAge: Date.now() + 10 * 365 * 24 * 60 * 60,
  });
};

const load = () => {
  const stored = nookies.get()["data"];
  if (!stored) return initialData;

  const decrypted = decrypt(stored);

  try {
    return { ...initialData, ...(JSON.parse(decrypted) as GameData) };
  } catch (err: any) {
    return initialData;
  }
};

export const GameProvider: React.FC<{ encrypted?: string }> = ({
  encrypted,
  children,
}) => {
  const [loaded, setLoaded] = useState(!!encrypted);

  const [data, setData] = useState<GameData>(
    encrypted
      ? { ...initialData, ...JSON.parse(decrypt(encrypted)) }
      : initialData
  );

  useEffect(() => {
    if (!loaded) {
      setData(load());
      setLoaded(true);
      return;
    }

    store(data);
  }, [data, encrypted, loaded]);

  return (
    <GameContext.Provider value={{ data, setData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const { data, setData: _setData } = useContext(GameContext);

  const hasWorkingProjects = useMemo(
    () => data.workingProjects.length > 0,
    [data.workingProjects.length]
  );

  const setData = useCallback(
    (callback: (_data: GameData) => Partial<GameData>) => {
      _setData((cur) => {
        return { ...cur, ...callback(cur) };
      });
    },
    [_setData]
  );

  const setEncryptedData = useCallback(
    (encrypted: string) => {
      _setData(JSON.parse(decrypt(encrypted)));
    },
    [_setData]
  );

  const increaseExp = useCallback(
    ({ amount }: IncreaseExpOptions) => {
      setData((cur) => ({
        experience: cur.experience + (amount || cur.experiencePerClick),
      }));
    },
    [setData]
  );

  const increaseCommits = useCallback(
    ({ amount }: IncreaseCommitsOptions) => {
      if (!hasWorkingProjects) return;

      setData((cur) => ({
        commits: cur.commits + (amount || cur.commitsPerClick),
      }));
    },
    [hasWorkingProjects, setData]
  );

  return { data, setEncryptedData, increaseExp, increaseCommits };
};
