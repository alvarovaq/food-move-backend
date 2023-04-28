export async function asyncForEach(array: any[], callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

export function newRandomPassword (length: number = 8) {
  const abecedario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".","-","_","$","&","#","@"];
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.round(Math.random()*abecedario.length);
    password += abecedario[randomNumber];
  }
  return password;
}