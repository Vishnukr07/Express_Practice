const express = require("express");

const app = express();

var users = [{
    name : 'John',
    kidneys : [{
        healthy : false
        } , {
        healthy : true
    }]
}];

app.use(express.json());

app.get("/" , function(req,res){
    const johnKidney = users[0].kidneys;
    const numberOfKidneys = johnKidney.length;

    let numberOfHealthyKidneys = 0;

    for(let i = 0 ; i < johnKidney.length ; i++)
    {
        if(johnKidney[i].healthy)
        {
            numberOfHealthyKidneys++;
        }
    }

    const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json(
        {
            numberOfKidneys,
            numberOfHealthyKidneys,
            numberOfUnHealthyKidneys
        })
})

app.post("/" , function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })

    res.json({
        msg : 'done',
    })
})

app.put("/" , function(req,res){
    for(let i = 0 ; i < users[0].kidneys.length;i++)
    {
        users[0].kidneys[i].healthy = true;
    }

    res.json({});
})

app.delete("/" , function(req,res){
    if(isThereBadKidney())
    {
        const newKidney = [];

        for(let i = 0 ; i < users[0].kidneys.length ; i++)
        {
            if(users[0].kidneys[i].healthy)
            {
                newKidney.push({
                    healthy : true,
                })
            }
        }

        users[0].kidneys = newKidney;
        res.json({
            msg : 'done!',
        })
    }
    else{
        res.json({
            msg : "You don't have Unheatlhy kidney",
        })
    }
})

function isThereBadKidney()
{
    let flag = 0;
    for(let i = 0 ; i < users[0].kidneys.length ; i++)
    {
        if(users[0].kidneys[i].healthy == false)
        {
            flag = 1;
            break;
        }
    }

    return flag;
}

app.listen(3001);