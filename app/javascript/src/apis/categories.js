import axios from "axios";

const fetchCategories = () => axios.get("/categories");

const categoryApi = { fetchCategories };

export default categoryApi;
