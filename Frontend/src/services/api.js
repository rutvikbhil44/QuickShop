import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:6001/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("🛠 Token Sent in Request:", req.headers.Authorization);
  }
  return req;
});

export const signup = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);

export const getProducts = () => API.get("/products");
export const addProduct = (productData) => API.post("/products", productData);
export const updateProduct = (id, productData) =>
  API.put(`/products/${id}`, productData);

export const deleteProduct = async (id) => {
  console.log("🛑 Deleting product with ID:", id);
  try {
    const response = await API.delete(`/products/${id}`);
    console.log("✅ Delete Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting product:", error.response?.data || error.message);
    throw error;
  }
};
