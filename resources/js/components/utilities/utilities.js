
export function setItem(itamName , value) {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(itamName, JSON.stringify(value));
  } else {
    alert("Sorry, your browser does not support web storage...");
  }
}

export function getItem(itamName) {
  if (typeof(Storage) !== "undefined") {
    return JSON.parse(localStorage.getItem(itamName));
  } else {
    alert("Sorry, your browser does not support web storage...");
  }
}

export function removeItem(itamName) {
  if (typeof(Storage) !== "undefined") {
    localStorage.removeItem(itamName);
  } else {
    alert("Sorry, your browser does not support web storage...");
  }
}

export function mainPageWidth(){
  return window.innerWidth-200;
}

export function baseUrl(){
  return "http://127.0.0.1:8000";
}

