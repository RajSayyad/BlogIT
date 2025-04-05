import axios from "axios";

const fetch = () => axios.get("/organizations");

const orgApi = { fetch };

export default orgApi;
