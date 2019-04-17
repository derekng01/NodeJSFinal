var getImage = async(search_entry)=> {
    try {
        const images = await axios.get(`https://images-api.nasa.gov/search?q=${search_entry}`);
        return images.data.collection.items
    } catch (error) {
        //status codes 200 ok, 400 bad request, 404 not found, 500 server error
        if (error) {
            throw ("Error placeholder")
        }
    }
}
    module.exports = {
        getImage
    };