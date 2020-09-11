const normalize = require('ffmpeg-normalize');
const { promisify } = require('util');
const fs = require('fs')
// Enable async/await
const normalizeAsync = promisify(normalize)

// Gets files to be treated form "./input"
const inputList = fs.readdirSync('./input')

const asyncNorm = async () => {

    for (i=0; i < inputList.length;i++) {
        // console.log(inputList[i])
        // Saves initial filename
        var filename = inputList[i]
        console.log("En cours: " + filename + "("+(i+1)+"/"+inputList.length+")")
        // Change name to avoid ffmpeg command errors
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
            verbose: false
        })
        .then(normalized  => {
            // Once Normalized
            // Rename back to original name
            fs.renameSync('./output/input'+ i + '.mp4', './output/'+ filename)
            console.log("Fini :  ", normalized)
            console.log("Fini :  ", filename)
        })
        .catch(error => {
            // Some error happened
            console.log("Error :  ", error)
        });
    }
}

asyncNorm()