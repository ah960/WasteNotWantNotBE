import express from "express";
const router = express.Router();
import axios from "axios";
import 'dotenv/config'

let creds = [{
    id: process.env.REACT_APP_EDAMAM_APP_ID,
    pass: process.env.REACT_APP_EDAMAM_APP_KEY
}, {
    id: process.env.REACT_APP_EDAMAM_APP_ID_EDDIE,
    pass: process.env.REACT_APP_EDAMAM_APP_KEY_EDDIE,
},
{
    id: process.env.REACT_APP_EDAMAM_APP_ID_ADAM,
    pass: process.env.REACT_APP_EDAMAM_APP_KEY_ADAM
}
]


/* GET users listing. */
router.get("/search", async function (req, res, next) {
    let attempts = 0
    if(req.query.q) {
        while(attempts < creds.length){
            const searchString = req.query.q;
            try {
                const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${creds[attempts].id}&app_key=${creds[attempts].pass}&${req.query.health}&${req.query.mealType}`)
                res.send(response.data.hits)
                break
            } catch(error){   
                attempts++
                console.log(error)
                continue
            }
        }
    }

    if(req.query.recipe_id) {
        while(attempts < creds.length){
            const searchId = req.query.recipe_id
            try {
                const response = await axios.get(`https://api.edamam.com/api/recipes/v2/${searchId}?type=public&app_id=${creds[attempts].id}&app_key=${creds[attempts].pass}`)
                res.send(response.data)
                break
            } catch(error){   
                attempts++
                console.log(error)
                continue
            }
        }
    }
    
});

export default router;


// https://api.edamam.com/api/recipes/v2/recipe_0e39757c1d9b13d74bf1b87bbc7470fd?type=public&app_id=f2223bc9&app_key=fca86466cd531a1d957e86b0412744f7
