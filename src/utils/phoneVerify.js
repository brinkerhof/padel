module.exports = phoneVerify = (phone) => {
  if (!/^[0-9]+$/.test(phone)) {
    return false;
  } else if (phone.length < 10 || phone.length > 11) {
    return false;
  } else {
    return true;
  }
};
