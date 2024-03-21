let i = 0;
// const wait = () => {
//   if (i == 1) {
//     i = i + 1;
//     return "Wait a moment, I'm thinking.";
//   }

//   if (i % 2 == 0) {
//     i = i + 1;
//     return "Wait a moment, I'm thinking..";
//   } else if (i % 3 == 0) {
//     i = i + 1;
//     return "Wait a moment, I'm thinking...";
//   } else if (i % 4 == 0) {
//     i = i + 1;
//     return "Wait a moment, I'm thinking....";
//   }
// };
const wait = () => {
  i = i + 1;
  let j = i % 4;
  if (j == 0) return "Wait a moment, I'm thinking.";
  else if (j == 1) return "Wait a moment, I'm thinking..";
  if (j == 2) return "Wait a moment, I'm thinking...";
  if (j == 3) return "Wait a moment, I'm thinking....";
};
for (let j = 0; j <= 100; j++) {
  console.log(wait(j));
}
