import React from "react";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type GameData = {
  experience: number;
  experiencePerClick: number;
  developersName: string;
};

export type GameContext = {
  data: GameData;
  setData: SetState<GameData>;
};

type _SetData<K, V> = (key: K, value: V) => void; 

export type SetData = _SetData<'experience', number>;