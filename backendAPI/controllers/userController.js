import fs from 'fs';

const addData = async (req, res) => {
    try {
        const { username, email, password, gender } = req.body;
        // saving as a txt
        const textData = `
        -----------------------------
        |    Name : ${username}     
        |    email: ${email}            
        |    password: ${password}  
        |    gender: ${gender}      
        -----------------------------
        `;
        fs.appendFileSync('./data/user.txt', textData);

        // saving as a json
        let users = [];
        if (fs.existsSync('./data/user.json')) {
            const file = fs.readFileSync('./data/user.json');
            if (file.length > 0) {
                user = JSON.parse(file);
            }
            users.push({
                username, email, password, gender
            });
            fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 4));
        }
        res.json({
            success: true,
            message: "User saved successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

export default addData;