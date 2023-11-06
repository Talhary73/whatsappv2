const fs = require('fs')
let i = 0;
for (i = 0;i<=1000000;i++){
    console.log(i)
fs.writeFileSync('./txt.txt', 'kfjsdlkfj sdklfjdslkj fldsjf kjdslkf jdsklfj dlskjflksdjflkdsjflkdjflksdjflkdsjklfdjklfdjsklfjdslkfjdslkfjlsdkfjlksdjflksdjflkj lkfsdjlkf jkl fjdslkfj klfjdlskjf lksdjf lkdsjflk sdjklf dsjlkf jslkf jsdlkf jlksdjf klsdjf lksdjfl ksdjfkl djslkf jlkf j', {
      flag: 'a',
    
    });
}