// ms to time, "00:00:00"
export const msToTime = (milliseconds, isShowMMSS = false) => {
  let seconds = Math.floor(milliseconds % 60);
  let minutes = "";
  if (isShowMMSS) minutes = Math.floor(milliseconds / 60);
  else minutes = Math.floor((milliseconds / 60) % 60);
  let hours = Math.floor((milliseconds / (60 * 60)) % 24);

  return (
    (isShowMMSS ? "" : ("0" + hours).slice(-2) + ":") +
    ("0" + minutes).slice(-2) +
    ":" +
    ("0" + seconds).slice(-2)
  );
};

// set number minimum fraction digits format
export const setMinimumFractionFormat = (
  number = 1,
  minimumFractionNum = 1
) => {
  return number.toLocaleString(
    undefined, // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: minimumFractionNum }
  );
};

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
    let res = array.find((item) => item[property] == threshold);
    return res == undefined ? {} : res;
  } else {
    let res = array.find((item) => item == threshold);
    return res == undefined ? "" : res;
  }
};

// get index by property from array
export const getIndexFromArr = (array, property, threshold) => {
  if (property.length)
    return array.findIndex((item) => item[property] == threshold);
  else return array.findIndex((item) => item == threshold);
};

// get active word by time from words array
export const getActiveWord = (words, time) => {
  let word = words.find(
    (item) => time >= item.startTime && time < item.endTime
  );
  return word == undefined ? {} : word;
};

// check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const hexToRGB = (hex) => {
  let r = 0,
    g = 0,
    b = 0;

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

  return "rgb(" + +r + ", " + +g + ", " + +b + ")";
};

export function findSiblings(treeData, idToFind, siblings = []) {
  for (const node of treeData.children || []) {
    if (node.id === idToFind) {
      for (const childNode of treeData.children) {
        if (childNode.id !== idToFind) {
          siblings.push({ id: childNode.id, label: childNode.label });
        }
      }
      return siblings;
    }
    findSiblings(node, idToFind, siblings);
  }
  return siblings;
}

export function findChildren(treeData, idToFind, children = []) {
  for (const node of treeData.children || []) {
    if (node.id === idToFind) {
      for (const childNode of node.children || []) {
        children.push({
          id: childNode.id,
          label: childNode.label,
          isFolder: childNode.isFolder,
        });
      }
      return children;
    }
    findChildren(node, idToFind, children);
  }
  return children;
}

export function findPath(treeData, idToFind, currentPath = []) {
  for (const node of treeData.children || []) {
    const newPath = currentPath.concat({
      id: node.id,
      label: node.label,
    });

    if (node.id === idToFind) {
      return newPath;
    }

    const pathFound = findPath(node, idToFind, newPath);
    if (pathFound) {
      return pathFound;
    }
  }

  return null;
}

export function findNodeById(id, treeData) {
  // if the treeData is null or undefined, return null
  if (!treeData) return null;
  // if the treeData has the same id as the parameter, return the treeData
  if (treeData.id === id) return treeData;
  // if the treeData has children, loop through them and recursively call the function on each child
  if (treeData.children) {
    for (let child of treeData.children) {
      // store the result of the recursive call in a variable
      let result = findNodeById(id, child);
      // if the result is not null, return the result
      if (result) return result;
    }
  }
  // if none of the above conditions are met, return null
  return null;
}

export function insertNode(treeData, parentId, newNode) {
  // Define a helper function to loop through the tree
  function traverse(node) {
    // Check if the node id matches the parent id
    if (node.id === parentId) {
      // Push the new node into the children array
      node.children.push(newNode);
      // Return true to indicate success
      return true;
    }
    // Check if the node has children
    if (node.children && node.children.length > 0) {
      // Loop through the children and recursively call traverse
      for (let child of node.children) {
        // If traverse returns true, stop the loop and return true
        if (traverse(child)) return true;
      }
    }
    // Return false to indicate failure
    return false;
  }

  // Call traverse on the root node of the tree data
  let result = traverse(treeData);

  // If result is true, return the updated tree data
  if (result) return treeData;

  // Otherwise, throw an error or return the original tree data
  throw new Error("Parent node not found");
  // Or return treeData;
}

export function generateTree(maxNodes, maxDepth) {
  function generateNode(id, depth) {
    const isFolder = depth < maxDepth && Math.random() < 0.7; // Adjust probability as needed
    const node = {
      id,
      label: `Node ${id}`,
      isFolder,
      children: isFolder ? [] : undefined,
    };

    if (isFolder) {
      const numChildren = Math.floor(Math.random() * (maxNodes - 1)) + 1;
      for (let i = 0; i < numChildren; i++) {
        const childId = `${id}-${i + 1}`;
        node.children.push(generateNode(childId, depth + 1));
      }
    }

    return node;
  }

  return {
    id: "root",
    label: "Site",
    isFolder: true,
    children: Array.from(
      { length: Math.floor(Math.random() * maxNodes) + 1 },
      (_, i) => generateNode(`node${i + 1}`, 1)
    ),
  };
}
