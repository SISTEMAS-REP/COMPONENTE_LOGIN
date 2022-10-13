export function cookieExists(cookie: string): boolean {
  return document.cookie
    .split(';')
    .some((item) => item.trim().startsWith(`${cookie}=`));
}
