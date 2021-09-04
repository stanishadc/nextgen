export default function AuthHeader() {
  const userToken = JSON.parse(localStorage.getItem('userToken'));

  if (userToken) {
   return { Authorization: 'Bearer ' + userToken };
  } else {
    return {};
  }
}