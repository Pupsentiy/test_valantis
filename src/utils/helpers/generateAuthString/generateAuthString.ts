import md5 from "md5";

export const generateAuthString = (pass: string = "Valantis"): string => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return md5(`${pass}_${timestamp}`);
};
