import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { tokenState, userData, petData } from "./atoms";

export function useTokenState(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [token, setToken] = useRecoilState(tokenState);
  return [token, setToken];
}

export function useValueToken(): string {
  return useRecoilValue(tokenState);
}

export function useUserData(): [
  any,
  React.Dispatch<React.SetStateAction<any>>
] {
  const [userDataState, setUserDataState] = useRecoilState(userData);
  return [userDataState, setUserDataState];
}

export function usePetData(): [any, React.Dispatch<React.SetStateAction<any>>] {
  const [petDataState, setpetDataState] = useRecoilState(petData);
  return [petDataState, setpetDataState];
}
