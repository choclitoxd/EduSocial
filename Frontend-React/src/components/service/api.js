const API_BASE = "/api";

export const getData = async (endpoint) => {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!res.ok) throw new Error("Error al obtener datos");
  return await res.json();
};

export const postData = async (endpoint, payload) => {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Error al enviar datos");
  return await res.json();
};