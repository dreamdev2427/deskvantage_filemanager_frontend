
// ms to time, "00:00:00"
export const msToTime = (milliseconds, isShowMMSS = false) => {
  let seconds = Math.floor((milliseconds) % 60);
  let minutes = "";
  if(isShowMMSS)
    minutes = Math.floor(milliseconds / 60);
  else
    minutes = Math.floor((milliseconds / 60) % 60);
  let hours = Math.floor((milliseconds / (60 * 60)) % 24);

  return (
    (isShowMMSS ? "" : ("0" + hours).slice(-2) + ":") +
    ("0" + minutes).slice(-2) +
    ":" +
    ("0" + seconds).slice(-2)
  );
}

// set number minimum fraction digits format
export const setMinimumFractionFormat = (number = 1, minimumFractionNum = 1) => {
  return (number).toLocaleString(
    undefined, // leave undefined to use the visitor's browser 
              // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: minimumFractionNum }
  );
}

// Send data between components
export const EventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

// Generate random string for id
// export const makeId = (length = 8) => {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?';
//     const charactersLength = characters.length;
//     let counter = 0;
//     while (counter < length) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//       counter += 1;
//     }
//     return result;
// }

// get item by property from array
export const getItemFromArr = (array, property, threshold) => {
  if (property.length) {
    let res = array.find(item => item[property] == threshold)
    return res == undefined ? {} : res;
  } else {
    let res = array.find(item => item == threshold)
    return res == undefined ? "" : res;
  }
}

// get index by property from array
export const getIndexFromArr = (array, property, threshold) => {
  if(property.length)
    return array.findIndex(item => item[property] == threshold);
  else
    return array.findIndex(item => item == threshold);
}

// get active word by time from words array 
export const getActiveWord = (words, time) => {
  let word = words.find(item => time >= item.startTime && time < item.endTime)
  return word == undefined ? {} : word;
}

// check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

export const hexToRGB = (hex) => {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];

    // 6 digits
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
   
    return "rgb("+ +r + ", " + +g + ", " + +b + ")";
}