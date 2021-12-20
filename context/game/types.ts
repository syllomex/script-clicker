import React from "react";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type ProjectData = {
  id: string;
  name: string;
  value: number;
  requiredCommits: number;
  difficulty: string;
};

export type GameData = {
  developersName: string;

  experience: number;
  experiencePerClick: number;
  experiencePerSecond: number;

  commits: number;
  commitsPerSecond: number;
  commitsPerClick: number;

  workingProjects: ProjectData[];
  pendingProjects: ProjectData[];
};

export type GameContext = {
  data: GameData;
  setData: SetState<GameData>;
};

type _SetData<K, V> = (key: K, value: V) => void;

export type SetData = _SetData<"experience", number>;

export type IncreaseCommitsOptions = {
  amount?: number;
};

export type IncreaseExpOptions = {
  amount?: number;
};
