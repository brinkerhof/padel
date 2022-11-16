export default function emailVerify(email) {
  if (email.includes("@") && email.includes(".com")) {
    return true;
  } else {
    return false;
  }
}
