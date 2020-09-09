const normalize = require('ffmpeg-normalize');
const { promisify } = require('util');
const fs = require('fs')
const normalizeAsync = promisify(normalize)

const inputList = fs.readdirSync('./input')
// console.log(inputList)

const asyncNorm = async () => {
    for (i=0; i < inputList.length;i++) {
        console.log(inputList[i])
        var filename = inputList[i]
        fs.renameSync('./input/'+ inputList[i], './input/input'+ i + '.mp4')
        await normalize({
            input: './input/input'+ i + '.mp4',
            output: './output/input'+ i + '.mp4',
            loudness: {
                normalization: 'ebuR128',
                target:
                {
                    input_i: -23,
                    input_lra: 7.0,
                    input_tp: -2.0
                }
            },
            verbose: true
        })
        .then(normalized  => {
            // Normalized
            fs.renameSync('./output/input'+ i + '.mp4', './output/'+filename)
            console.log("Fini :  ", normalized)
        })
        .catch(error => {
            // Some error happened
            console.log("Error :  ", error)
        });
    }
}

asyncNorm()

// normalize({
//     input: "input4.mp4",
//     output: 'out3.mp4',
//     loudness: {
//         normalization: 'ebuR128',
//         target:
//         {
//             input_i: -23,
//             input_lra: 7.0,
//             input_tp: -2.0
//         }
//     },
//     verbose: true
// })
// .then(normalized  => {
//     // Normalized
//     console.log("Fini :  ", normalized)
// })
// .catch(error => {
//     // Some error happened
//     console.log("Error :  ", error)
// });