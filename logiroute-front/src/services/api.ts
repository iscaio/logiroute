import { criarHttpClient } from "./httpClient";

export const apiAuth = criarHttpClient(
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:3000",
);

export const apiLogistica = criarHttpClient(
  import.meta.env.VITE_LOGISTICS_API_URL || "http://localhost:3000",
);

export default apiLogistica;
