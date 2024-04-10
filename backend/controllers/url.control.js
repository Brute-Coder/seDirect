const URL = require("../modals/Url.modal");
const idGenerator = require("shortid");

/*
TODO: code to maintain uniqueness in the short urls 
  const preCheck = await URL.findOne({ masterUrl: masterUrl });
  if (preCheck) {
    const authText = req.body.authText;
    preCheck.authPhrase.forEach((text) => {
      if (text === authText)
        return res.status(200).json({ shortId: preCheck.shortUrl });
    });
    await URL.updateOne(
      { _id: preCheck._id },
      { $set: { DateTime: new Date() }, $push: { authPhrase: authText } }
    );
    return res.status(200).json({ shortId: preCheck.shortUrl });
  }
*/

async function customURLCreator(req, res) {
  //console.log(req.body);
  console.log(req.body);
  const masterUrl = req.body.masterUrl ? req.body.masterUrl.trim() : null;
  const authText = req.body.authText ? req.body.authText.trim() : null;

  if (!masterUrl || !authText)
    return res.status(400).json({ error: "bad credential received !!" });
  const shortId = idGenerator();
  console.log("here is my masterurl" + masterUrl);
  await URL.create({
    shortUrl: shortId,
    masterUrl: masterUrl,
    authPhrase: [req.body.authText.trim()],
    analytics: { visitCount: 0 },
  });

  return res.status(200).json({ shortId: shortId });
}

async function fetchUrl(req, res) {
  const data = await URL.findOne({ shortUrl: req.query.queryId });
  if (!data) {
    return res.json({ idExist: false });
  } else {
    //* the text will be trimmed in front end app
    return res.json({ idExist: true, ...data._doc });
    // if (req.body.authText === data._doc.authPhrase[0]) {
    //   await URL.updateOne(
    //     { _id: data._doc._id },
    //     { $inc: { "analytics.visitCount": 1 } }
    //   );
    //   return res.json({ idExist: true, validAuth: true, ...data._doc });
    // }
    // return res.json({ idExist: true, validAuth: false });
  }
}

module.exports = { customURLCreator, fetchUrl };
