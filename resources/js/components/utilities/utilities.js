
export function setItem(itamName , value) {
  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem(itamName, JSON.stringify(value));
  } else {
    alert("Sorry, your browser does not support web storage...");
  }
}

export function getItem(itamName) {
  if (typeof(Storage) !== "undefined") {
    return JSON.parse(sessionStorage.getItem(itamName));
  } else {
    alert("Sorry, your browser does not support web storage...");
  }
}

export function removeItem(itamName) {
  if (typeof(Storage) !== "undefined") {
    sessionStorage.removeItem(itamName);
  } else {
    alert("Sorry, your browser does not support web storage...");
  }
}

