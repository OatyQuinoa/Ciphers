const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message: ", (message) => {
    rl.question("Enter a key: ", (key) => {
        console.log(columnar_transposition_cipher(message, key))
        rl.close();
    })
})

function sort_accordingly(array) { 
    const subArrayLength = array[0].length
    let updated_array = array.map(innerArray => {
        innerArray.push(innerArray[0].charCodeAt(0)); 
        return innerArray;  
    });

    let sorted_array = updated_array.sort((a, b) => a[subArrayLength] - b[subArrayLength]) 
    let cleaned_array = sorted_array.map(innerArray => innerArray.slice(0, subArrayLength));

    return cleaned_array 
}

function columnar_transposition_cipher(message, key) {
    key = key.replace(/\s+/g, '');

    let message_and_key_length = (message.length + key.length)
    let max_message_length = message_and_key_length % key.length !== 0 ? message_and_key_length - (message_and_key_length % key.length) + key.length : message_and_key_length 
    let array_of_arrays = []
    let sub_array = []
    message = Array.from(key + message) 

    for (i = 0; i <= max_message_length; i++) { 
        if (i % key.length === 0) {
            sub_array.length === 0 ? null : array_of_arrays.push(sub_array)
            sub_array = [] 

            if (message[i] == null || /\s/.test(message[i])) { 
                sub_array.push("X")
            } else {
                sub_array.push(message[i])
            }
        } else if (message[i] == null || /\s/.test(message[i])) { 
            sub_array.push("X")
        } else {
            sub_array.push(message[i])
        }
    }

    let array_of_unsorted_columns = [] 
    for (i = 0; i < key.length; i++) { 
        let column_array = array_of_arrays.map(column => column[i])
        array_of_unsorted_columns.push(column_array)
    }

    let alphabetically_sorted_columns = sort_accordingly(array_of_unsorted_columns) 
    let joined_elements_of_subarray = alphabetically_sorted_columns.map(subArray => subArray.join("")) 
    const encrypted_message = joined_elements_of_subarray.join("") 

    return encrypted_message
}