import path from "path"



const GetPathToOperativeFolder = () => {
    return path.resolve(__dirname, './../', 'operative') + '/'
}

export default GetPathToOperativeFolder