import promptLib from "prompt";

export const prompt = options => {
  return new Promise((resolve, reject) => {
    promptLib.get(options, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};
