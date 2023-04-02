export function formatString(str: string): string {
    let result = "";

    // capitalize the first letter
    result = str.charAt(0).toUpperCase() + str.slice(1);

    // add a space before any capitalized letter
    for (let i = 1; i < result.length; i++) {
      if (result.charAt(i) === result.charAt(i).toUpperCase()) {
        result = result.slice(0, i) + " " + result.slice(i);
        i++;
      }
    }

    return result;
  }