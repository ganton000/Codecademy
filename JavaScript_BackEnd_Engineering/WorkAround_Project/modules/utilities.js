/* modules/utilities.js */

export const formatNumber = (number) => {
    //Gets rid of decimals and converts to string
    let numStr = String(Math.floor(number));

    //Starting 3 from end, adds comma for every 3 digits
    for (let i = numStr.length-3; i>0; i -=3){
        numStr = numStr.slice(0,i) + ',' + numStr.slice(i);
    }

    return numStr;
}