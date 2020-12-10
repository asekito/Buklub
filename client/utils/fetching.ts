// @ts-ignore
export default function fetchCommand(url: string, obj: object) {
  return window.fetch(url, obj).then((response) => {
    return response.json();
  });
}

// @ts-ignore
window.fetchTest = fetchCommand;
