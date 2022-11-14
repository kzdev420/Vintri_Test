var express = require("express");
var router = express.Router();
var LODASH_PICK = require("lodash/_basePick");
var cache = require("memory-cache");


var Beers = require("../database");
const { PUNK_API_BEER_BASE } = require("../config");
const { fetch_api } = require("../utils");

var BEER_CACHE = new cache.Cache();

/*
  GET beers listing.
  Will accept a parameter that is named "name". i.e: beers?name=buzz
  If there is no parameter, will take the random beers.
*/
router.get("/", async function(req, res, next) {
  try {
    var cached_data = BEER_CACHE.get("beer");
    if (cached_data) {
      res.send(cached_data);
      return;
    }
    const query = req.query;
    const punk_api_url = query.name && query.name.trim()
                          ? `${PUNK_API_BEER_BASE}?beer_name=${query.name.trim()}`
                          : `${PUNK_API_BEER_BASE}`;

    const beers = await fetch_api({url: punk_api_url});
    const filtered = beers.map(beer => LODASH_PICK(beer, ["id", "name", "description", "first_brewed", "food_pairing"]));
    BEER_CACHE.put("beer", filtered);
    
    res.send(filtered);
  } catch (error) {
    res.status(500);
  }
});

router.post("/:id", async function(req, res, next) {
  const id = req.params.id;
  const { rating, comments } = req.body;

  console.log(id, parseInt(rating));

  if(parseInt(rating) >= 1 && parseInt(rating) <= 5) {
    const beers = await fetch_api({url: `${PUNK_API_BEER_BASE}/${id}`});
  
    if(beers.length) {
      await Beers.save_feedack({ id, rating, comments });
      res.send("Saved Successfully");
    } else {
      res.status(400).send("Invalid beer id");
    }

  } else {
    res.status(400).send("Invaild rating");
    return;
  }

});

module.exports = router;
