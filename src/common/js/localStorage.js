export function setCache (key, value) {
  localStorage.setItem(key, value)
}
export function getCache (key) {
  return localStorage.getItem(key)
}
export function removeCache (key) {
  localStorage.removeItem(key)
}
export function removeAllCache () {
  localStorage.clear()
}
