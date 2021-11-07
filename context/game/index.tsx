import React, { useCallback, useContext, useEffect, useState } from "react";

import nookies from "nookies";

import { decrypt, encrypt } from "../../services/crypt";

import { GameContext as GameContextT, GameData } from "./types";

const GameContext = React.createContext({} as GameContextT);

const initialData: GameData = {
  experience: 0,
  experiencePerClick: 1,
  developersName: "Developer's name",
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
    encrypted ? JSON.parse(decrypt(encrypted)) : initialData
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
    (amount?: number) => {
      setData((cur) => ({
        experience: cur.experience + (amount || cur.experiencePerClick),
      }));
    },
    [setData]
  );

  return { data, setEncryptedData, increaseExp };
};
