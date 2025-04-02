import axios from "axios";

const fetchCategories = () => axios.get("/categories");

const addCategory = payload => {
  axios.post("/categories", { category: payload });
};

const categoryApi = { fetchCategories, addCategory };

export default categoryApi;
