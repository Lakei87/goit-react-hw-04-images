import axios from "axios";

const API_KEY = "29164784-c09cfa926a0283a5bc80e82cc";
const BASE_URL = "https://pixabay.com/api/";
const baseSearchParam = "per_page=12&image_type=photo&orientation=horizontal";

const imagesApiService = async (page = 1, searchQuery) => {
    const url = `${BASE_URL}?key=${API_KEY}&page=${page}&${baseSearchParam}&q=${searchQuery}`;

    const response = await axios.get(url);
    return response.data;
};

export default imagesApiService;