const setToLocalStorage = ({
  authToken,
  email,
  userId,
  userName,
  userOrgId,
  userOrgName,
}) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(userName));
  localStorage.setItem("authUserOrgId", JSON.stringify(userOrgId));
  localStorage.setItem("authUserOrgName", JSON.stringify(userOrgName));
};

const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export { setToLocalStorage, getFromLocalStorage };
