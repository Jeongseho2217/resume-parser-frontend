const USERS_KEY = "front2.users";
const CURRENT_USER_KEY = "front2.currentUser";

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCurrentUser() {
  return readJson(CURRENT_USER_KEY, null);
}

export function isLoggedIn() {
  return Boolean(getCurrentUser());
}

export function isCompanyUser() {
  return getCurrentUser()?.userType === "company";
}

export function isPersonalUser() {
  return getCurrentUser()?.userType === "personal";
}

export function signupUser(user) {
  const users = readJson(USERS_KEY, []);
  const email = user.email.trim().toLowerCase();

  if (users.some((item) => item.email === email)) {
    throw new Error("이미 가입된 이메일입니다.");
  }

  const newUser = {
    ...user,
    id: `local_${Date.now()}`,
    email,
  };

  writeJson(USERS_KEY, [...users, newUser]);
  writeJson(CURRENT_USER_KEY, {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    userType: newUser.userType,
  });

  return newUser;
}

export function loginUser({ email, password, userType }) {
  const users = readJson(USERS_KEY, []);
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    (item) =>
      item.email === normalizedEmail &&
      item.password === password &&
      item.userType === userType
  );

  if (!user) {
    throw new Error("이메일, 비밀번호 또는 회원 유형을 확인하세요.");
  }

  const currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    userType: user.userType,
  };

  writeJson(CURRENT_USER_KEY, currentUser);
  return currentUser;
}

export function logoutUser() {
  window.localStorage.removeItem(CURRENT_USER_KEY);
}
