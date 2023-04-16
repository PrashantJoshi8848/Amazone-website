export const handelImage = (Authtype, Avatar) => {
  if (Authtype === "TRADITIONAL") {
    if (Avatar !== null) {
      return `${process.env.REACT_APP_BASE_URL}/${Avatar}`;
    } else if (Avatar === null) {
      return `profile.png`;
    }
  } else if (Authtype === "OAUTH") {
    return Avatar;
  } else {
    return `profile.png`;
  }
};
