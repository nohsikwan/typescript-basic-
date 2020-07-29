const name = "kwan",
  age = 26,
  gender = "male";

const sayhi = (name: string, age: number, gender: string): void => {
  console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};

sayhi(name, age, gender);

export {};
