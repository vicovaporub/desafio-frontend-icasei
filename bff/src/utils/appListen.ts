export const listen = () => {
  console.log(
    `BFF listening at ${process.env.SERVER_URL}:${process.env.MAIN_PORT}`
  );
};
