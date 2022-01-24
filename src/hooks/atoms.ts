import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

export const queryState = atom({
  key: "query",
  default: "",
});

// export const resultsState = selector({
//   key: "searchResults",
//   get: async ({ get }) => {
//     const valorDeQuery = get(queryState);
//     const { results } = await (
//       await fetch(
//         `https://api.mercadolibre.com/sites/MLA/search?q=${valorDeQuery}`
//       )
//     ).json();
//     return results;
//   },
// });

// export const idState = atom({
//   key: "id",
//   default: "",
// });

// export const itemSearch = selector({
//   key: "idSearch",
//   get: async ({ get }) => {
//     const id = get(idState);
//     return await (
//       await fetch(`https://api.mercadolibre.com/items/${id}`)
//     ).json();
//   },
// });

export const tokenState = atom({
  key: "token",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userData = atom({
  key: "userData",
  default: { email: "", name: "" },
  effects_UNSTABLE: [persistAtom],
});

export const petData = atom({
  key: "petData",
  default: { id: 0, name: "", imgURL: "", lat: 0, lng: 0 },
  effects_UNSTABLE: [persistAtom],
});
