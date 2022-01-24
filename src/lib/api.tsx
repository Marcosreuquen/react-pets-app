const BASE_URL_API = "https://pets-app-mr.herokuapp.com";
// const BASE_URL_API = "http://localhost:8080";

export async function getPetsAroundMe(geoloc) {
  const { lat, lng } = geoloc;
  return await fetch(`${BASE_URL_API}/pets/around?lat=${lat}&lng=${lng}`);
}

export async function createUser(userData: {
  email: string;
  password: string;
}) {
  const { user, created } = await (
    await fetch(BASE_URL_API + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
  ).json();
  return await getToken(userData.email, userData.password);
}

export async function getToken(email: string, password: string) {
  // "/auth/token"
  const { token } = await (
    await fetch(BASE_URL_API + "/auth/token", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return token;
}

export async function updateUser(token: string, data: any) {
  const updated = await (
    await fetch(BASE_URL_API + "/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  ).json();
  return updated;
}

export async function checkMail(email: string) {
  return await (
    await fetch(BASE_URL_API + "/users/exist?email=" + email)
  ).json();
}

export async function sendReport(report: any, token: string) {
  return await (
    await fetch(`${BASE_URL_API}/pets/report?petId=${report.petId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(report),
    })
  ).json();
}

export async function getMyPets(token: string) {
  return await (
    await fetch(BASE_URL_API + `/me/pets`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
  ).json();
}

export async function getPetData(id: number) {
  return await (await fetch(`${BASE_URL_API}/pets?petId=${id}`)).json();
}

export async function editPet({ id, name, img, lat, lng, token }) {
  console.log({ id, name, img, lat, lng, token });
  return await (
    await fetch(BASE_URL_API + `/me/pets?petId=${id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        img,
        lat,
        lng,
      }),
    })
  ).json();
}

export async function createPet({ name, img, lat, lng, token }) {
  return await (
    await fetch(BASE_URL_API + `/me/pets`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        img,
        lat,
        lng,
      }),
    })
  ).json();
}

export async function findedPet(id: number, token: string) {
  return await (
    await fetch(BASE_URL_API + `/me/pets?petId=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
  ).json();
}
