const arrayToCSV = (arr: string[]) => {
    if(!arr || arr.length === 0){
        return null;
    }
    return arr.join(", ");
};

const capatilizedFristLetter = (str: string) => {
    if(!str || str.length === 0){
        return null;
    } 
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};  
 export {arrayToCSV, capatilizedFristLetter };